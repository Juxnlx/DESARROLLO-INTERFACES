import { Ionicons } from '@expo/vector-icons';
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{headerShown: true}}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Inicio",
          drawerLabel: "Inicio",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
    />

    <Drawer.Screen
      name="settings"
      options={{
        title: "Confifuración",
        drawerLabel: "Configuaración",
        drawerIcon: ({ color, size}) => (
          <Ionicons name="settings" size={size} color={color} />
        )
      }}
      />
      </Drawer>
  );
}