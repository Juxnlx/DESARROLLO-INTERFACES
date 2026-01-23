import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme/theme";

interface ElementoProps {
  titulo: string;
  subtitulo?: string;
  edad?: number;
  fotoUrl?: string;
  onPress: () => void;
  onDelete?: () => void;
}

export const Elemento: React.FC<ElementoProps> = ({
  titulo,
  subtitulo,
  edad,
  fotoUrl,
  onPress,
  onDelete,
}) => {
  // Imagen por defecto si no hay URL
  const imagenDefecto = "https://via.placeholder.com/60/047857/FFFFFF?text=👤";
  const imagenMostrar = fotoUrl && fotoUrl.trim() !== "" ? fotoUrl : imagenDefecto;
  
  // Mostrar foto solo si se proporciona fotoUrl (incluso vacío cuenta como "quiero foto")
  const mostrarFoto = fotoUrl !== undefined;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {/* Foto circular a la izquierda - SOLO si se pasa fotoUrl */}
      {mostrarFoto && (
        <Image
          source={{ uri: imagenMostrar }}
          style={styles.foto}
          defaultSource={{ uri: imagenDefecto }}
        />
      )}

      <View style={styles.content}>
        <Text style={styles.titulo} numberOfLines={1}>
          {titulo}
        </Text>
        {subtitulo && (
          <Text style={styles.subtitulo} numberOfLines={1}>
            {subtitulo}
          </Text>
        )}
        {edad !== undefined && (
          <Text style={styles.edad}>
            {edad} años
          </Text>
        )}
      </View>

      {onDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.secondary,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
  },
  content: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  titulo: {
    fontSize: theme.fontSize.md,
    fontWeight: "600",
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  edad: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.accent,
    fontWeight: "600",
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.error,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: theme.colors.surface,
    fontSize: 18,
    fontWeight: "bold",
  },
});