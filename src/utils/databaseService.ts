import AsyncStorage from '@react-native-async-storage/async-storage';
import { Verse } from '../models/Verse';
import { bibleVerses } from './bibleVerses';

const VERSES_STORAGE_KEY = '@BomDiaDeus:verses';
const DATABASE_VERSION_KEY = '@BomDiaDeus:db_version';
const CURRENT_DB_VERSION = '1.0';

/**
 * Inicializa o banco de dados com os versículos pré-definidos
 */
export const initializeDatabase = async (): Promise<void> => {
  try {
    // Verificar se o banco de dados já foi inicializado
    const dbVersion = await AsyncStorage.getItem(DATABASE_VERSION_KEY);
    
    // Se não existe ou é uma versão diferente, inicializar o banco
    if (dbVersion !== CURRENT_DB_VERSION) {
      console.log('Inicializando banco de dados...');
      
      // Armazenar todos os versículos
      await AsyncStorage.setItem(VERSES_STORAGE_KEY, JSON.stringify(bibleVerses));
      
      // Atualizar a versão do banco
      await AsyncStorage.setItem(DATABASE_VERSION_KEY, CURRENT_DB_VERSION);
      
      console.log('Banco de dados inicializado com sucesso!');
    } else {
      console.log('Banco de dados já inicializado.');
    }
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    throw error;
  }
};

/**
 * Obtém todos os versículos do banco de dados
 */
export const getAllVerses = async (): Promise<Verse[]> => {
  try {
    const versesJson = await AsyncStorage.getItem(VERSES_STORAGE_KEY);
    if (versesJson) {
      return JSON.parse(versesJson);
    }
    return [];
  } catch (error) {
    console.error('Erro ao obter versículos:', error);
    return [];
  }
};

/**
 * Obtém um versículo específico pelo dia do ano (1-365)
 */
export const getVerseByDayOfYear = async (dayOfYear: number): Promise<Verse | null> => {
  try {
    const verses = await getAllVerses();
    // Encontrar o versículo correspondente ao dia (id = dayOfYear)
    return verses.find(verse => verse.id === dayOfYear) || null;
  } catch (error) {
    console.error('Erro ao obter versículo do dia:', error);
    return null;
  }
};

/**
 * Obtém todos os versículos filtrados por mês (1-12)
 */
export const getVersesByMonth = async (month: number): Promise<Verse[]> => {
  try {
    const verses = await getAllVerses();
    
    // Filtrar os versículos do mês especificado
    return verses.filter(verse => {
      const date = new Date(new Date().getFullYear(), 0, verse.id);
      return date.getMonth() + 1 === month;
    });
  } catch (error) {
    console.error('Erro ao obter versículos do mês:', error);
    return [];
  }
}; 