import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Persona } from '../Models/Entities/PersonaModel';
import { IndexVM } from '../ViewModels/PeopleListVM';

export default function Views() {
  const vm = new IndexVM();
  const listaPersonas: Persona[] = vm.listaDePersona;

  return (
    <View style={styles.container}>
      <FlatList
        data={listaPersonas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.itemContainer,
              pressed ? styles.itemPressed : null,
            ]}
            onPress={() => (vm.personaSeleccionada = item)}
          >
            <Text style={styles.itemText}>
              {item.name} {item.surname}
            </Text>
          </Pressable>
        )}
      />

      <View style={styles.selectedContainer}>
        <Text style={styles.selectedText}>
          Persona seleccionada: {vm.personaSeleccionada?.name || 'Ninguna'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3e8ff',
  },
  itemContainer: {
    padding: 15,
    marginVertical: 6,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2, // para sombra en Android
    shadowColor: '#000', // para sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemPressed: {
    backgroundColor: '#d0e8ff',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center'
  },
  selectedContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#616161ff',
    borderRadius: 8,
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
