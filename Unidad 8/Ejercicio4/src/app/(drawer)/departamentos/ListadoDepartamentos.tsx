import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { JSX, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { BotonAnadir } from "../../../components/BotonAnadir";
import { Elemento } from "../../../components/Elemento";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { Departamento } from "../../../domain/entities/Departamento";
import { DepartamentosVM } from "../../../presenter/viewmodels/DepartamentosVM";
import { theme } from "../../../theme/theme";

const ListadoDepartamentos: React.FC = observer(() => {
  const departamentoVM = container.get<DepartamentosVM>(TYPES.DepartamentoViewModel);
  const router = useRouter();
  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => {
    cargarDatos();
  }, []);

  function cargarDatos(): void {
    departamentoVM.cargarDepartamentos();
  }

  function filtrarDepartamentos(): Departamento[] {
    const lista = departamentoVM.departamentos;
    let resultado: Departamento[] = [];

    if (busqueda.trim() === "") {
      resultado = lista;
    } else {
      const busquedaLower = busqueda.toLowerCase();
      resultado = lista.filter((dept) => {
        return dept.nombre.toLowerCase().includes(busquedaLower);
      });
    }

    return resultado;
  }

  const departamentosFiltrados = filtrarDepartamentos();

  function handleEditar(departamento: Departamento): void {
    departamentoVM.seleccionarDepartamento(departamento);
    router.push("/(drawer)/departamentos/EditarInsertarDepartamento" as any);
  }

  function handleEliminar(id: number): void {
    if (Platform.OS === 'web') {
      if (window.confirm("¿Estás seguro de que deseas eliminar este departamento?")) {
        eliminarDepartamento(id);
      }
    } else {
      Alert.alert(
        "Confirmar eliminación",
        "¿Estás seguro de que deseas eliminar este departamento?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: () => eliminarDepartamento(id),
          },
        ]
      );
    }
  }

  async function eliminarDepartamento(id: number): Promise<void> {
    try {
      await departamentoVM.eliminarDepartamento(id);
      
      if (Platform.OS === 'web') {
        window.alert("Éxito: Departamento eliminado correctamente");
      } else {
        Alert.alert("Éxito", "Departamento eliminado correctamente");
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
    departamentoVM.limpiarSeleccion();
    router.push("/(drawer)/departamentos/EditarInsertarDepartamento" as any);
  }

  function renderDepartamento({ item }: { item: Departamento }): JSX.Element {
    return (
      <Elemento
        titulo={item.nombre}
        onPress={() => handleEditar(item)}
        onDelete={() => handleEliminar(item.id)}
      />
    );
  }

  function renderContenido(): JSX.Element {
    let contenido: JSX.Element = <View />;

    if (departamentoVM.isLoading) {
      contenido = (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    } else if (departamentosFiltrados.length === 0) {
      contenido = (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No hay departamentos para mostrar</Text>
        </View>
      );
    } else {
      contenido = (
        <FlatList
          data={departamentosFiltrados}
          renderItem={renderDepartamento}
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
          placeholder="Buscar departamento..."
          placeholderTextColor={theme.colors.text.disabled}
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <View style={styles.buttonContainer}>
        <BotonAnadir onPress={handleAnadir} titulo="Anadir Departamento" />
      </View>

      {renderContenido()}
    </View>
  );
});

export default ListadoDepartamentos;

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