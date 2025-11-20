import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BotonAddToCart } from './BotonAddToCart';

type Props = {
    name: string;
    price: number;
    image: string;
    onAddToCart: () => void
};

export function TarjetaProducto({ name, price, image, onAddToCart }: Props) {
  const safePrice = typeof price === 'number' ? price : 0;
  const formattedPrice = `€${safePrice.toFixed(2)} EUR`;  
  
  return (
        <View style={style.container}>
            <Image source={{ uri: image }} style={style.productImage} />
            <Text style={style.nameText}>{name}</Text>
            <Text style={style.priceText}>{formattedPrice}</Text>
            <BotonAddToCart 
                text="Add to Cart" // Texto del botón según la imagen
                onClick={onAddToCart}
            />
        </View>
    );
}

const style = StyleSheet.create ({
    container : {
        width: 200,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    productImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    nameText : {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 5,
    },
    priceText : {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 15,
    },
});