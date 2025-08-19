import React, { createContext, useState, useContext, ReactNode } from "react";
import * as SecureStore from 'expo-secure-store';

const PIN_KEY = 'user_pin';

interface AuthContextType {
    isLocked: boolean;
    lockApp: () => void;
    unlockWithPin: (pin: string) => Promise<boolean>;
    unlockWithBiometrics: () => void;
    isPinSet: () => Promise<boolean>;
    savePin: (pin: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLocked, setIsLocked] = useState(true);

  const lockApp = () => setIsLocked(true);

  const isPinSet = async (): Promise<boolean> => {
    return (await SecureStore.getItemAsync(PIN_KEY)) !== null;
  };

  const savePin = async (pin: string): Promise<void> => {
    await SecureStore.setItemAsync(PIN_KEY, pin);
  };

  const unlockWithPin = async (pin: string): Promise<boolean> => {
    const storedPin = await SecureStore.getItemAsync(PIN_KEY);
    if (storedPin === pin) {
      setIsLocked(false);
      return true;
    }
    return false;
  };

  const unlockWithBiometrics = () => {
    // Si la biometría tiene éxito, simplemente desbloqueamos la app.
    setIsLocked(false);
  };

  return (
    <AuthContext.Provider value={{ isLocked, lockApp, unlockWithPin, unlockWithBiometrics, isPinSet, savePin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
