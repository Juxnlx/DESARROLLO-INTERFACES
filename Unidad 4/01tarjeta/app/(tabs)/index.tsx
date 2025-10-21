import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Card() {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://picsum.photos/200' }}
        style={styles.image}
      />
      <Text style={styles.text}>Hola, soy una tarjeta 😄</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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

