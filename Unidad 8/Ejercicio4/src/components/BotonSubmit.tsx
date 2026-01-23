import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../theme/theme";

/**
 * BOTÓN SUBMIT
 * Botón de submit con loading spinner integrado.
 * Se deshabilita y muestra spinner cuando isLoading es true.
 */

interface BotonSubmitProps {
  titulo: string;
  onPress: () => void;
  isLoading?: boolean;
}

export const BotonSubmit: React.FC<BotonSubmitProps> = ({
  titulo,
  onPress,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isLoading && styles.buttonDisabled]}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.surface} size="small" />
      ) : (
        <Text style={styles.text}>{titulo}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.lg,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.text.disabled,
    shadowOpacity: 0.1,
  },
  text: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
  },
});