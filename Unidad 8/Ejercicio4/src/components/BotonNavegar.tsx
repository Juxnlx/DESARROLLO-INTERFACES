import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../theme/theme";

interface BotonNavegarProps {
  titulo: string;
  ruta: string;
}

export const BotonNavegar: React.FC<BotonNavegarProps> = ({ titulo, ruta }) => {
  const router = useRouter();

  const handlePress = (): void => {
    router.push(ruta as any);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8}>
      <Text style={styles.buttonText}>{titulo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    marginVertical: theme.spacing.sm,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
  },
});