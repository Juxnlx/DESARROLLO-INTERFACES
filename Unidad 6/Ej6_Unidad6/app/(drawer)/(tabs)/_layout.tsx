import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: true,
                tabBarStyle: {
                    backgroundColor: "#ffffff",
                    borderTopColor: "#ddd",
                    height: 60
                },
                headerShown: false
            }}>
            
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home" size={size} color={color}/>
                    )
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="person" size={size} color={color}/>
                    )
                }}
            />
            
        </Tabs>
    );
}