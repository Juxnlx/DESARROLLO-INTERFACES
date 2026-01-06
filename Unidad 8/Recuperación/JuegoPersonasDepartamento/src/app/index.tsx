import { Redirect } from 'expo-router';

/**
 * Punto de entrada de la aplicación
 * Redirige automáticamente a la vista principal del juego
 */
export default function Index() {
    return <Redirect href="/views/JuegoDepartamentosV" />;
}