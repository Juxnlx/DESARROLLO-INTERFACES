import React from 'react';
import { StyleSheet, View } from 'react-native';
import BotonPersonalizado from '../../components/BotonPersonalizado';

export default function Index() {
  return (

    <View style={styles.container}>
      {/* Reutilizamos el mismo componente 4 veces, cambiando solo las "props" */}
      
      {/* Botón 1: texto "Inicio", al pulsar muestra alerta con ese texto */}
      <BotonPersonalizado
        texto="Inicio"
        onPress={() => alert('Has pulsado: Inicio')}
      />
      
      {/* Botón 2: texto "Perfil" */}
      <BotonPersonalizado
        texto="Perfil"
        onPress={() => alert('Has pulsado: Perfil')}
      />
      
      {/* Botón 3: texto "Configuración" */}
      <BotonPersonalizado
        texto="Configuración"
        onPress={() => alert('Has pulsado: Configuración')}
      />
      
      {/* Botón 4: texto "Salir" */}
      <BotonPersonalizado
        texto="Salir"
        onPress={() => alert('Has pulsado: Salir')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
});