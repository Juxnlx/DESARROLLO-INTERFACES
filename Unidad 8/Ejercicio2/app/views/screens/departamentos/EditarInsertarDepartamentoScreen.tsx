import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useRouter, useLocalSearchParams } from "expo-router";
import { container } from "../../../../src/core/container";
import { TYPES } from "../../../../src/core/types";
import { DepartamentosVM } from "../../../../src/presenter/viewmodels/DepartamentosVM";
import { DepartamentoDTO } from "../../../../src/domain/dtos/DepartamentoDTO";

/**
 * Pantalla para crear o editar un departamento.
 * Si recibe un ID por parámetro, carga los datos para editar.
 */
const EditarInsertarDepartamentoScreen: React.FC = observer(() => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const id = params.id ? parseInt(params.id as string) : undefined;

    const [viewModel] = useState(() => container.get<DepartamentosVM>(TYPES.DepartamentosVM));

    // Estados del formulario
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        if (id) {
            // Modo edición: cargar datos del departamento
            await viewModel.cargarDepartamentoPorId(id);

            if (viewModel.departamentoSeleccionado) {
                setNombre(viewModel.departamentoSeleccionado.nombre);
            }
        }
    };

    const handleGuardar = async () => {
        // Validaciones
        if (!nombre.trim()) {
            Alert.alert("Error", "El nombre es obligatorio");
            return;
        }

        try {
            const departamentoDTO = new DepartamentoDTO(nombre.trim(), id);

            if (id) {
                await viewModel.actualizar(id, departamentoDTO);
                Alert.alert("Éxito", "Departamento actualizado correctamente");
            } else {
                await viewModel.crear(departamentoDTO);
                Alert.alert("Éxito", "Departamento creado correctamente");
            }

            router.back();
        } catch (error) {
            Alert.alert("Error", viewModel.error || "No se pudo guardar el departamento");
        }
    };

    const handleCancelar = () => {
        router.back();
    };

    if (viewModel.cargando) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Cargando...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>
                    {id ? "Editar Departamento" : "Nuevo Departamento"}
                </Text>

                {/* Nombre */}
                <Text style={styles.label}>Nombre del Departamento *</Text>
                <TextInput
                    style={styles.input}
                    value={nombre}
                    onChangeText={setNombre}
                    placeholder="Ingresa el nombre del departamento"
                />

                {/* Mensaje de error */}
                {viewModel.error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{viewModel.error}</Text>
                    </View>
                )}

                {/* Botones */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={handleCancelar}
                    >
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.saveButton]}
                        onPress={handleGuardar}
                    >
                        <Text style={styles.saveButtonText}>
                            {id ? "Actualizar" : "Crear"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
});

export default EditarInsertarDepartamentoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
    form: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 15,
        marginBottom: 5,
        color: "#333",
    },
    input: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    errorContainer: {
        backgroundColor: "#FFE5E5",
        padding: 10,
        marginTop: 15,
        borderRadius: 8,
    },
    errorText: {
        color: "#D32F2F",
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 30,
        gap: 10,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#f0f0f0",
    },
    cancelButtonText: {
        color: "#666",
        fontSize: 16,
        fontWeight: "600",
    },
    saveButton: {
        backgroundColor: "#007AFF",
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});