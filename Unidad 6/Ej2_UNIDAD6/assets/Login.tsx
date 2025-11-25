import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import App from '../app/App';
import { Boton } from '../app/components/Boton';
import { Formulario } from '../app/components/Formulario';

type Props = {
  navigation: NativeStackNavigationProp<App, 'Login'>;
};

export const Login = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Formulario>
      <Boton title="Entrar" onPress={() => navigation.navigate('Home')} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Regístrate</Text>
      </TouchableOpacity>
    </Formulario>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#F0F0F0' },
  link: { color: '#1E90FF', marginTop: 10, textAlign: 'center' },
});
