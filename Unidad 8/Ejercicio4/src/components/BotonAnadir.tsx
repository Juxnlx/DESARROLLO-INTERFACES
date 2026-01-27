import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../theme/theme";

interface BotonAnadirProps {
  onPress: () => void;
  titulo: string;
}

export const BotonAnadir: React.FC<BotonAnadirProps> = ({ onPress, titulo }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.icon}>+</Text>
      <Text style={styles.text}>{titulo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    color: theme.colors.surface,
    fontSize: 24,
    fontWeight: "bold",
    marginRight: theme.spacing.sm,
  },
  text: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.md,
    fontWeight: "600",
  },
});
