import { Picker } from "@react-native-picker/picker";
import { useFocusEffect, useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { BotonSubmit } from "../../../components/BotonSubmit";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { Persona } from "../../../domain/entities/Persona";
import { DepartamentosVM } from "../../../presenter/viewmodels/DepartamentosVM";
import { PersonasVM } from "../../../presenter/viewmodels/PersonasVM";

const EditarInsertarPersonas: React.FC = observer(() => {
  const personaVM = container.get<PersonasVM>(TYPES.PersonaViewModel);
  const departamentoVM = container.get<DepartamentosVM>(TYPES.DepartamentoViewModel);
  const router = useRouter();

  const [nombre, setNombre] = useState<string>("");
  const [apellidos, setApellidos] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");
  const [foto, setFoto] = useState<string>("");
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [idDepartamento, setIdDepartamento] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      const personaSeleccionada = personaVM.personaSeleccionada;
      
      departamentoVM.cargarDepartamentos();
      
      if (personaSeleccionada) {
        setNombre(personaSeleccionada.nombre);
        setApellidos(personaSeleccionada.apellidos);
        setTelefono(personaSeleccionada.telefono);
        setDireccion(personaSeleccionada.direccion);
        setFoto(personaSeleccionada.foto);
        setFechaNacimiento(formatearFecha(personaSeleccionada.fechaNacimiento));
        setIdDepartamento(personaSeleccionada.idDepartamento);
      } else {
        setNombre("");
        setApellidos("");
        setTelefono("");
        setDireccion("");
        setFoto("");
        setFechaNacimiento("");
        setIdDepartamento(0);
      }
    }, [])
  );

  function formatearFecha(fecha: Date): string {
    const d = new Date(fecha);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function validarFormulario(): boolean {
    const hayNombre = nombre.trim() !== "";
    const hayApellidos = apellidos.trim() !== "";
    const hayTelefono = telefono.trim() !== "";
    const hayDepartamento = idDepartamento > 0;

    if (!hayNombre || !hayApellidos || !hayTelefono || !hayDepartamento) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios");
      return false;
    }

    return true;
  }

  async function handleGuardar(): Promise<void> {
    if (!validarFormulario()) {
      return;
    }

    const fecha = fechaNacimiento ? new Date(fechaNacimiento) : new Date();
    const personaSeleccionada = personaVM.personaSeleccionada;
    const idPersona = personaSeleccionada ? personaSeleccionada.id : 0;
    const esEdicion = personaSeleccionada !== null;

    const persona = new Persona(
      idPersona,
      nombre,
      apellidos,
      telefono,
      direccion,
      foto,
      fecha,
      idDepartamento
    );

    try {
      if (esEdicion) {
        await personaVM.editarPersona(idPersona, persona);
        Alert.alert("Exito", "Persona actualizada correctamente");
      } else {
        await personaVM.crearPersona(persona);
        Alert.alert("Exito", "Persona creada correctamente");
      }
      router.back();
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      Alert.alert("Error", mensaje);
    }
  }

  const personaSeleccionada = personaVM.personaSeleccionada;
  const esEdicion = personaSeleccionada !== null;
  const titulo = esEdicion ? "Editar Persona" : "Nueva Persona";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{titulo}</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre *</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ingrese el nombre"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Apellidos *</Text>
          <TextInput
            style={styles.input}
            value={apellidos}
            onChangeText={setApellidos}
            placeholder="Ingrese los apellidos"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Telefono *</Text>
          <TextInput
            style={styles.input}
            value={telefono}
            onChangeText={setTelefono}
            placeholder="Ingrese el telefono"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Direccion</Text>
          <TextInput
            style={styles.input}
            value={direccion}
            onChangeText={setDireccion}
            placeholder="Ingrese la direccion"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Foto URL</Text>
          <TextInput
            style={styles.input}
            value={foto}
            onChangeText={setFoto}
            placeholder="URL de la foto"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Fecha de Nacimiento</Text>
          <TextInput
            style={styles.input}
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Departamento *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={idDepartamento}
              onValueChange={(itemValue) => setIdDepartamento(itemValue as number)}
            >
              <Picker.Item label="Seleccione un departamento" value={0} />
              {departamentoVM.departamentos.map((dept) => (
                <Picker.Item key={dept.id} label={dept.nombre} value={dept.id} />
              ))}
            </Picker>
          </View>
        </View>

        <BotonSubmit
          titulo={esEdicion ? "Actualizar" : "Crear"}
          onPress={handleGuardar}
          isLoading={personaVM.isLoading}
        />
      </View>
    </ScrollView>
  );
});

export default EditarInsertarPersonas;

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
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});