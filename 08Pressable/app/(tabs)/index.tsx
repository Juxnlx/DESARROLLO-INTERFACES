// Importamos lo necesario
import { Ionicons } from '@expo/vector-icons'; // Para el icono de recarga
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  // Estado para controlar si estamos cargando o no
  const [cargando, setCargando] = useState(false);
  // Estado para saber si ya se cargó con éxito
  const [cargado, setCargado] = useState(false);

  // Función que se ejecuta al pulsar el botón de recarga
  const handleRecargar = () => {
    // Primero, reseteamos el estado: no está cargado, y sí está cargando
    setCargado(false);
    setCargando(true);

    // Después de 2 segundos
    setTimeout(() => {
      setCargando(false);   // Deja de mostrar el ActivityIndicator
      setCargado(true);     // Muestra el mensaje de éxito
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Botón con icono de recarga */}
      <Pressable onPress={handleRecargar} style={styles.botonRecarga}>
        <Ionicons name="refresh" size={28} color="#1e88e5" />
      </Pressable>

      {/* Mostramos el ActivityIndicator SI está cargando */}
      {cargando && <ActivityIndicator size="large" color="#1e88e5" />}

      {/* Mostramos el mensaje de éxito SI ya terminó la carga */}
      {cargado && <Text style={styles.textoExito}>Cargado con éxito</Text>}
    </View>
  );
}

// Estilos bonitos y centrados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f9ff',
    padding: 20,
  },
  botonRecarga: {
    padding: 12,
    marginBottom: 30,
  },
  textoExito: {
    marginTop: 20,
    fontSize: 18,
    color: '#2e7d32',
    fontWeight: '600',
  },
});