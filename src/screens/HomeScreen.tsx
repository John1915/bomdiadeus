import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Share, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { getVerseByDayOfYear } from '../utils/databaseService';
import { DateUtils } from '../models/Verse';
import { colors } from '../theme';

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [verse, setVerse] = useState<{ text: string; reference: string; date: string } | null>(null);

  useEffect(() => {
    const loadVerse = async () => {
      try {
        setLoading(true);
        
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
        }
      } catch (error) {
        console.error('Erro ao carregar versículo do dia:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVerse();
  }, []);

  // Função para compartilhar o versículo
  const handleShare = async () => {
    if (!verse) return;
    
    try {
      await Share.share({
        message: `"${verse.text}" - ${verse.reference}\n\nCompartilhado via Bom Dia Deus`,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
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
        
        <Button 
          mode="outlined" 
          icon={({ size, color }) => (
            <Ionicons name="share-outline" size={size} color={color} />
          )}
          style={styles.shareButton}
          onPress={handleShare}
        >
          Compartilhar
        </Button>
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
  shareButton: {
    marginTop: 24,
    width: 200,
    borderColor: colors.primary,
  },
});

export default HomeScreen; 