# Bom Dia Deus

Aplicativo de versículos bíblicos diários que entrega uma mensagem inspiradora todas as manhãs.

## ⚠️ Aviso de Solução de Problemas

Se você estiver encontrando um **loop de carregamento infinito** ao abrir o aplicativo no Expo Go, siga os passos abaixo para resolver:

1. **Limpe o cache do Expo:**
   ```bash
   npx expo start -c
   ```

2. **Verifique as dependências:**
   Se o problema persistir, certifique-se de que todas as dependências estão instaladas:
   ```bash
   npm install
   ```
   
3. **Reinstale o Expo Go:**
   Em alguns casos, reinstalar o aplicativo Expo Go no dispositivo pode resolver o problema.

4. **Use a solução de desenvolvimento direto:**
   Como última opção, você pode executar diretamente no dispositivo usando:
   ```bash
   npm run android
   # ou
   npm run ios
   ```

## 🌟 Recursos

- Receba um versículo bíblico todos os dias às 6h da manhã
- Biblioteca completa com 365 versículos, um para cada dia do ano
- Interface limpa e intuitiva
- Pesquisa de versículos por data
- Compartilhe versículos com amigos e familiares
- Funciona completamente offline

## 🔧 Tecnologias Utilizadas

- React Native / Expo
- TypeScript
- AsyncStorage para persistência local
- Notificações push para lembretes diários
- React Navigation para navegação entre telas

## 📋 Pré-requisitos

- Node.js (versão 14.0 ou superior)
- NPM ou Yarn
- Expo CLI (`npm install -g expo-cli`)
- Um dispositivo físico com Expo Go instalado ou um emulador configurado

## 🚀 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/bomdiadeus.git
cd bomdiadeus
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn
```

3. **Inicie o aplicativo**

```bash
npm start
# ou
yarn start
```

4. **Escaneie o QR Code com o aplicativo Expo Go** (Android) ou use a câmera (iOS)

## 📱 Uso

- **Tela inicial (Início)**: Mostra o versículo do dia
- **Tela de calendário**: Permite navegar pelos versículos por data
- **Tela de configurações**: Controle de notificações e informações do aplicativo

Para compartilhar um versículo, pressione o botão "Compartilhar" abaixo do versículo.

## 📁 Estrutura do Projeto

```
src/
├── models/        # Interfaces e tipos
├── navigation/    # Configuração de navegação
├── screens/       # Telas do aplicativo
├── theme/         # Estilos e tema
└── utils/         # Utilitários (banco de dados, notificações)
```

## 🔍 Solução de Problemas Comuns

1. **Notificações não funcionam:**
   - Verifique se as permissões de notificação estão concedidas nas configurações do dispositivo
   - Em dispositivos Android, verifique se a otimização de bateria não está impedindo as notificações

2. **Versículos não aparecem:**
   - Verifique se o banco de dados foi inicializado corretamente
   - Tente reinstalar o aplicativo

3. **Problemas com a interface:**
   - Tente limpar o cache do aplicativo Expo Go
   - Verifique se você está usando a versão mais recente do Expo Go

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## 📧 Contato

Seu Nome - [seu-email@exemplo.com](mailto:seu-email@exemplo.com)

Link do Projeto: [https://github.com/seu-usuario/bomdiadeus](https://github.com/seu-usuario/bomdiadeus) 