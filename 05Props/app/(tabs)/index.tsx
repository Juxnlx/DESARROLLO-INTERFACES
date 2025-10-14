import React from 'react';
import { Alert, GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';

// Componente BotonPersonalizado en el mismo archivo
interface BotonPersonalizadoProps {
  texto: string;
  onPress?: (event: GestureResponderEvent) => void;
  colorFondo?: string;
  colorTexto?: string;
}

const BotonPersonalizado: React.FC<BotonPersonalizadoProps> = ({
  texto,
  onPress,
  colorFondo = '#007AFF',
  colorTexto = 'white'
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.boton,
        { backgroundColor: colorFondo },
        pressed && styles.botonPresionado
      ]}
      onPress={onPress}
    >
      <Text style={[styles.texto, { color: colorTexto }]}>
        {texto}
      </Text>
    </Pressable>
  );
};

// Componente principal
export default function HomeScreen() {
  const manejarPress = (textoBoton: string) => {
    Alert.alert('Botón presionado', `Has presionado: ${textoBoton}`);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Componentes Reutilizables</Text>
      <Text style={styles.subtitulo}>4 botones con diferentes textos usando props</Text>
      
      <BotonPersonalizado
        texto="Primer Botón"
        onPress={() => manejarPress('Primer Botón')}
      />
      
      <BotonPersonalizado
        texto="Segundo Botón"
        onPress={() => manejarPress('Segundo Botón')}
        colorFondo="#FF3B30"
      />
      
      <BotonPersonalizado
        texto="Tercer Botón"
        onPress={() => manejarPress('Tercer Botón')}
        colorFondo="#34C759"
        colorTexto="black"
      />
      
      <BotonPersonalizado
        texto="Cuarto Botón"
        onPress={() => manejarPress('Cuarto Botón')}
        colorFondo="#5856D6"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F2F2F7',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  boton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  botonPresionado: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  texto: {
    fontSize: 16,
    fontWeight: '600',
  },
});