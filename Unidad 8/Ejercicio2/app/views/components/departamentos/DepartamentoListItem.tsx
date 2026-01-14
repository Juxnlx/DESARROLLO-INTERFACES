import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DepartamentoViewModel } from "../../../../src/presenter/models/DepartamentoViewModel";

interface Props {
    departamento: DepartamentoViewModel;
    onPress: () => void;
    onDelete: () => void;
}

/**
 * Componente para renderizar un item de departamento en la lista.
 */
export const DepartamentoListItem: React.FC<Props> = ({ departamento, onPress, onDelete }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.content} onPress={onPress}>
                <Text style={styles.name}>{departamento.nombre}</Text>
                <Text style={styles.id}>ID: {departamento.id}</Text>
            </TouchableOpacity>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                    <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    content: {
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    id: {
        fontSize: 14,
        color: "#666",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    deleteButton: {
        backgroundColor: "#FF3B30",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
});