import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { DateUtils } from '../models/Verse';
import { getVerseByDayOfYear } from './databaseService';

/**
 * Configura as notificações diárias para o aplicativo
 */
export const setupNotifications = async (): Promise<boolean> => {
  try {
    // Configurar como as notificações devem aparecer
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Solicitar permissões se necessário
    return await requestPermissions();
  } catch (error) {
    console.warn('Erro ao configurar notificações:', error);
    return false;  // Retornar falso em caso de erro, mas não interromper o fluxo
  }
};

/**
 * Agenda uma notificação diária para às 6h da manhã
 */
const scheduleNotification = async (): Promise<void> => {
  // Obter o versículo do dia atual
  const todayVerseId = DateUtils.getCurrentDayOfYear();
  const verse = await getVerseByDayOfYear(todayVerseId);
  
  if (!verse) {
    console.error('Não foi possível obter o versículo do dia.');
    return;
  }
  
  // Configurar o trigger para às 6h da manhã todos os dias
  const trigger = {
    hour: 6,
    minute: 0,
    repeats: true,
  };
  
  // Agendar a notificação
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Bom Dia Deus',
      body: verse.text,
      subtitle: verse.reference,
      sound: true,
      vibrate: [0, 250, 250, 250],
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger,
  });
  
  console.log('Notificação diária agendada para às 6h.');
};

/**
 * Verifica e solicita permissões para enviar notificações
 */
export const requestPermissions = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      // No Android moderno, precisamos solicitar explicitamente as permissões
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Bom Dia Deus',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      }).catch(err => console.warn('Erro ao configurar canal de notificação:', err));
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
      .catch(err => {
        console.warn('Erro ao verificar permissões existentes:', err);
        return { status: 'error' };
      });
    
    let finalStatus = existingStatus;
    
    // Se não temos permissão, solicitar ao usuário
    if (existingStatus !== 'granted') {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      } catch (err) {
        console.warn('Erro ao solicitar permissões:', err);
        return false;
      }
    }
    
    return finalStatus === 'granted';
  } catch (error) {
    console.warn('Erro ao gerenciar permissões:', error);
    return false;  // Retornar falso em caso de erro, mas não interromper o fluxo
  }
};

/**
 * Envia uma notificação imediatamente (útil para testes)
 */
export const sendImmediateNotification = async (): Promise<void> => {
  const canSendNotifications = await requestPermissions();
  
  if (!canSendNotifications) {
    console.log('Permissões de notificação não concedidas');
    return;
  }
  
  // Obter o versículo do dia atual
  const todayVerseId = DateUtils.getCurrentDayOfYear();
  const verse = await getVerseByDayOfYear(todayVerseId);
  
  if (!verse) {
    console.error('Não foi possível obter o versículo do dia.');
    return;
  }
  
  // Enviar a notificação imediatamente
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Bom Dia Deus',
      body: verse.text,
      subtitle: verse.reference,
      sound: true,
      vibrate: [0, 250, 250, 250],
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: null, // null trigger = enviar imediatamente
  });
  
  console.log('Notificação enviada imediatamente.');
};

// Agendar notificação diária
export const scheduleDailyNotification = async (enabled: boolean = true, hour: number = 6, minute: number = 0): Promise<boolean> => {
  try {
    // Cancelar notificações existentes antes de agendar novas
    await Notifications.cancelAllScheduledNotificationsAsync()
      .catch(err => console.warn('Erro ao cancelar notificações:', err));

    // Se as notificações não estiverem habilitadas, apenas retornar
    if (!enabled) {
      console.log('Notificações diárias desativadas pelo usuário');
      return true;
    }

    // Verificar permissões antes de agendar
    const hasPermission = await requestPermissions()
      .catch(() => false);
    
    if (!hasPermission) {
      console.warn('Sem permissão para agendar notificações');
      return false;
    }

    // Obter a data atual para calcular o dia do ano
    const now = new Date();
    const dayOfYear = DateUtils.getDayOfYear(now);
    
    // Definir o horário da notificação
    const trigger = {
      hour,
      minute,
      repeats: true,
    };

    // Agendar a notificação diária
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Bom Dia Deus',
        body: 'Seu versículo de hoje já está disponível! Toque para ler.',
        data: { dayOfYear },
      },
      trigger,
    }).catch(err => {
      console.warn('Erro ao agendar notificação:', err);
      throw err;
    });

    console.log(`Notificação diária agendada para ${hour}:${minute}`);
    return true;
  } catch (error) {
    console.warn('Erro ao agendar notificação diária:', error);
    return false;  // Retornar falso em caso de erro, mas não interromper o fluxo
  }
};

// Verificar se as notificações estão habilitadas
export const checkNotificationsEnabled = async (): Promise<boolean> => {
  try {
    const { status } = await Notifications.getPermissionsAsync()
      .catch(() => ({ status: 'error' }));
    return status === 'granted';
  } catch (error) {
    console.warn('Erro ao verificar status das notificações:', error);
    return false;  // Assumir que as notificações não estão habilitadas em caso de erro
  }
}; 