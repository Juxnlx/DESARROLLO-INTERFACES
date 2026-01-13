import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

/**
 * Pantalla de bienvenida.
 * Primera vista que ve el usuario al abrir la app.
 */
export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Gestión de Personas y Departamentos</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/views/personas/ListadoPersonasScreen")}
                >
                    <Text style={styles.buttonText}>Ver Personas</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/views/departamentos/ListadoDepartamentosScreen")}
                >
                    <Text style={styles.buttonText}>Ver Departamentos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#666",
        marginBottom: 40,
        textAlign: "center",
    },
    buttonContainer: {
        width: "100%",
        gap: 15,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
});
