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
    Modal,
    FlatList,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useRouter, useLocalSearchParams } from "expo-router";
import { container } from "../../../../src/core/container";
import { TYPES } from "../../../../src/core/types";
import { PersonasVM } from "../../../../src/presenter/viewmodels/PersonasVM";
import { PersonaDTO } from "../../../../src/domain/dtos/PersonaDTO";

/**
 * Pantalla para crear o editar una persona.
 * Si recibe un ID por parámetro, carga los datos para editar.
 */
const EditarInsertarPersonaScreen: React.FC = observer(() => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const id = params.id ? parseInt(params.id as string) : undefined;

    const [viewModel] = useState(() => container.get<PersonasVM>(TYPES.PersonasVM));

    // Estados del formulario
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [foto, setFoto] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [fechaTexto, setFechaTexto] = useState("");
    const [idDepartamento, setIdDepartamento] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        await viewModel.cargarDepartamentos();

        if (id) {
            // Modo edición: cargar datos de la persona
            await viewModel.cargarPersonaPorId(id);

            if (viewModel.personaSeleccionada) {
                const persona = viewModel.personaSeleccionada;
                setNombre(persona.nombre);
                setApellidos(persona.apellidos);
                setTelefono(persona.telefono);
                setDireccion(persona.direccion);
                setFoto(persona.foto);
                setFechaNacimiento(persona.fechaNacimiento);
                setFechaTexto(persona.fechaNacimiento.toLocaleDateString("es-ES"));
                setIdDepartamento(persona.idDepartamento);
            }
        } else {
            // Modo creación: inicializar con primer departamento y fecha actual
            if (viewModel.listaDepartamentos.length > 0) {
                setIdDepartamento(viewModel.listaDepartamentos[0].id);
            }
            const hoy = new Date();
            setFechaNacimiento(hoy);
            setFechaTexto(hoy.toLocaleDateString("es-ES"));
        }
    };

    const handleFechaChange = (text: string) => {
        setFechaTexto(text);

        // Intentar parsear la fecha (formato DD/MM/AAAA)
        const parts = text.split("/");
        if (parts.length === 3) {
            const day = parseInt(parts[0]);
            const month = parseInt(parts[1]) - 1; // Los meses en JS van de 0-11
            const year = parseInt(parts[2]);

            if (!isNaN(day) && !isNaN(month) && !isNaN(year) && 
                day >= 1 && day <= 31 && 
                month >= 0 && month <= 11 && 
                year >= 1900 && year <= 2100) {
                setFechaNacimiento(new Date(year, month, day));
            }
        }
    };

    const handleGuardar = async () => {
        // Validaciones
        if (!nombre.trim()) {
            Alert.alert("Error", "El nombre es obligatorio");
            return;
        }
        if (!apellidos.trim()) {
            Alert.alert("Error", "Los apellidos son obligatorios");
            return;
        }
        if (!telefono.trim()) {
            Alert.alert("Error", "El teléfono es obligatorio");
            return;
        }
        if (!direccion.trim()) {
            Alert.alert("Error", "La dirección es obligatoria");
            return;
        }
        if (idDepartamento === null) {
            Alert.alert("Error", "Debes seleccionar un departamento");
            return;
        }

        // Validar formato de fecha
        const parts = fechaTexto.split("/");
        if (parts.length !== 3 || fechaTexto.length < 8) {
            Alert.alert("Error", "La fecha debe estar en formato DD/MM/AAAA");
            return;
        }

        try {
            // Buscar nombre del departamento
            const departamento = viewModel.listaDepartamentos.find(d => d.id === idDepartamento);
            const nombreDepartamento = departamento?.nombre || "";

            const personaDTO = new PersonaDTO(
                nombre.trim(),
                apellidos.trim(),
                telefono.trim(),
                direccion.trim(),
                foto.trim() || "https://via.placeholder.com/150",
                fechaNacimiento,
                idDepartamento,
                nombreDepartamento,
                id
            );

            if (id) {
                await viewModel.actualizar(id, personaDTO);
                Alert.alert("Éxito", "Persona actualizada correctamente");
            } else {
                await viewModel.crear(personaDTO);
                Alert.alert("Éxito", "Persona creada correctamente");
            }

            router.back();
        } catch (error) {
            Alert.alert("Error", viewModel.error || "No se pudo guardar la persona");
        }
    };

    const handleCancelar = () => {
        router.back();
    };

    const seleccionarDepartamento = (deptId: number) => {
        setIdDepartamento(deptId);
        setModalVisible(false);
    };

    const obtenerNombreDepartamento = () => {
        if (idDepartamento === null) return "Seleccionar departamento";
        const dept = viewModel.listaDepartamentos.find(d => d.id === idDepartamento);
        return dept?.nombre || "Seleccionar departamento";
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
                <Text style={styles.title}>{id ? "Editar Persona" : "Nueva Persona"}</Text>

                {/* Nombre */}
                <Text style={styles.label}>Nombre *</Text>
                <TextInput
                    style={styles.input}
                    value={nombre}
                    onChangeText={setNombre}
                    placeholder="Ingresa el nombre"
                />

                {/* Apellidos */}
                <Text style={styles.label}>Apellidos *</Text>
                <TextInput
                    style={styles.input}
                    value={apellidos}
                    onChangeText={setApellidos}
                    placeholder="Ingresa los apellidos"
                />

                {/* Teléfono */}
                <Text style={styles.label}>Teléfono *</Text>
                <TextInput
                    style={styles.input}
                    value={telefono}
                    onChangeText={setTelefono}
                    placeholder="Ingresa el teléfono"
                    keyboardType="phone-pad"
                />

                {/* Dirección */}
                <Text style={styles.label}>Dirección *</Text>
                <TextInput
                    style={styles.input}
                    value={direccion}
                    onChangeText={setDireccion}
                    placeholder="Ingresa la dirección"
                />

                {/* Foto URL */}
                <Text style={styles.label}>URL de la foto</Text>
                <TextInput
                    style={styles.input}
                    value={foto}
                    onChangeText={setFoto}
                    placeholder="https://ejemplo.com/foto.jpg"
                />

                {/* Fecha de Nacimiento */}
                <Text style={styles.label}>Fecha de Nacimiento (DD/MM/AAAA) *</Text>
                <TextInput
                    style={styles.input}
                    value={fechaTexto}
                    onChangeText={handleFechaChange}
                    placeholder="DD/MM/AAAA"
                    keyboardType="numeric"
                    maxLength={10}
                />

                {/* Departamento */}
                <Text style={styles.label}>Departamento *</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.selectorText}>{obtenerNombreDepartamento()}</Text>
                </TouchableOpacity>

                {/* Modal selector de departamento */}
                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Seleccionar Departamento</Text>
                            
                            <FlatList
                                data={viewModel.listaDepartamentos}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.modalItem,
                                            item.id === idDepartamento && styles.modalItemSelected
                                        ]}
                                        onPress={() => seleccionarDepartamento(item.id)}
                                    >
                                        <Text style={[
                                            styles.modalItemText,
                                            item.id === idDepartamento && styles.modalItemTextSelected
                                        ]}>
                                            {item.nombre}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />

                            <TouchableOpacity
                                style={styles.modalCloseButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalCloseButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

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

export default EditarInsertarPersonaScreen;

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
    selectorText: {
        fontSize: 16,
        color: "#333",
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
    // Estilos del modal
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        width: "80%",
        maxHeight: "70%",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        color: "#333",
    },
    modalItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    modalItemSelected: {
        backgroundColor: "#E3F2FD",
    },
    modalItemText: {
        fontSize: 16,
        color: "#333",
    },
    modalItemTextSelected: {
        color: "#007AFF",
        fontWeight: "600",
    },
    modalCloseButton: {
        marginTop: 15,
        padding: 12,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        alignItems: "center",
    },
    modalCloseButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#666",
    },
});