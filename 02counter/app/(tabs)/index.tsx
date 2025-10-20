import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Index = () => {

  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState(0); // Nuevo estado para contar todos los clicks

  const incrementar = () => {
    setClicks(clicks + 1);
    setCount(count + 1);
    checkClicksAlert();
  };

  const decrementar = () => {
    setClicks(clicks + 1);
    setCount(count - 1);
    checkClicksAlert();
  };

  const checkClicksAlert = () => {
    if (clicks % 10 === 0 && clicks !== 0) {
      alert(`Enhorabuena, llevas ${clicks} clicks`)
    }
  };
  

  return (
   <View style={styles.container}>
      <Text style={styles.title}>
        Contador: {count}
      </Text>

      <Pressable onPress={incrementar} style={styles.button}>
        <Text style={styles.buttonText}>Incrementar</Text>
        <Ionicons name="add-circle" size={24} color="white" />
      </Pressable>

      <Pressable onPress={decrementar} style={styles.button}>
        <Text style={styles.buttonText}>Decrementar</Text>
        <Ionicons name="add-circle" size={24} color="white" />
      </Pressable>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 20,
    marginTop: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 8,
  },
});


export default Index;


