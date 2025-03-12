@echo off
title Instalação do Bom Dia Deus
echo.
echo ======================================================
echo  BOM DIA DEUS - INSTALADOR
echo ======================================================
echo.

echo Verificando se o Node.js está instalado...
node -v > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo [ERRO] Node.js não foi encontrado. Por favor, instale-o de https://nodejs.org/
  echo.
  echo Pressione qualquer tecla para abrir o site do Node.js...
  pause > nul
  start https://nodejs.org/
  goto :eof
)
echo [OK] Node.js encontrado.

echo.
echo Verificando se o NPM está instalado...
npm -v > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo [ERRO] NPM não foi encontrado. Por favor, reinstale o Node.js.
  pause
  goto :eof
)
echo [OK] NPM encontrado.

echo.
echo Verificando se o Expo CLI está instalado...
call npx expo --version > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo [INFO] Expo CLI não foi encontrado. Instalando...
  call npm install -g expo-cli
  if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao instalar o Expo CLI.
    pause
    goto :eof
  )
) else (
  echo [OK] Expo CLI encontrado.
)

echo.
echo Instalando dependências do projeto...
call npm install
if %ERRORLEVEL% NEQ 0 (
  echo [ERRO] Falha ao instalar as dependências do projeto.
  pause
  goto :eof
)
echo [OK] Dependências instaladas com sucesso.

echo.
echo =======================================================
echo  INSTALAÇÃO CONCLUÍDA COM SUCESSO!
echo =======================================================
echo.
echo Para iniciar o aplicativo, você pode:
echo 1. Executar 'npm start' para iniciar o servidor Expo
echo 2. Usar o Expo Go no seu celular para escanear o QR code
echo.
echo Se encontrar problemas de carregamento infinito:
echo - Execute 'npx expo start -c' para limpar o cache
echo - Reinstale o Expo Go no seu dispositivo
echo.

choice /C SN /M "Deseja iniciar o aplicativo agora? (S/N)"
if %ERRORLEVEL% EQU 1 (
  echo.
  echo Iniciando o servidor Expo...
  echo Para parar o servidor, pressione Ctrl+C
  echo.
  npx expo start -c
) else (
  echo.
  echo Instalação concluída. Execute 'npm start' quando estiver pronto.
  echo.
  pause
) 