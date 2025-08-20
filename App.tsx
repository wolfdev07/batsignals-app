import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import LockScreen from './screens/LockScreen';
import AppLockManager from './components/AppLockManager';
import SetupPinScreen from './components/SetupPinScreen';
import { ActivityIndicator, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator'; // Importamos el navegador simplificado
import { useEffect, useState } from 'react';

const AppContent: React.FC = () => {
  const { isLocked, isPinSet } = useAuth();
  const [isCheckingPin, setIsCheckingPin] = useState(true);
  const [hasPin, setHasPin] = useState(false);

  useEffect(() => {
    const checkPinStatus = async () => {
      const pinExists = await isPinSet();
      setHasPin(pinExists);
      setIsCheckingPin(false);
    };
    checkPinStatus();
  }, [isLocked]);

  // Animación de carga
  if (isCheckingPin) return <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#0B132B' }}><ActivityIndicator size="large" color="#7B68EE" /></View>;

  // Si el usuario no tiene un PIN creado, envía a la creación de una
  if (!hasPin) return <SetupPinScreen />;

  // Si la app está desbloqueada, mostramos el navegador principal.
  if (!isLocked) return (<AppLockManager><AppNavigator /></AppLockManager>);

  // Si no, mostramos la pantalla de bloqueo.
  return <LockScreen />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
