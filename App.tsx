import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, ActivityIndicator } from 'react-native';

import { theme } from './src/theme';
import Navigation from './src/navigation';
import { setupNotifications } from './src/utils/notificationService';
import { initializeDatabase } from './src/utils/databaseService';

// Manter a tela de splash visível enquanto inicializamos o app
SplashScreen.preventAutoHideAsync().catch(() => {
  console.warn("Erro ao prevenir o fechamento automático do SplashScreen");
});

// Configuração de notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [splashHidden, setSplashHidden] = useState(false);

  // Função para esconder o SplashScreen de forma segura
  const hideSplashScreen = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      setSplashHidden(true);
    } catch (e) {
      console.warn("Erro ao esconder SplashScreen:", e);
      // Forçar o estado mesmo se houver erro
      setSplashHidden(true);
    }
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        // Definir um timeout para prevenir loops infinitos
        const timeoutId = setTimeout(() => {
          console.warn("Timeout de inicialização atingido");
          setAppIsReady(true);
        }, 5000); // 5 segundos é um tempo razoável para inicialização
        
        try {
          // Inicializar o banco de dados com os versículos
          await initializeDatabase();
        } catch (dbError) {
          console.warn("Erro ao inicializar banco de dados:", dbError);
          // Não falhar completamente se o banco de dados tiver erro
        }
        
        try {
          // Configurar notificações diárias
          await setupNotifications();
        } catch (notificationError) {
          console.warn("Erro ao configurar notificações:", notificationError);
          // Não falhar completamente se as notificações tiverem erro
        }
        
        // Limpar o timeout se tudo ocorrer bem antes do limite
        clearTimeout(timeoutId);
      } catch (error) {
        console.warn("Erro na inicialização:", error);
        setInitError("Erro ao inicializar o aplicativo. Por favor, reinicie o app.");
      } finally {
        // Indicar que o app está pronto para renderizar
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    // Efeito separado para esconder o SplashScreen quando o app estiver pronto
    if (appIsReady) {
      // Pequeno delay para evitar glitches visuais
      const timer = setTimeout(() => {
        hideSplashScreen();
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [appIsReady, hideSplashScreen]);

  // Renderizar um fallback enquanto o SplashScreen está sendo escondido
  if (!splashHidden) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // Se houver erro de inicialização, exibir mensagem
  if (initError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: theme.colors.background }}>
        <Text style={{ textAlign: 'center', marginBottom: 20, color: theme.colors.error }}>{initError}</Text>
      </View>
    );
  }

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