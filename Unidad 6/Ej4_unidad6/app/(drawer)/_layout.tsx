import { Ionicons } from '@expo/vector-icons';
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
    return (
        <Drawer screenOptions={{ headerShown: true }}>
            <Drawer.Screen 
                name="index" 
                options={{ 
                    title:"Índice",
                    drawerIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="home" size={size} color={color} />
                    )
                }}
            />

            <Drawer.Screen 
                name="profile" 
                options={{ 
                    title: "Perfil",
                    drawerIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="person" size={size} color={color} />
                    )
                }}
            />

            <Drawer.Screen 
                name="settings" 
                options={{ 
                    title: "Ajustes",
                    drawerIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    )
                }}
            />
        </Drawer>
    );
}
