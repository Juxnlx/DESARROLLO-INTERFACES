import { Stack } from "expo-router";

/**
 * Configuramos el Stack Navigator raíz con las siguientes características:
 * - headerShown: false - Oculta el header por defecto en todas las pantallas
 * - La pantalla "(drawer)" contiene toda la navegación drawer de la app
 */
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
}