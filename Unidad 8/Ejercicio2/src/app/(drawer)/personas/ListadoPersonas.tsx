import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { JSX, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
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
    cargarDatos();
  }, []);

  function cargarDatos(): void {
    personaVM.cargarPersonas();
  }

  function filtrarPersonas(): Persona[] {
    const lista = personaVM.personas;
    let resultado: Persona[] = [];

    if (busqueda.trim() === "") {
      resultado = lista;
    } else {
      const busquedaLower = busqueda.toLowerCase();
      resultado = lista.filter((persona) => {
        const nombreCompleto = `${persona.nombre} ${persona.apellidos}`.toLowerCase();
        return nombreCompleto.includes(busquedaLower);
      });
    }

    return resultado;
  }

  const personasFiltradas = filtrarPersonas();

  function handleEditar(persona: Persona): void {
    personaVM.seleccionarPersona(persona);
    router.push("/(drawer)/personas/EditarInsertarPersonas" as any);
  }

  function handleEliminar(id: number): void {
    Alert.alert(
      "Confirmar eliminacion",
      "Estas seguro de que deseas eliminar esta persona?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminarPersona(id),
        },
      ]
    );
  }

  async function eliminarPersona(id: number): Promise<void> {
    try {
      await personaVM.eliminarPersona(id);
      Alert.alert("Exito", "Persona eliminada correctamente");
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      Alert.alert("Error", mensaje);
    }
  }

  function handleAnadir(): void {
    personaVM.limpiarSeleccion();
    router.push("/(drawer)/personas/EditarInsertarPersonas" as any);
  }

  function renderPersona({ item }: { item: Persona }): JSX.Element {
    return (
      <Elemento
        titulo={`${item.nombre} ${item.apellidos}`}
        subtitulo={item.telefono}
        onPress={() => handleEditar(item)}
        onDelete={() => handleEliminar(item.id)}
      />
    );
  }

  function renderContenido(): JSX.Element {
    let contenido: JSX.Element = <View />;

    if (personaVM.isLoading) {
      contenido = (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    } else if (personasFiltradas.length === 0) {
      contenido = (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No hay personas para mostrar</Text>
        </View>
      );
    } else {
      contenido = (
        <FlatList
          data={personasFiltradas}
          renderItem={renderPersona}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      );
    }

    return contenido;
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

      {renderContenido()}
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