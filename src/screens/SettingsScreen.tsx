import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, Divider, Switch } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { checkNotificationPermissions, sendImmediateNotification } from '../utils/notificationService';
import { colors } from '../theme';

const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const enabled = await checkNotificationPermissions();
      setNotificationsEnabled(enabled);
    };

    checkPermissions();
  }, []);

  const handleRequestPermissions = async () => {
    try {
      const granted = await checkNotificationPermissions();
      setNotificationsEnabled(granted);

      if (granted) {
        Alert.alert(
          'Permissões concedidas',
          'Você receberá notificações diárias às 6h com versículos bíblicos.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Permissões negadas',
          'Para receber versículos diários, é necessário permitir notificações nas configurações do seu dispositivo.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Erro ao solicitar permissões:', error);
    }
  };

  const handleTestNotification = async () => {
    try {
      await sendImmediateNotification();
      Alert.alert('Notificação enviada', 'Uma notificação de teste foi enviada.');
    } catch (error) {
      console.error('Erro ao enviar notificação de teste:', error);
      Alert.alert('Erro', 'Não foi possível enviar a notificação de teste.');
    }
  };

  const getAppVersion = () => {
    return Constants.expoConfig?.version || '1.0.0';
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Configurações</Text>

        <Card style={styles.card}>
          <Card.Title title="Notificações" />
          <Card.Content>
            <Text style={styles.description}>
              O aplicativo enviará uma notificação diária às 6h da manhã com um versículo bíblico.
            </Text>
            
            <View style={styles.switchContainer}>
              <Text>Notificações habilitadas</Text>
              <Switch
                value={notificationsEnabled}
                disabled={true}
                color={colors.primary}
              />
            </View>
            
            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={handleRequestPermissions}
                style={styles.button}
              >
                {notificationsEnabled ? 'Permissões Concedidas' : 'Solicitar Permissões'}
              </Button>
              
              <Button
                mode="outlined"
                onPress={handleTestNotification}
                style={styles.button}
                disabled={!notificationsEnabled}
              >
                Testar Notificação
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Sobre o Aplicativo" />
          <Card.Content>
            <Text style={styles.aboutText}>
              Bom Dia Deus é um aplicativo que fornece versículos bíblicos diários para reflexão e aproximação com Deus.
            </Text>
            <Divider style={styles.divider} />
            <Text style={styles.versionText}>Versão {getAppVersion()}</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    marginBottom: 24,
    borderRadius: 8,
    elevation: 2,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    marginBottom: 12,
    borderColor: colors.primary,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  versionText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default SettingsScreen; 