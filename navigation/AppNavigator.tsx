import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import MainAppTabs from "../screens/MainAppTabs";

export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName="Auth"
            screenOptions={{
                headerShown: false,
            }}
            >
                <Stack.Screen name="Auth" component={AuthLoadingScreen} />
                <Stack.Screen name="Main" component={MainAppTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
