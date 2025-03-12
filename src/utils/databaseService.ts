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
    const dbVersion = await AsyncStorage.getItem(DATABASE_VERSION_KEY).catch(() => null);
    
    // Se não existe ou é uma versão diferente, inicializar o banco
    if (dbVersion !== CURRENT_DB_VERSION) {
      console.log('Inicializando banco de dados...');
      
      // Armazenar todos os versículos
      await AsyncStorage.setItem(VERSES_STORAGE_KEY, JSON.stringify(bibleVerses))
        .catch(error => {
          console.error('Erro ao armazenar versículos:', error);
          // Continuar mesmo com erro - usaremos os versículos direto da memória em caso de falha
        });
      
      // Atualizar a versão do banco
      await AsyncStorage.setItem(DATABASE_VERSION_KEY, CURRENT_DB_VERSION)
        .catch(error => console.error('Erro ao atualizar versão do banco:', error));
      
      console.log('Banco de dados inicializado com sucesso!');
    } else {
      console.log('Banco de dados já inicializado.');
    }
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    // Não lançar o erro para não interromper a inicialização do app
  }
};

/**
 * Obtém todos os versículos do banco de dados ou do fallback em memória
 */
export const getAllVerses = async (): Promise<Verse[]> => {
  try {
    const versesJson = await AsyncStorage.getItem(VERSES_STORAGE_KEY).catch(() => null);
    if (versesJson) {
      try {
        return JSON.parse(versesJson);
      } catch (parseError) {
        console.error('Erro ao analisar JSON dos versículos:', parseError);
        return bibleVerses; // Fallback para versículos em memória
      }
    }
    return bibleVerses; // Usar versículos em memória se não estiver no AsyncStorage
  } catch (error) {
    console.error('Erro ao obter versículos:', error);
    return bibleVerses; // Fallback para versículos em memória em caso de erro
  }
};

/**
 * Obtém um versículo específico pelo dia do ano (1-365)
 */
export const getVerseByDayOfYear = async (dayOfYear: number): Promise<Verse | null> => {
  try {
    const verses = await getAllVerses();
    // Encontrar o versículo correspondente ao dia (id = dayOfYear)
    return verses.find(verse => verse.id === dayOfYear) || 
      // Fallback para o primeiro versículo se não encontrar o específico
      (verses.length > 0 ? verses[0] : null);
  } catch (error) {
    console.error('Erro ao obter versículo do dia:', error);
    // Tentar obter diretamente do array em memória
    const fallbackVerse = bibleVerses.find(verse => verse.id === dayOfYear) || 
      (bibleVerses.length > 0 ? bibleVerses[0] : null);
    return fallbackVerse;
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
      try {
        const date = new Date(new Date().getFullYear(), 0, verse.id);
        return date.getMonth() + 1 === month;
      } catch (dateError) {
        console.warn('Erro ao processar data para versículo:', dateError);
        return false;
      }
    });
  } catch (error) {
    console.error('Erro ao obter versículos do mês:', error);
    
    // Fallback: filtrar os versículos em memória
    return bibleVerses.filter(verse => {
      try {
        const date = new Date(new Date().getFullYear(), 0, verse.id);
        return date.getMonth() + 1 === month;
      } catch {
        return false;
      }
    });
  }
}; 