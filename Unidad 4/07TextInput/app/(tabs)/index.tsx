import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

// Componente principal de la pantalla
export default function App() {
  // Declaramos un estado llamado "texto" con useState
  // El valor inicial es una cadena vacía: ''
  // etTexto es la función que usaremos para actualizar ese estado
  const [texto, setTexto] = useState('');

  return (
    // Contenedor principal
    <View style={styles.container}>
      {/* Título de la app */}
      <Text style={styles.titulo}>Escribe algo abajo:</Text>

      {/* TextInput: campo de entrada de texto */}
      <TextInput
        style={styles.input}
        placeholder="Escribe aquí..."           
        value={texto} 
        // Cada vez que cambia, actualiza el estado                       
        onChangeText={setTexto}                
      />

      {/* Text: muestra en tiempo real lo que el usuario escribe */}
      <Text style={styles.textoMostrado}>
        {texto || 'Aún no has escrito nada'}   // Si 'texto' está vacío, muestra un mensaje por defecto
      </Text>
    </View>
  );
}

// Estilos para hacerlo visualmente agradable
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff', // Fondo azul claro
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    maxWidth: 300,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center', // Opcional: centra el texto mientras escribes
  },
  textoMostrado: {
    fontSize: 18,
    color: '#007bff', // Azul
    fontWeight: '500',
    marginTop: 10,
    paddingHorizontal: 10,
  },
});