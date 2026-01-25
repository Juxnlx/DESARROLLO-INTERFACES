import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface BotonAnadirProps {
  onPress: () => void;
  titulo?: string;
}

export const BotonAnadir: React.FC<BotonAnadirProps> = ({ onPress, titulo = "Anadir" }) => {
  const handlePress = (): void => {
    onPress();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{titulo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF9500",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
