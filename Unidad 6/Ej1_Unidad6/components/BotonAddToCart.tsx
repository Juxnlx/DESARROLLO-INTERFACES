import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
    text: string;
    onClick: () => void
};

export function BotonAddToCart({ text, onClick }: Props) {
    return (
        <Pressable style={style.container} onPress={onClick}>
            <Text style={style.texto}>{text}</Text>
        </Pressable>
    );
}

const style = StyleSheet.create ({
    container : {
       padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4270B7', 
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    texto : {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});