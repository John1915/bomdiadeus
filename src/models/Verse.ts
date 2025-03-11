/**
 * Modelo para um versículo bíblico
 */
export interface Verse {
  id: number;        // ID único (corresponde ao dia do ano, 1-365)
  text: string;      // Texto do versículo
  reference: string; // Referência bíblica (ex: "João 3:16")
}

/**
 * Funções utilitárias para manipulação de datas
 */
export const DateUtils = {
  /**
   * Obtém o dia do ano atual (1-365)
   */
  getCurrentDayOfYear: (): number => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear;
  },

  /**
   * Converte o dia do ano para uma data formatada
   */
  formatDayOfYear: (dayOfYear: number): string => {
    const year = new Date().getFullYear();
    const date = new Date(year, 0, dayOfYear);
    
    // Formatação em português (ex: "01 de janeiro")
    const day = date.getDate().toString().padStart(2, '0');
    const month = getMonthNameInPortuguese(date.getMonth());
    
    return `${day} de ${month}`;
  },

  /**
   * Obtém o dia do ano com base no mês e dia
   */
  getDayOfYear: (month: number, day: number): number => {
    const year = new Date().getFullYear();
    const date = new Date(year, month - 1, day);
    const start = new Date(year, 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
};

/**
 * Retorna o nome do mês em português
 */
function getMonthNameInPortuguese(monthIndex: number): string {
  const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
  ];
  
  return months[monthIndex];
} 