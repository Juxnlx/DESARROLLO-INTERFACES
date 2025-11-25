import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

// 
export default function TabLayout() {
  return (
    <Tabs>
      {/* Pestaña: Index.tsx */}
      <Tabs.Screen
        name="index"
        options={{
          // Título en el encabezado
          headerTitle: 'Home',
          // Icono de la pestaña
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={28} />
          ),
          // Nombre a mostrar debajo del icono de la pestaña
          tabBarLabel: 'Inicio',
          // Oculta el título del encabezado en la pestaña, si lo deseas
          // headerShown: false, 
        }}
      />

      {/* Pestaña: search.tsx */}
      <Tabs.Screen
        name="search"
        options={{
          // Título en el encabezado
          headerTitle: 'Búsqueda',
          // Icono de la pestaña
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" color={color} size={28} />
          ),
          tabBarLabel: 'Buscar',
        }}
      />

      {/* Pestaña: profile.tsx */}
      <Tabs.Screen
        name="profile"
        options={{
          // Título en el encabezado
          headerTitle: 'Perfil',
          // Icono de la pestaña
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={28} />
          ),
          tabBarLabel: 'Mi Perfil',
        }}
      />
    </Tabs>
  );
}