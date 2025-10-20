import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Card() {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: 'https://www.goodvinilos.com/109224/vinilo-decorativo-3d-iron-man-marvel.jpg' }}
      />
      <Text style={styles.text}>Fernando Galiana</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', // Color de fondo.
    borderRadius: 10, // Redondear las esquinas del borde exterior.
    shadowColor: '#000', // Color de la sombra.
    shadowRadius: 5, // Radio de sombra.
    elevation: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
  },
});

