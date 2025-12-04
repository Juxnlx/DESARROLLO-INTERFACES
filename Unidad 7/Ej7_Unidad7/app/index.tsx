import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CountdownTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    }

    // Limpieza del intervalo
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, secondsLeft]);

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(60);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{secondsLeft} s</Text>

      <View style={styles.buttons}>
        <Button title={isRunning ? 'Pause' : 'Start'} onPress={toggleTimer} />
        <Button title="Reset" onPress={resetTimer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttons: {
    gap: 15,
  },
});

export default CountdownTimer;
