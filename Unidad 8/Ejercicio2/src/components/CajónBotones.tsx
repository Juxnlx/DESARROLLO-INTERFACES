import React from "react";
import { View, StyleSheet } from "react-native";

interface CajonBotonesProps {
  children: React.ReactNode;
}

export const CajonBotones: React.FC<CajonBotonesProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
});