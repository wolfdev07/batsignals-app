import React, { useState, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons';

const GradientContainer = styled(LinearGradient as any).attrs(() => ({
    colors: ['#0B132B', '#1C2541'],
}))`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;
const Title = styled.Text`
  font-size: 24px;
  color: white;
  margin-bottom: 40px;
`;
const PinInput = styled.TextInput.attrs({
    placeholderTextColor: '#A9A9A9',
})`
  width: 80%;
  background-color: #3A506B;
  color: white;
  padding: 15px;
  border-radius: 10px;
  font-size: 18px;
  margin-bottom: 40px;
  text-align: center;
  letter-spacing: 10px;
`;

const LockScreen: React.FC = () => {
    const { unlockWithPin, unlockWithBiometrics } = useAuth();
    const [pin, setPin] = useState('');

    useEffect(() => {
        // Intenta desbloquear con biometría tan pronto como se monta la pantalla.
        handleBiometricUnlock();
    }, []);

    const handlePinUnlock = async () => {
        if (pin.length !== 4) return;
        const success = await unlockWithPin(pin);
        if (!success) {
            Alert.alert('Error', 'PIN incorrecto.');
            setPin('');
        }
    };

    const handleBiometricUnlock = async () => {
        const isSupported = await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();
        if (isSupported) {
            const { success } = await LocalAuthentication.authenticateAsync({ promptMessage: 'Desbloquea BatSignals' });
            if (success) {
                unlockWithBiometrics();
            }
        }
    };

    return (
        <GradientContainer>
            <Title>Aplicación Bloqueada</Title>
            <PinInput
                placeholder="----"
                maxLength={4}
                keyboardType="numeric"
                secureTextEntry
                value={pin}
                onChangeText={setPin}
                onSubmitEditing={handlePinUnlock}
            />
            <TouchableOpacity onPress={handleBiometricUnlock}>
                <Ionicons name="finger-print" size={64} color="#7B68EE" />
            </TouchableOpacity>
        </GradientContainer>
    );
};

export default LockScreen;