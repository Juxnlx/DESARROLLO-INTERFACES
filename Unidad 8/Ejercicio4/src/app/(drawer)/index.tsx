import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BotonNavegar } from '../../components/BotonNavegar';
import { CajonBotones } from '../../components/CajonBotones';

/**
 * Componente PantallaBienvenida
 * Pantalla simple con dos botones de navegación centrados verticalmente.
 */
export default function PantallaBienvenida() {
  return (
    <View style={styles.container}>
      {/* 
        CajonBotones: Contenedor con sombra y padding que agrupa los botones
        Aplica estilos consistentes: background blanco, border radius, sombras
      */}
      <CajonBotones>
        {/* 
          Botón para navegar al listado de personas
        */}
        <BotonNavegar 
          titulo="Gestionar Personas" 
          ruta="/(drawer)/personas/ListadoPersonas" 
        />
        
        {/* 
          Botón para navegar al listado de departamentos
        */}
        <BotonNavegar 
          titulo="Gestionar Departamentos" 
          ruta="/(drawer)/departamentos/ListadoDepartamentos" 
        />
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