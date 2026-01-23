import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { BotonAnadir } from "../../../components/BotonAnadir";
import { Elemento } from "../../../components/Elemento";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { Persona } from "../../../domain/entities/Persona";
import { PersonasVM } from "../../../presenter/viewmodels/PersonasVM";
import { theme } from "../../../theme/theme";

const ListadoPersonas: React.FC = observer(() => {

  // Obtener instancia singleton del ViewModel desde el contenedor de Inversify
  const personaVM = container.get<PersonasVM>(TYPES.PersonaViewModel);
  
  // Hook de Expo Router para navegación entre pantallas
  const router = useRouter();
  
  // Estado local para el texto de búsqueda 
  const [busqueda, setBusqueda] = useState<string>("");

  /**
   * useEffect se ejecuta al montar el componente
   * Carga la lista de personas desde la API al iniciar la pantalla
   */
  useEffect(() => {
    personaVM.cargarPersonas();
  }, []); 

  /**
   * Filtra las personas en tiempo real según el texto de búsqueda
   * Busca coincidencias en nombre + apellidos (case insensitive)
   * Si busqueda está vacía, muestra todas las personas
   */
  const personasFiltradas = personaVM.personas.filter((persona: Persona) => {
    if (busqueda.trim() === "") return true;
    const nombreCompleto = `${persona.nombre} ${persona.apellidos}`.toLowerCase();
    return nombreCompleto.includes(busqueda.toLowerCase());
  });

  /**
   * handleEditar
   * Se ejecuta al hacer clic en una persona de la lista
   * 1. Guarda la persona seleccionada en el ViewModel
   * 2. Navega a la pantalla de edición
   */
  function handleEditar(persona: Persona): void {
    personaVM.seleccionarPersona(persona); 
    router.push("/(drawer)/personas/EditarInsertarPersonas" as any);
  }

  function handleEliminar(id: number): void {
    if (Platform.OS === 'web') {
      // En web: diálogo síncrono que retorna true/false
      if (window.confirm("¿Estás seguro de que deseas eliminar esta persona?")) {
        eliminarPersona(id);
      }
    } else {
      // En móvil: diálogo asíncrono con botones configurables
      Alert.alert(
        "Confirmar eliminación", // Título
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

  /**
   * eliminarPersona
   * Ejecuta la eliminación llamando al ViewModel
   * Muestra mensaje de éxito o error según el resultado
   * 
   * El UseCase valida:
   * - NO eliminar los domingos (lanza error)
   * - Delega la eliminación al Repository
   */
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

  /**
   * Navega a la pantalla de creación
   * 1. Limpia la selección en el ViewModel (personaSeleccionada = null)
   * 2. Navega a EditarInsertarPersonas (que detecta null y muestra formulario vacío)
   */
  function handleAnadir(): void {
    personaVM.limpiarSeleccion();
    router.push("/(drawer)/personas/EditarInsertarPersonas" as any);
  }

  /**
   * Si está cargando, mostrar spinner centrado
   * personaVM.isLoading es observable, por lo que el componente
   * se re-renderiza automáticamente cuando cambia
   */
  if (personaVM.isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre..."
          placeholderTextColor={theme.colors.text.disabled}
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {}
      <View style={styles.buttonContainer}>
        <BotonAnadir onPress={handleAnadir} titulo="Anadir Persona" />
      </View>

      {}
      {personasFiltradas.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No hay personas para mostrar</Text>
        </View>
      ) : (
        <FlatList
          data={personasFiltradas} 
          renderItem={({ item }) => (
            // Renderizar cada persona como un Elemento
            <Elemento
              titulo={`${item.nombre} ${item.apellidos}`} 
              subtitulo={item.telefono}
              edad={item.calcularEdad()} 
              fotoUrl={item.foto} 
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