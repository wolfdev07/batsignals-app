import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import styled from 'styled-components/native';
// CORRECCIÓN: Se importa LinearGradientProps para la correcta inferencia de tipos.
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Importamos los tipos

// --- Styled Components ---

const GradientContainer = styled(LinearGradient as any).attrs(() => ({
  colors: ['#0B132B', '#1C2541'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
}))`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: #A9A9A9;
  text-align: center;
  margin-bottom: 60px;
`;

const AuthButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #00D1B2;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #0B132B;
  font-size: 18px;
  font-weight: bold;
`;

// --- Componente ---
let isSecuritySetup = false;

const AuthLoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Usamos el hook de navegación para poder cambiar de pantalla.
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    setIsLoading(true);
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert('Seguridad no disponible', 'Tu dispositivo no soporta o no tiene configurada la autenticación biométrica.');
      setIsLoading(false);
      return;
    }

    if (isSecuritySetup) {
      const { success } = await LocalAuthentication.authenticateAsync({ promptMessage: 'Desbloquea BatSignals' });
      if (success) {
        // Si la autenticación es exitosa, navegamos a la pantalla principal.
        navigation.replace('Main');
      }
    }
    setIsLoading(false);
  };

  const setupSecurity = () => {
    isSecuritySetup = true;
    Alert.alert('¡Éxito!', 'La seguridad ha sido configurada.');
    authenticate();
  };

  if (isLoading) {
    return (
      <GradientContainer>
        <ActivityIndicator size="large" color="#00D1B2" />
      </GradientContainer>
    );
  }

  // El resto del componente permanece igual.
  return (
    <GradientContainer>
      <StatusBar style="light" />
      <Title>Asegura tu Acceso</Title>
      <Subtitle>Para proteger tus conversaciones, es necesario configurar el acceso biométrico.</Subtitle>
      <AuthButton onPress={setupSecurity}>
        <ButtonText>Configurar Huella / Face ID</ButtonText>
      </AuthButton>
    </GradientContainer>
  );
};

export default AuthLoadingScreen;
