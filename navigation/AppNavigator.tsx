import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainAppTabs from '../screens/MainAppTabs';

// La pantalla "Auth" se ha eliminado de aquí.
export type RootStackParamList = {
  MainTabs: undefined;
  // Aquí añadirías otras pantallas, como la de "Detalles de Conversación", etc.
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    // El NavigationContainer se ha movido a App.tsx
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainAppTabs} />
    </Stack.Navigator>
  );
};

export default AppNavigator;