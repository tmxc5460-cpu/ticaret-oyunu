@echo off
chcp 65001 >nul
title 🏛️ Ticaret İmparatorluğu - Sunucu Başlatıcı

echo.
echo ============================================================
echo    🏛️  TİCARET İMPARATORLUĞU - OYUN SUNUCUSU
echo ============================================================
echo.

REM Python kontrol et
echo 🔍 Python kontrol ediliyor...
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Python bulunamadı!
    echo 💡 Lütfen Python'u yükleyin
    echo 🔧 İndirme adresi: https://www.python.org/downloads/
    echo 📦 Kurulum sırası "Add Python to PATH" işaretleyin
    echo.
    echo 🌐 Python indirme sayfası açılıyor...
    start https://www.python.org/downloads/
    pause
    exit /b 1
) else (
    echo ✅ Python bulundu!
    for /f "tokens=2" %%i in ('python --version 2^>^&1') do set PYTHON_VERSION=%%i
    echo 🐍 Python sürümü: %PYTHON_VERSION%
)

echo.
echo    🌐 Oyun Adresi: http://localhost:8000
echo    📱 Mobil Uyumlu: Evet
echo    🎮 Oyun Durumu: Aktif
echo    🔧 Geliştirme Modu: Açık
echo.
echo    📋 Özellikler:
echo       • 81 Şehir ticaret sistemi
echo       • Araç ve işletme yönetimi
echo       • Çok oyunculu mod
echo       • Gerçek para dükkanı
echo       • Mobil uyumlu arayüz
echo.
echo ============================================================
echo.

echo 🚀 Sunucu başlatılıyor...
echo 📡 Tarayıcıda açılıyor...
echo.

python server.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Sunucu başlatılırken hata oluştu!
    echo 💡 Hata kodu: %ERRORLEVEL%
    echo 🔧 Lütfen dosyaların doğru olduğundan emin olun
    echo � Kontrol edilecek dosyalar:
    echo    - server.py
    echo    - index.html
    echo    - advanced-trade-game.js
    echo    - style.css
    echo    - turkey-cities.js
    echo.
) else (
    echo.
    echo ✅ Sunucu başarıyla kapatıldı
)

echo.
echo 🌐 Oyunu oynamak için: http://localhost:8000
echo 🛑 Sunucuyu durdurmak için: Ctrl+C
echo.
pause
