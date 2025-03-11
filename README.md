# Bom Dia Deus

Um aplicativo React Native (Expo) que envia notificações diárias às 6h da manhã com versículos bíblicos para reflexão e aproximação com Deus.

## Funcionalidades

- 📱 **Notificações Diárias**: Receba um versículo bíblico todos os dias às 6h da manhã
- 📜 **365 Versículos**: Um versículo diferente para cada dia do ano
- 🔍 **Pesquisa por Data**: Encontre versículos por mês e dia
- 📆 **Calendário Completo**: Navegue por todos os 365 versículos do ano
- 🔄 **Compartilhamento**: Compartilhe versículos com amigos e familiares
- 📴 **Modo Offline**: Funciona 100% sem internet

## Tecnologias Utilizadas

- React Native
- Expo
- AsyncStorage (armazenamento local)
- React Navigation
- React Native Paper (UI)
- Expo Notifications

## Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para desenvolvimento Android) ou Xcode (para desenvolvimento iOS)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/bomdiadeus.git
cd bomdiadeus
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o aplicativo:
```bash
npx expo start
```

4. Use o aplicativo Expo Go no seu dispositivo para escanear o QR code ou execute em um emulador.

## Estrutura do Projeto

```
bomdiadeus/
├── assets/                  # Imagens, fontes e outros recursos
├── src/
│   ├── models/              # Definições de tipos e interfaces
│   ├── navigation/          # Configuração de navegação
│   ├── screens/             # Telas do aplicativo
│   ├── utils/               # Funções utilitárias
│   │   ├── bibleVerses.ts   # Base de dados com 365 versículos
│   │   ├── databaseService.ts # Serviço de armazenamento local
│   │   └── notificationService.ts # Serviço de notificações
│   └── theme.ts             # Definições de tema e cores
├── App.tsx                  # Componente raiz do aplicativo
├── app.json                 # Configuração do Expo
└── package.json             # Dependências do projeto
```

## Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adicionando nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato

Seu Nome - seu-email@exemplo.com

Link do Projeto: [https://github.com/seu-usuario/bomdiadeus](https://github.com/seu-usuario/bomdiadeus) 