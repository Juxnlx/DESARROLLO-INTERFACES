import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PersonaModel } from "../models/PersonaModel";

interface Props {
  person: PersonaModel;
}

export const PersonaCard: React.FC<Props> = ({ person }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{person.nombre} {person.apellidos}</Text>
    <Text style={styles.detail}>ID: {person.id}</Text>
    <Text style={styles.detail}>Fecha de nacimiento: {person.fechaNacimiento}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    color: "#555",
  },
});