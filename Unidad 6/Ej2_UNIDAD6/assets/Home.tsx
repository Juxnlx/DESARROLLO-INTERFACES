import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Home = () => (
  <View style={styles.container}>
    <Text>Te has logueado correctamente</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
