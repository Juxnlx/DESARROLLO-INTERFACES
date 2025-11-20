import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TarjetaProducto } from "../../components/TarjetaProducto";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}


const products: Product[] = [
  { id: 1, name: 'Reloj BuenoBonitoBarato', price: 79.99, image: 'https://m.media-amazon.com/images/I/61IjQceu6-L.jpg' },
  { id: 2, name: 'Dron', price: 349.99, image: 'https://fotoruanopro.com/37351-home_default/dji-mavic-3-pro-con-controlador-dji-rc.jpg' },
  { id: 3, name: 'Gaming Keyboard', price: 129.99, image: 'https://d3gqasl9vmjfd8.cloudfront.net/8afaf4d3-1400-4e05-8766-d588033f780e.jpg' },
  { id: 4, name: 'Cascos Sony', price: 185.99, image: 'https://www.electrodepot.es/media/catalog/product/P982598.jpg' },
];


export default function Index() {
  const [contador, setContador] = useState(0);

  const contadorAddToCart = () => {
    setContador(currentContador => currentContador + 1);
  };

  return (
    <ScrollView style={styles.pageContainer}>
        
      {/* Encabezado con título y Carrito */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nuestros Productos</Text>
        <View style={styles.cartContainer}>
            {/* Icono del carrito */}
            <FontAwesome name="shopping-cart" size={24} color="black" />
            {/* ontador: Se muestra solo si contador es > 0 */}
            {contador > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{contador}</Text>
                </View>
            )}
        </View>
      </View>
      
      {/* Grid de Productos */}
      <View style={styles.productGrid}>
        {products.map((product) => (
          <TarjetaProducto
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            onAddToCart={contadorAddToCart}
          />
        ))}
      </View>
      
    </ScrollView>
  );
}

// Estilos para la página y el grid
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  cartContainer: {
    position: 'relative',
    padding: 5,
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
});