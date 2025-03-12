#!/bin/bash

# Definir cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}"
echo "======================================================"
echo "  BOM DIA DEUS - INSTALADOR"
echo "======================================================"
echo -e "${NC}"

# Verificar se o Node.js está instalado
echo "Verificando se o Node.js está instalado..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERRO] Node.js não foi encontrado. Por favor, instale-o:${NC}"
    echo -e "  - Para Linux: sudo apt install nodejs npm"
    echo -e "  - Para macOS: brew install node"
    echo -e "  - Ou visite: https://nodejs.org/"
    exit 1
else
    echo -e "${GREEN}[OK] Node.js encontrado: $(node -v)${NC}"
fi

# Verificar se o NPM está instalado
echo -e "\nVerificando se o NPM está instalado..."
if ! command -v npm &> /dev/null; then
    echo -e "${RED}[ERRO] NPM não foi encontrado. Por favor, reinstale o Node.js.${NC}"
    exit 1
else
    echo -e "${GREEN}[OK] NPM encontrado: $(npm -v)${NC}"
fi

# Verificar se o Expo CLI está instalado
echo -e "\nVerificando se o Expo CLI está disponível..."
if ! npx expo --version &> /dev/null; then
    echo -e "${YELLOW}[INFO] Expo CLI não foi encontrado globalmente. Instalando...${NC}"
    npm install -g expo-cli
    if [ $? -ne 0 ]; then
        echo -e "${RED}[ERRO] Falha ao instalar o Expo CLI globalmente.${NC}"
        echo -e "${YELLOW}[INFO] Tentando instalar localmente...${NC}"
    else
        echo -e "${GREEN}[OK] Expo CLI instalado globalmente.${NC}"
    fi
else
    echo -e "${GREEN}[OK] Expo CLI encontrado.${NC}"
fi

# Instalar dependências do projeto
echo -e "\nInstalando dependências do projeto..."
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}[ERRO] Falha ao instalar as dependências do projeto.${NC}"
    exit 1
else
    echo -e "${GREEN}[OK] Dependências instaladas com sucesso.${NC}"
fi

# Tornar o script executável
chmod +x install.sh

echo -e "\n${GREEN}=======================================================${NC}"
echo -e "${GREEN} INSTALAÇÃO CONCLUÍDA COM SUCESSO!${NC}"
echo -e "${GREEN}=======================================================${NC}"
echo -e "\nPara iniciar o aplicativo, você pode:"
echo -e "1. Executar 'npm start' para iniciar o servidor Expo"
echo -e "2. Usar o Expo Go no seu celular para escanear o QR code"
echo -e "\nSe encontrar problemas de carregamento infinito:"
echo -e "- Execute 'npx expo start -c' para limpar o cache"
echo -e "- Reinstale o Expo Go no seu dispositivo"

# Perguntar se o usuário quer iniciar o aplicativo
echo -e "\nDeseja iniciar o aplicativo agora? (s/n)"
read -r resposta
if [[ $resposta =~ ^[Ss]$ ]]; then
    echo -e "\nIniciando o servidor Expo..."
    echo "Para parar o servidor, pressione Ctrl+C"
    echo ""
    npx expo start -c
else
    echo -e "\nInstalação concluída. Execute 'npm start' quando estiver pronto."
fi 