import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


type Props = {
  navigation: NativeStackNavigationProp<App, 'Register'>;
};

export const Register = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Text>Página de registro</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
