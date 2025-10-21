// components/BotonPersonalizado.tsx
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface BotonPersonalizadoProps {
  // Texto que se mostrará dentro del botón.
  texto: string;
  // Función que se ejecutará al pulsar el botón no tiene parametros de entrada
  // y tampoco devuelve nada.
  onPress: () => void;
}

// Creamos un componente que recibe como parámetro un objeto con las props 
// definidas arriba.
const BotonPersonalizado = ({ texto, onPress }: BotonPersonalizadoProps) => {
  return (
    <Pressable style={styles.boton} onPress={onPress}>
      <Text style={styles.texto}>{texto}</Text>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 24,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BotonPersonalizado;