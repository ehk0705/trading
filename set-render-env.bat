@echo off
setlocal

REM ==============================
REM Configuration Render
REM ==============================

set RENDER_API_KEY=COLLE_ICI_TA_CLE_API_RENDER
set SERVICE_ID=COLLE_ICI_LE_SERVICE_ID_RENDER

set DATABASE_URL=postgresql://trading_db_77ok_user:KGFDUKBFA7Hvaox2RvQcXchniWbogFan@dpg-d7st0jjeo5us73eq16e0-a:5432/trading_db_77ok

REM ==============================
REM Vérification
REM ==============================

if "%RENDER_API_KEY%"=="COLLE_ICI_TA_CLE_API_RENDER" (
    echo Erreur : ajoute ta cle API Render.
    pause
    REM exit /b 1
)

if "%SERVICE_ID%"=="COLLE_ICI_LE_SERVICE_ID_RENDER" (
    echo Erreur : ajoute le SERVICE_ID Render.
    pause
    REM exit /b 1
)

REM ==============================
REM Envoi de la variable DATABASE_URL
REM ==============================

curl -X PUT "https://api.render.com/v1/services/%SERVICE_ID%/env-vars/DATABASE_URL" ^
-H "Authorization: Bearer %RENDER_API_KEY%" ^
-H "Content-Type: application/json" ^
-d "{\"value\":\"%DATABASE_URL%\"}"

echo.
echo Variable DATABASE_URL envoyee a Render.
echo Redemarre ensuite ton service Render.
pause