import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerStyle: { backgroundColor: "#fff", width: 280 },
        drawerActiveTintColor: "#007AFF",
        drawerInactiveTintColor: "#666",
        headerStyle: { backgroundColor: "#007AFF" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Inicio",
          title: "Inicio",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="personas/ListadoPersonas"
        options={{
          drawerLabel: "Personas",
          title: "Listado de Personas",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="personas/EditarInsertarPersonas"
        options={{
          drawerLabel: "Gestionar Persona",
          title: "Gestion de Persona",
          drawerItemStyle: { display: "none" },
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person-add" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="departamentos/ListadoDepartamentos"
        options={{
          drawerLabel: "Departamentos",
          title: "Listado de Departamentos",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="business" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="departamentos/EditarInsertarDepartamento"
        options={{
          drawerLabel: "Gestionar Departamento",
          title: "Gestion de Departamento",
          drawerItemStyle: { display: "none" },
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}