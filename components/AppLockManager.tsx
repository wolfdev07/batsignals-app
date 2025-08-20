import React, { useEffect, useRef, ReactNode } from 'react';
import { AppState, AppStateStatus, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

const INACTIVITY_TIMEOUT = 30000; // 30 segundos

const AppLockManager: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { lockApp } = useAuth();
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    resetInactivityTimer();
    return () => {
      subscription.remove();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      lockApp();
    }
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      lockApp();
    }, INACTIVITY_TIMEOUT);
  };
  
  const tap = Gesture.Tap().onStart(() => {
    resetInactivityTimer();
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={tap}>
        <View style={{ flex: 1 }} onStartShouldSetResponder={() => true}>
          {children}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default AppLockManager;