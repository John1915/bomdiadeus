import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Share, ScrollView, ActivityIndicator, ToastAndroid, Platform, Alert } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { getVerseByDayOfYear } from '../utils/databaseService';
import { DateUtils } from '../models/Verse';
import { colors } from '../theme';

const DefaultVerse = {
  text: "O Senhor é o meu pastor, nada me faltará.",
  reference: "Salmos 23:1",
  date: DateUtils.formatDayOfYear(1)
};

// Função para mostrar notificações de erro
const showErrorMessage = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    Alert.alert('Atenção', message);
  }
};

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [verse, setVerse] = useState<{ text: string; reference: string; date: string } | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;
    
    const loadVerse = async () => {
      try {
        if (isMounted) setLoading(true);
        setLoadError(false);
        
        // Configurar um timeout para evitar carregamento infinito
        timeoutId = setTimeout(() => {
          if (isMounted) {
            console.warn('Timeout ao carregar versículo, usando versículo padrão');
            setVerse(DefaultVerse);
            setLoading(false);
          }
        }, 5000);
        
        // Obter o dia atual do ano
        const dayOfYear = DateUtils.getCurrentDayOfYear();
        
        // Buscar o versículo correspondente
        const todayVerse = await getVerseByDayOfYear(dayOfYear);
        
        // Limpar o timeout se o carregamento foi bem sucedido
        clearTimeout(timeoutId);
        
        if (todayVerse && isMounted) {
          setVerse({
            text: todayVerse.text,
            reference: todayVerse.reference,
            date: DateUtils.formatDayOfYear(todayVerse.id),
          });
        } else if (isMounted) {
          // Se não encontrou o versículo, usar o padrão
          console.warn('Versículo não encontrado, usando versículo padrão');
          setVerse(DefaultVerse);
          setLoadError(true);
        }
      } catch (error) {
        console.error('Erro ao carregar versículo do dia:', error);
        if (isMounted) {
          setVerse(DefaultVerse);
          setLoadError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadVerse();
    
    // Limpar quando o componente for desmontado
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Função para recarregar em caso de erro
  const handleReload = () => {
    loadVerse();
  };

  // Função para compartilhar o versículo
  const handleShare = async () => {
    if (!verse) return;
    
    try {
      await Share.share({
        message: `"${verse.text}" - ${verse.reference}\n\nCompartilhado via Bom Dia Deus`,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      showErrorMessage('Não foi possível compartilhar o versículo');
    }
  };

  // Função para carregar o versículo
  const loadVerse = async () => {
    try {
      setLoading(true);
      setLoadError(false);
      
      // Obter o dia atual do ano
      const dayOfYear = DateUtils.getCurrentDayOfYear();
      
      // Buscar o versículo correspondente
      const todayVerse = await getVerseByDayOfYear(dayOfYear);
      
      if (todayVerse) {
        setVerse({
          text: todayVerse.text,
          reference: todayVerse.reference,
          date: DateUtils.formatDayOfYear(todayVerse.id),
        });
      } else {
        setVerse(DefaultVerse);
        setLoadError(true);
        showErrorMessage('Não foi possível carregar o versículo do dia');
      }
    } catch (error) {
      console.error('Erro ao carregar versículo do dia:', error);
      setVerse(DefaultVerse);
      setLoadError(true);
      showErrorMessage('Erro ao carregar o versículo do dia');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando versículo...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Versículo do Dia</Text>
        <Text style={styles.date}>{verse?.date || '--'}</Text>
        
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.verseText}>{verse?.text || 'Carregando...'}</Text>
            <Text style={styles.reference}>{verse?.reference || ''}</Text>
          </Card.Content>
        </Card>
        
        <View style={styles.buttonContainer}>
          <Button 
            mode="outlined" 
            icon={({ size, color }) => (
              <Ionicons name="share-outline" size={size} color={color} />
            )}
            style={styles.button}
            onPress={handleShare}
          >
            Compartilhar
          </Button>
          
          {loadError && (
            <Button 
              mode="outlined" 
              icon={({ size, color }) => (
                <Ionicons name="refresh-outline" size={size} color={color} />
              )}
              style={[styles.button, styles.reloadButton]}
              onPress={handleReload}
            >
              Recarregar
            </Button>
          )}
        </View>
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
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 24,
    textAlign: 'center',
  },
  date: {
    fontSize: 18,
    color: colors.secondary,
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    width: '100%',
    elevation: 4,
    borderRadius: 8,
    marginVertical: 16,
  },
  cardContent: {
    padding: 16,
  },
  verseText: {
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: 'serif',
    marginBottom: 16,
  },
  reference: {
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 24,
  },
  button: {
    margin: 8,
    minWidth: 160,
    borderColor: colors.primary,
  },
  reloadButton: {
    borderColor: colors.error,
  },
});

export default HomeScreen; 