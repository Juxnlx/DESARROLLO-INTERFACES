import { Stack } from 'expo-router';

/**
 * Configuración del layout principal de la aplicación
 * Define la estructura de navegación con Expo Router
 */
export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="views/JuegoDepartamentosV" />
        </Stack>
    );
}