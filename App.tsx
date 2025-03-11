import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';

import { theme } from './src/theme';
import Navigation from './src/navigation';
import { setupNotifications } from './src/utils/notificationService';
import { initializeDatabase } from './src/utils/databaseService';

// Manter a tela de splash visível enquanto inicializamos o app
SplashScreen.preventAutoHideAsync();

// Configuração de notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        // Inicializar o banco de dados com os versículos
        await initializeDatabase();
        
        // Configurar notificações diárias
        await setupNotifications();
      } catch (e) {
        console.warn(e);
      } finally {
        // Fechar a tela de splash após a inicialização
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Navigation />
          <StatusBar style="light" />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 