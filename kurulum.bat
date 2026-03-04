@echo off
chcp 65001 >nul
title 🏛️ Ticaret İmparatorluğu - Kurulum Sihirbazı

echo.
echo ============================================================
echo    🏛️  TİCARET İMPARATORLUĞU - KURULUM SİHİRBAZI
echo ============================================================
echo.
echo    🎯 Bu sihirbaz oyunu bilgisayarınıza kuracak
echo    📱 Mobil uyumlu web tabanlı oyun
echo    🌐 Tarayıcıda çalışan modern arayüz
echo.
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
    echo.
    echo ✅ Python kurulumunu tamamladıktan sonra bu sihirbazı tekrar çalıştırın.
    pause
    exit /b 1
) else (
    echo ✅ Python bulundu!
    for /f "tokens=2" %%i in ('python --version 2^>^&1') do set PYTHON_VERSION=%%i
    echo 🐍 Python sürümü: %PYTHON_VERSION%
)

echo.
echo 📁 Oyun dosyaları kontrol ediliyor...
if not exist "index.html" (
    echo ❌ index.html dosyası bulunamadı!
    goto :hata
)
if not exist "advanced-trade-game.js" (
    echo ❌ advanced-trade-game.js dosyası bulunamadı!
    goto :hata
)
if not exist "style.css" (
    echo ❌ style.css dosyası bulunamadı!
    goto :hata
)
if not exist "turkey-cities.js" (
    echo ❌ turkey-cities.js dosyası bulunamadı!
    goto :hata
)
if not exist "server.py" (
    echo ❌ server.py dosyası bulunamadı!
    goto :hata
)

echo ✅ Tüm oyun dosyaları bulundu!

REM Masaüstü kısayolu oluştur
echo.
echo 🔗 Masaüstü kısayolu oluşturuluyor...
set SCRIPT="%TEMP%\CreateShortcut.vbs"
echo Set oWS = WScript.CreateObject("WScript.Shell") > %SCRIPT%
echo sLinkFile = "%USERPROFILE%\Desktop\Ticaret İmparatorluğu.lnk" >> %SCRIPT%
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> %SCRIPT%
echo oLink.TargetPath = "%CD%\baslat.bat" >> %SCRIPT%
echo oLink.WorkingDirectory = "%CD%" >> %SCRIPT%
echo oLink.Description = "Ticaret İmparatorluğu Oyunu" >> %SCRIPT%
echo oLink.IconLocation = "%CD%\favicon.ico" >> %SCRIPT%
echo oLink.Save >> %SCRIPT%
cscript //nologo %SCRIPT%
del %SCRIPT%

echo ✅ Masaüstü kısayolu oluşturuldu!

REM Başlat menüsü kısayolu oluştur
echo.
echo 📋 Başlat menüsü kısayolu oluşturuluyor...
set STARTMENU="%APPDATA%\Microsoft\Windows\Start Menu\Programs"
copy "%USERPROFILE%\Desktop\Ticaret İmparatorluğu.lnk" "%STARTMENU%\" >nul 2>&1
echo ✅ Başlat menüsü kısayolu oluşturuldu!

REM Bildirim sistemi
echo.
echo 📱 Bildirim sistemi kuruluyor...
set NOTIFICATION_SCRIPT="%TEMP%\notification.vbs"
echo Set objShell = CreateObject("WScript.Shell") > %NOTIFICATION_SCRIPT%
echo objShell.Popup "Ticaret İmparatorluğu başarıyla kuruldu!" ^& vbCrLf ^& vbCrLf ^& "Masaüstündeki kısayoldan oyunu başlatabilirsiniz." ^& vbCrLf ^& vbCrLf ^& "Oyun Adresi: http://localhost:8000", 10, "Kurulum Tamamlandı", 64 >> %NOTIFICATION_SCRIPT%
echo ✅ Bildirim sistemi hazır!

echo.
echo ============================================================
echo    ✅ KURULUM BAŞARILI!
echo ============================================================
echo.
echo    🎮 Oyun Adresi: http://localhost:8000
echo    🖱️ Masaüstü Kısayolu: Ticaret İmparatorluğu.lnk
echo    📋 Başlat Menüsü: Programlar içinde
echo    📱 Bildirim: 1 saniye sonra gösterilecek
echo.
echo    📋 Kurulan Özellikler:
echo       • 81 Şehir ticaret sistemi
echo       • Araç ve işletme yönetimi
echo       • Çok oyunculu mod
echo       • Gerçek para dükkanı
echo       • Mobil uyumlu arayüz
echo       • Otomatik sunucu başlatma
echo       • Tarayıcıda otomatik açılış
echo.
echo ============================================================
echo.

echo 🚀 Oyun başlatılıyor...
timeout /t 3 /nobreak >nul

REM Bildirim göster
cscript //nologo %NOTIFICATION_SCRIPT%
del %NOTIFICATION_SCRIPT%

REM Sunucuyu başlat
start "" "Ticaret İmparatorluğu" cmd /k "cd /d %CD% && baslat.bat"

echo.
echo 🌐 Tarayıcıda oyun açılıyor...
echo 📱 Masaüstü kısayolu oluşturuldu
echo 🛑 Kapatmak için herhangi bir tuşa basın...
pause >nul
exit /b 0

:hata
echo.
echo ============================================================
echo    ❌ KURULUM HATASI!
echo ============================================================
echo.
echo 💡 Lütfen aşağıdaki dosyaların olduğundan emin olun:
echo    📁 index.html (Ana oyun sayfası)
echo    📁 advanced-trade-game.js (Oyun motoru)
echo    📁 style.css (Stil dosyası)
echo    📁 turkey-cities.js (Şehir verileri)
echo    📁 server.py (Sunucu dosyası)
echo    📁 baslat.bat (Başlatıcı)
echo.
echo 🔧 Tüm dosyaları aynı klasöre koyup tekrar deneyin.
echo ============================================================
echo.
pause
exit /b 1
