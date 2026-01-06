import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { container } from '../../core/container';
import { TYPES } from '../../core/types';
import { JuegoDepartamentosVM } from '../../presenter/viewmodels/JuegoDepartamentosVM';

export default function JuegoDepartamentosV() {
    // Usamos los imports para que no se eliminen
    const test = TYPES;
    const test2 = container;
    const test3 = JuegoDepartamentosVM;
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Paso 4: ViewModel importado OK</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#34C759',
    },
    text: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});