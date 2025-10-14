// Importamos lo necesario
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function App() {
  // Estado booleano: true = modo oscuro activado, false = desactivado
  const [modoOscuro, setModoOscuro] = useState(false);

  return (
    <View style={[styles.container, modoOscuro ? styles.fondoOscuro : styles.fondoClaro]}>
      <Text style={[styles.titulo, modoOscuro ? styles.textoBlanco : styles.textoNegro]}>
        Configuración de Tema
      </Text>

      <View style={styles.fila}>
        <Text style={[styles.etiqueta, modoOscuro ? styles.textoBlanco : styles.textoNegro]}>
          Modo oscuro
        </Text>
        {/* El Switch controla el estado directamente */}
        <Switch
          value={modoOscuro}
          onValueChange={setModoOscuro} // Al cambiar, actualiza el estado
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={modoOscuro ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <Text style={[styles.estado, modoOscuro ? styles.textoBlanco : styles.textoNegro]}>
        {modoOscuro ? 'Modo oscuro activado' : 'Modo oscuro desactivado'}
      </Text>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fondoClaro: {
    backgroundColor: '#ffffff',
  },
  fondoOscuro: {
    backgroundColor: '#000000',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  textoNegro: {
    color: '#000000',
  },
  textoBlanco: {
    color: '#ffffff',
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  etiqueta: {
    fontSize: 18,
  },
  estado: {
    fontSize: 18,
    marginTop: 20,
    fontStyle: 'italic',
  },
});
