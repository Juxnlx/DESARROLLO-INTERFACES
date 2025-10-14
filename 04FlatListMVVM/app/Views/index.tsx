import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Persona } from '../Models/Entidades/PersonaModel';
import { IndexVM } from '../ViewModels/indexVM';

const Index = () => {
  const viewModel = new IndexVM();
  const personas = viewModel.getPersonas();

  const handlePress = (persona: Persona) => {
    Alert.alert(
      'Información de la persona',
      `ID: ${persona.id}\nNombre: ${persona.name}\nApellidos: ${persona.surname}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Personas</Text>

      <FlatList
        data={personas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item)} style={styles.item}>
            <Text style={styles.nombre}>{item.name}</Text>
            <Text style={styles.apellidos}>{item.surname}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  apellidos: {
    fontSize: 16,
    color: '#555',
  },
});

export default Index;