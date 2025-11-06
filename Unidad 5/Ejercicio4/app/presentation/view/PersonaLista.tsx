import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PersonaCard } from "../components/PersonaCard";
import { usePersonaListaVM } from "../viewmodels/PersonaListaVM";

export const PersonaLista = () => {
  const { personas } = usePersonaListaVM(false); // cambiar a true para repo vacío

  if (personas.length === 0)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No hay personas disponibles</Text>
      </View>
    );

  const persona = personas[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Persona del día</Text>
      <PersonaCard person={persona} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef2f3",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
});