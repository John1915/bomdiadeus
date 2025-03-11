import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text, Card, TextInput, Button } from 'react-native-paper';
import { getAllVerses } from '../utils/databaseService';
import { Verse, DateUtils } from '../models/Verse';
import { colors } from '../theme';

const CalendarScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [filteredVerses, setFilteredVerses] = useState<Verse[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const loadVerses = async () => {
      try {
        setLoading(true);
        const allVerses = await getAllVerses();
        setVerses(allVerses);
        setFilteredVerses(allVerses);
      } catch (error) {
        console.error('Erro ao carregar versículos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVerses();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredVerses(verses);
      setNoResults(false);
      return;
    }

    // Verificar se está no formato dd/mm
    const regex = /^(\d{1,2})\/(\d{1,2})$/;
    const match = searchQuery.match(regex);

    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);

      // Validar dia e mês
      if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        const dayOfYear = DateUtils.getDayOfYear(month, day);
        const result = verses.filter(verse => verse.id === dayOfYear);
        
        setFilteredVerses(result);
        setNoResults(result.length === 0);
        return;
      }
    }

    // Se não for uma data válida, mostrar todos os versículos
    setFilteredVerses(verses);
    setNoResults(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredVerses(verses);
    setNoResults(false);
  };

  const renderVerseItem = ({ item }: { item: Verse }) => (
    <TouchableOpacity>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.date}>{DateUtils.formatDayOfYear(item.id)}</Text>
          <Text style={styles.verseText} numberOfLines={3} ellipsizeMode="tail">
            {item.text}
          </Text>
          <Text style={styles.reference}>{item.reference}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando versículos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          label="Pesquisar por data (DD/MM)"
          value={searchQuery}
          onChangeText={setSearchQuery}
          mode="outlined"
          style={styles.searchInput}
          right={<TextInput.Icon icon="close" onPress={clearSearch} />}
        />
        <Button 
          mode="contained" 
          onPress={handleSearch}
          style={styles.searchButton}
        >
          Buscar
        </Button>
      </View>

      {noResults ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>Nenhum resultado encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={filteredVerses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderVerseItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: colors.primary,
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
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 8,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 22,
    fontStyle: 'italic',
    fontFamily: 'serif',
    marginBottom: 8,
  },
  reference: {
    fontSize: 12,
    color: colors.secondary,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default CalendarScreen; 