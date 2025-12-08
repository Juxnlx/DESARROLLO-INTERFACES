import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

const ListaConFAB: React.FC = () => {

  // Referencia a la lista
  const listaRef = useRef<FlatList<string>>(null);

  // Estado del botón
  const [mostrarBoton, setMostrarBoton] = useState<boolean>(false);

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(80)).current;

  // Datos (100 elementos)
  const datos: string[] = Array.from(
    { length: 100 },
    (_, i) => `Elemento ${i + 1}`
  );

  // Control del scroll
  const manejarScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ): void => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setMostrarBoton(offsetY > 300);
  };

  // Animación del FAB
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: mostrarBoton ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: mostrarBoton ? 0 : 80,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [mostrarBoton]);

  // Volver arriba
  const irArriba = (): void => {
    listaRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>

      <FlatList
        ref={listaRef}
        data={datos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        onScroll={manejarScroll}
        scrollEventThrottle={16}
      />

      {/* FAB animado */}
      <Animated.View
        style={[
          styles.fabContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        <TouchableOpacity style={styles.fab} onPress={irArriba}>
          <Text style={styles.fabText}>↑</Text>
        </TouchableOpacity>
      </Animated.View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemText: {
    fontSize: 18,
  },
  fabContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
  },
  fab: {
    backgroundColor: "#6200ee",
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
});

export default ListaConFAB;

