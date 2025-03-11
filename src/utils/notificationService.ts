import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { DateUtils } from '../models/Verse';
import { getVerseByDayOfYear } from './databaseService';

/**
 * Configura as notificações diárias para o aplicativo
 */
export const setupNotifications = async (): Promise<void> => {
  // Verificar se o dispositivo pode receber notificações
  const canSendNotifications = await checkNotificationPermissions();
  
  if (!canSendNotifications) {
    console.log('Permissões de notificação não concedidas');
    return;
  }
  
  try {
    // Cancelar todas as notificações agendadas anteriormente
    await Notifications.cancelAllScheduledNotificationsAsync();
    
    // Configurar a notificação diária para às 6h da manhã
    await scheduleNotification();
    
    console.log('Notificações configuradas com sucesso!');
  } catch (error) {
    console.error('Erro ao configurar notificações:', error);
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
export const checkNotificationPermissions = async (): Promise<boolean> => {
  // Verificar se o dispositivo é um emulador
  if (!Device.isDevice) {
    console.log('Notificações não funcionam em emuladores');
    return false;
  }
  
  // Verificar permissão atual
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  // Se não tiver permissão, solicitar ao usuário
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  // Verificar se o dispositivo é Android para configurações específicas
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Versículos Diários',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#3F51B5',
    });
  }
  
  return finalStatus === 'granted';
};

/**
 * Envia uma notificação imediatamente (útil para testes)
 */
export const sendImmediateNotification = async (): Promise<void> => {
  const canSendNotifications = await checkNotificationPermissions();
  
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