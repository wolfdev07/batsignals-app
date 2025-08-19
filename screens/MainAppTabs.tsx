import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Importamos los iconos

const GroupsScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B132B' }}>
        <Text style={{ color: 'white' }}>Pantalla de Grupos</Text>
    </View>
);

const SearchScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B132B' }}>
    <Text style={{ color: 'white' }}>Pantalla de Búsqueda</Text>
  </View>
);

const NewConversationScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B132B' }}>
      <Text style={{ color: 'white' }}>Pantalla de Nueva Conversación</Text>
    </View>
);

const Tab = createBottomTabNavigator();

// --- Botón central personalizado ---
const CustomTabBarButton = ({ children, onPress }: any) => (
    <TouchableOpacity
        style={{
            top: -20,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#7B68EE', // Nuevo color de acento
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const MainAppTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Ocultamos el texto de las pestañas
        tabBarStyle: {
          backgroundColor: '#1C2541',
          borderTopColor: '#3A506B',
          height: 60,
        },
      }}
    >
      <Tab.Screen name="Grupos" component={GroupsScreen} options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "folder" : "folder-outline"} size={size} color={color} />
          ),
          tabBarActiveTintColor: '#7B68EE',
          tabBarInactiveTintColor: '#A9A9A9',
      }} />
      <Tab.Screen name="Nueva Conversación" component={NewConversationScreen} options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="message-plus" size={30} color="#FFF" />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          )
      }}/>
      <Tab.Screen name="Buscar" component={SearchScreen} options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="account-search" size={size} color={color} />
          ),
          tabBarActiveTintColor: '#7B68EE',
          tabBarInactiveTintColor: '#A9A9A9',
      }}/>
    </Tab.Navigator>
  );
};

export default MainAppTabs;
