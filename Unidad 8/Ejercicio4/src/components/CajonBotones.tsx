import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../theme/theme";

interface CajonBotonesProps {
  children: React.ReactNode;
}

export const CajonBotones: React.FC<CajonBotonesProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    margin: theme.spacing.lg,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});