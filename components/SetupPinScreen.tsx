import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';

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
  font-size: 24px;
  color: white;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`;
const Subtitle = styled.Text`
  font-size: 16px;
  color: #A9A9A9;
  text-align: center;
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
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: 10px;
`;
const AuthButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #7B68EE;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
`;
const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 18px;
  font-weight: bold;
`;

const SetupPinScreen: React.FC = () => {
  const { savePin, unlockWithPin } = useAuth();
  const [step, setStep] = useState<'set' | 'confirm'>('set');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleNext = async () => {
    if (step === 'set') {
      if (pin.length !== 4) {
        Alert.alert('Error', 'El PIN debe tener 4 dígitos.');
        return;
      }
      setStep('confirm');
    } else {
      if (pin !== confirmPin) {
        Alert.alert('Error', 'Los PIN no coinciden. Inténtalo de nuevo.');
        // Reiniciamos el flujo
        setPin('');
        setConfirmPin('');
        setStep('set');
        return;
      }
      await savePin(pin);
      Alert.alert('¡Éxito!', 'Tu PIN ha sido configurado.');
      await unlockWithPin(pin); // Desbloquea la app para el usuario
    }
  };

  return (
    <GradientContainer>
      <Subtitle>Bienvenido(a), aseguremos tu cuenta.</Subtitle>
      <Title>{step === 'set' ? 'Crea tu PIN de 4 dígitos' : 'Confirma tu PIN'}</Title>
      <PinInput
        placeholder="----"
        maxLength={4}
        secureTextEntry
        keyboardType="numeric"
        value={step === 'set' ? pin : confirmPin}
        onChangeText={step === 'set' ? setPin : setConfirmPin}
      />
      <AuthButton onPress={handleNext}>
        <ButtonText>{step === 'set' ? 'Siguiente' : 'Confirmar y Guardar'}</ButtonText>
      </AuthButton>
    </GradientContainer>
  );
};

export default SetupPinScreen;