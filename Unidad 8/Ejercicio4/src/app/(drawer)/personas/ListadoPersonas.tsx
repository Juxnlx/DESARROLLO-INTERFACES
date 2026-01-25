import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { BotonAnadir } from "../../../components/BotonAnadir";
import { Elemento } from "../../../components/Elemento";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { Persona } from "../../../domain/entities/Persona";
import { PersonasVM } from "../../../presenter/viewmodels/PersonasVM";

const ListadoPersonas: React.FC = observer(() => {
  const personaVM = container.get<PersonasVM>(TYPES.PersonaViewModel);
  const router = useRouter();
  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => {
    personaVM.cargarPersonas();
  }, []);

  const personasFiltradas = personaVM.personas.filter((persona: Persona) => {
    if (busqueda.trim() === "") return true;
    const nombreCompleto = `${persona.nombre} ${persona.apellidos}`.toLowerCase();
    return nombreCompleto.includes(busqueda.toLowerCase());
  });

  function handleEditar(persona: Persona): void {
    personaVM.seleccionarPersona(persona);
    router.push("/(drawer)/personas/EditarInsertarPersonas" as any);
  }

  function handleEliminar(id: number): void {
    const confirmar = window.confirm(
      "Estas seguro de que deseas eliminar esta persona?"
    );
    
    if (confirmar) {
      eliminarPersona(id);
    }
  }

  async function eliminarPersona(id: number): Promise<void> {
    try {
      await personaVM.eliminarPersona(id);
      window.alert("Exito: Persona eliminada correctamente");
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      window.alert("Error: " + mensaje);
    }
  }

  function handleAnadir(): void {
    personaVM.limpiarSeleccion();
    router.push("/(drawer)/personas/EditarInsertarPersonas" as any);
  }

  if (personaVM.isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <View style={styles.buttonContainer}>
        <BotonAnadir onPress={handleAnadir} titulo="Anadir Persona" />
      </View>

      {personasFiltradas.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No hay personas para mostrar</Text>
        </View>
      ) : (
        <FlatList
          data={personasFiltradas}
          renderItem={({ item }) => (
            <Elemento
              titulo={`${item.nombre} ${item.apellidos}`}
              subtitulo={item.telefono}
              onPress={() => handleEditar(item)}
              onDelete={() => handleEliminar(item.id)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
});

export default ListadoPersonas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    padding: 15,
    backgroundColor: "#fff",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  buttonContainer: {
    padding: 15,
    paddingBottom: 0,
  },
  listContent: {
    padding: 15,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});