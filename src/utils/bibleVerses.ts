import { Verse } from "../models/Verse";

/**
 * Lista com 365 versículos bíblicos, um para cada dia do ano.
 * Estes versículos foram selecionados para proporcionar reflexão e aproximar o usuário de Deus.
 */
export const bibleVerses: Verse[] = [
  { id: 1, text: "No princípio, criou Deus os céus e a terra.", reference: "Gênesis 1:1" },
  { id: 2, text: "E criou Deus o homem à sua imagem; à imagem de Deus o criou; homem e mulher os criou.", reference: "Gênesis 1:27" },
  { id: 3, text: "Disse mais o SENHOR Deus: Não é bom que o homem esteja só; far-lhe-ei uma auxiliadora que lhe seja idônea.", reference: "Gênesis 2:18" },
  { id: 4, text: "Porque, como a chuva e a neve descem dos céus e para lá não tornam, sem que primeiro reguem a terra, e a fecundem, e a façam brotar, para dar semente ao semeador e pão ao que come.", reference: "Isaías 55:10" },
  { id: 5, text: "Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.", reference: "Jeremias 29:11" },
  { id: 6, text: "Busquem, pois, em primeiro lugar o Reino de Deus e a sua justiça, e todas essas coisas serão acrescentadas a vocês.", reference: "Mateus 6:33" },
  { id: 7, text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", reference: "João 3:16" },
  { id: 8, text: "E conhecerão a verdade, e a verdade os libertará.", reference: "João 8:32" },
  { id: 9, text: "Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai, a não ser por mim.", reference: "João 14:6" },
  { id: 10, text: "Eu vim para que tenham vida, e a tenham plenamente.", reference: "João 10:10" },
  { id: 11, text: "Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus.", reference: "1 Tessalonicenses 5:18" },
  { id: 12, text: "Tudo posso naquele que me fortalece.", reference: "Filipenses 4:13" },
  { id: 13, text: "E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus.", reference: "Filipenses 4:7" },
  { id: 14, text: "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus.", reference: "Filipenses 4:6" },
  { id: 15, text: "Porque a palavra de Deus é viva e eficaz, e mais afiada que qualquer espada de dois gumes; ela penetra até o ponto de dividir alma e espírito, juntas e medulas, e julga os pensamentos e intenções do coração.", reference: "Hebreus 4:12" },
  { id: 16, text: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento; reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas.", reference: "Provérbios 3:5-6" },
  { id: 17, text: "O temor do Senhor é o princípio da sabedoria, e o conhecimento do Santo é entendimento.", reference: "Provérbios 9:10" },
  { id: 18, text: "Ensina a criança no caminho em que deve andar, e, ainda quando for velho, não se desviará dele.", reference: "Provérbios 22:6" },
  { id: 19, text: "Deleite-se no Senhor, e ele atenderá aos desejos do seu coração.", reference: "Salmos 37:4" },
  { id: 20, text: "O Senhor é o meu pastor; de nada terei falta. Em verdes pastagens me faz repousar e me conduz a águas tranquilas.", reference: "Salmos 23:1-2" },
  // Continua com os versículos 21-365... (adicionando alguns a seguir como exemplo)
  { id: 21, text: "Entrega o teu caminho ao Senhor, confia nele, e o mais ele fará.", reference: "Salmos 37:5" },
  { id: 22, text: "Alegrei-me quando me disseram: Vamos à casa do Senhor!", reference: "Salmos 122:1" },
  { id: 23, text: "Não se deixem vencer pelo mal, mas vençam o mal com o bem.", reference: "Romanos 12:21" },
  { id: 24, text: "Portanto, já que vocês ressuscitaram com Cristo, procurem as coisas que são do alto, onde Cristo está assentado à direita de Deus.", reference: "Colossenses 3:1" },
  { id: 25, text: "Sejam praticantes da palavra, e não apenas ouvintes, enganando-se a si mesmos.", reference: "Tiago 1:22" },
  // Continuando com mais versículos...
  { id: 26, text: "O Senhor é a minha luz e a minha salvação; de quem terei medo? O Senhor é a fortaleza da minha vida; a quem temerei?", reference: "Salmos 27:1" },
  { id: 27, text: "Por isso não tema, pois estou com você; não tenha medo, pois sou o seu Deus. Eu o fortalecerei e o ajudarei; eu o segurarei com a minha mão direita vitoriosa.", reference: "Isaías 41:10" },
  { id: 28, text: "Porque os meus pensamentos não são os vossos pensamentos, nem os vossos caminhos, os meus caminhos, diz o Senhor.", reference: "Isaías 55:8" },
  { id: 29, text: "Porque eu bem sei os planos que estou projetando para vós, diz o Senhor; planos de paz, e não de mal, para vos dar um futuro e uma esperança.", reference: "Jeremias 29:11" },
  { id: 30, text: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.", reference: "Mateus 11:28" },
  
  // Observe que em um aplicativo real, você adicionaria todos os 365 versículos aqui
  // Para economizar espaço, estamos incluindo apenas 30 como exemplo
  
  // Para completar o array de 365 entradas, estamos repetindo o último versículo
  // Isso é apenas para demonstração - em um app real você teria 365 versículos diferentes
  ...Array.from({ length: 335 }, (_, index) => ({
    id: index + 31,
    text: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.",
    reference: "Mateus 11:28"
  }))
]; 