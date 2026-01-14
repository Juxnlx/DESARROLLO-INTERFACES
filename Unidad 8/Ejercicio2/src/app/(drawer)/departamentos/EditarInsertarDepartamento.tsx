import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { BotonSubmit } from "../../../components/BotonSubmit";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { Departamento } from "../../../domain/entities/Departamento";
import { DepartamentosVM } from "../../../presenter/viewmodels/DepartamentosVM";

const EditarInsertarDepartamento: React.FC = observer(() => {
  const departamentoVM = container.get<DepartamentosVM>(TYPES.DepartamentoViewModel);
  const router = useRouter();
  const departamentoSeleccionado = departamentoVM.departamentoSeleccionado;
  const esEdicion = departamentoSeleccionado !== null;

  const [nombre, setNombre] = useState<string>("");

  useEffect(() => {
    cargarDatosDepartamento();
  }, []);

  function cargarDatosDepartamento(): void {
    if (departamentoSeleccionado) {
      setNombre(departamentoSeleccionado.nombre);
    }
  }

  function validarFormulario(): boolean {
    const hayNombre = nombre.trim() !== "";

    if (!hayNombre) {
      Alert.alert("Error", "El nombre del departamento es obligatorio");
      return false;
    }

    return true;
  }

  async function handleGuardar(): Promise<void> {
    if (!validarFormulario()) {
      return;
    }

    const idDepartamento = departamentoSeleccionado ? departamentoSeleccionado.id : 0;
    const departamento = new Departamento(idDepartamento, nombre);

    try {
      if (esEdicion) {
        await departamentoVM.editarDepartamento(idDepartamento, departamento);
        Alert.alert("Éxito", "Departamento actualizado correctamente");
      } else {
        await departamentoVM.crearDepartamento(departamento);
        Alert.alert("Éxito", "Departamento creado correctamente");
      }
      router.back();
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      Alert.alert("Error", mensaje);
    }
  }

  const titulo = esEdicion ? "Editar Departamento" : "Nuevo Departamento";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{titulo}</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre del Departamento *</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ingrese el nombre del departamento"
          />
        </View>

        <BotonSubmit
          titulo={esEdicion ? "Actualizar" : "Crear"}
          onPress={handleGuardar}
          isLoading={departamentoVM.isLoading}
        />
      </View>
    </ScrollView>
  );
});

export default EditarInsertarDepartamento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});