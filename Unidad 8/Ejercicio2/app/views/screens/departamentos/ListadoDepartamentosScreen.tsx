import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { container } from "../../../../src/core/container";
import { TYPES } from "../../../../src/core/types";
import { DepartamentosVM } from "../../../../src/presenter/viewmodels/DepartamentosVM";
import { DepartamentoListItem } from "../../components/departamentos/DepartamentoListItem";

/**
 * Pantalla de listado de departamentos.
 * Muestra todos los departamentos con búsqueda y opciones CRUD.
 */
const ListadoDepartamentosScreen: React.FC = observer(() => {
    const router = useRouter();
    const [viewModel] = useState(() => container.get<DepartamentosVM>(TYPES.DepartamentosVM));

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        await viewModel.cargarDepartamentos();
    };

    const handleBuscar = (texto: string) => {
        viewModel.filtrar(texto);
    };

    const handleEditar = (id: number) => {
        router.push(`/views/screens/departamentos/EditarInsertarDepartamentoScreen?id=${id}`);
    };

    const handleEliminar = async (id: number) => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de eliminar este departamento?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await viewModel.eliminar(id);
                            Alert.alert("Éxito", "Departamento eliminado correctamente");
                        } catch (error) {
                            Alert.alert("Error", viewModel.error || "No se pudo eliminar el departamento");
                        }
                    },
                },
            ]
        );
    };

    const handleCrear = () => {
        viewModel.limpiarSeleccion();
        router.push("/views/screens/departamentos/EditarInsertarDepartamentoScreen");
    };

    if (viewModel.cargando) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Cargando departamentos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Barra de búsqueda */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar departamentos..."
                    value={viewModel.textoBusqueda}
                    onChangeText={handleBuscar}
                />
            </View>

            {/* Botón crear */}
            <TouchableOpacity style={styles.createButton} onPress={handleCrear}>
                <Text style={styles.createButtonText}>+ Nuevo Departamento</Text>
            </TouchableOpacity>

            {/* Mensaje de error */}
            {viewModel.error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{viewModel.error}</Text>
                </View>
            )}

            {/* Lista de departamentos */}
            <FlatList
                data={viewModel.listaFiltrada}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <DepartamentoListItem
                        departamento={item}
                        onPress={() => handleEditar(item.id)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No hay departamentos para mostrar</Text>
                    </View>
                }
            />
        </View>
    );
});

export default ListadoDepartamentosScreen;

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
    searchContainer: {
        padding: 10,
        backgroundColor: "white",
    },
    searchInput: {
        backgroundColor: "#f0f0f0",
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
    },
    createButton: {
        backgroundColor: "#007AFF",
        margin: 10,
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    createButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    errorContainer: {
        backgroundColor: "#FFE5E5",
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    errorText: {
        color: "#D32F2F",
        fontSize: 14,
    },
    emptyContainer: {
        padding: 40,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#999",
    },
});