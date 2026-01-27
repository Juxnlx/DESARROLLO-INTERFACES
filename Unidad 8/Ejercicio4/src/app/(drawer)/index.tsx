import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BotonNavegar } from '../../components/BotonNavegar';
import { CajonBotones } from '../../components/CajonBotones';

export default function PantallaBienvenida() {
  return (
    <View style={styles.container}>
      <CajonBotones>
        <BotonNavegar titulo="Gestionar Personas" ruta="/(drawer)/personas/ListadoPersonas" />
        <BotonNavegar titulo="Gestionar Departamentos" ruta="/(drawer)/departamentos/ListadoDepartamentos" />
      </CajonBotones>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4",
    justifyContent: "center",
  },
});