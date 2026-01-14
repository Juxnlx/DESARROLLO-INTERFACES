import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PersonaViewModel } from "../../../../src/presenter/models/PersonaViewModel";

interface Props {
    persona: PersonaViewModel;
    onPress: () => void;
    onDelete: () => void;
}

export const PersonaListItem: React.FC<Props> = ({ persona, onPress, onDelete }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.content} onPress={onPress}>
                <Text style={styles.name}>{persona.nombreCompleto}</Text>
                <Text style={styles.info}>Edad: {persona.edad} anos</Text>
                <Text style={styles.info}>Telefono: {persona.telefono}</Text>
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
    info: {
        fontSize: 14,
        color: "#666",
        marginBottom: 2,
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