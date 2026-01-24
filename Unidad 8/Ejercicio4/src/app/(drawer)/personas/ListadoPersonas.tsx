import { useFocusEffect, useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { BotonAnadir } from "../../../components/BotonAnadir";
import { Elemento } from "../../../components/Elemento";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { Persona } from "../../../domain/entities/Persona";
import { PersonasVM } from "../../../presenter/viewmodels/PersonasVM";
import { theme } from "../../../theme/theme";

const ListadoPersonas: React.FC = observer(() => {
  const personaVM = container.get<PersonasVM>(TYPES.PersonaViewModel);
  const router = useRouter();
  const [busqueda, setBusqueda] = useState<string>("");

  // Cargar datos al montar
  useEffect(() => {
    personaVM.cargarPersonas();
  }, []);

  // Recargar al obtener foco (navegación)
  useFocusEffect(
    useCallback(() => {
      personaVM.cargarPersonas();
    }, [])
  );

  // Recargar cuando la ventana obtiene foco (F5 o cambio de pestaña)
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          personaVM.cargarPersonas();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
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
    if (Platform.OS === 'web') {
      if (window.confirm("¿Estás seguro de que deseas eliminar esta persona?")) {
        eliminarPersona(id);
      }
    } else {
      Alert.alert(
        "Confirmar eliminación",
        "¿Estás seguro de que deseas eliminar esta persona?",
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
  }

  async function eliminarPersona(id: number): Promise<void> {
    try {
      await personaVM.eliminarPersona(id);
      
      if (Platform.OS === 'web') {
        window.alert("Éxito: Persona eliminada correctamente");
      } else {
        Alert.alert("Éxito", "Persona eliminada correctamente");
      }
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      
      if (Platform.OS === 'web') {
        window.alert("Error: " + mensaje);
      } else {
        Alert.alert("Error", mensaje);
      }
    }
  }

  function handleAnadir(): void {
    personaVM.limpiarSeleccion();
    router.push("/(drawer)/personas/EditarInsertarPersonas" as any);
  }

  if (personaVM.isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre..."
          placeholderTextColor={theme.colors.text.disabled}
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
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchInput: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.text.primary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  buttonContainer: {
    padding: theme.spacing.lg,
    paddingBottom: 0,
  },
  listContent: {
    padding: theme.spacing.lg,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
  },
});