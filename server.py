#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import http.server
import socketserver
import webbrowser
import threading
import time
import os
import sys

class GameServer:
    def __init__(self, port=8000):
        self.port = port
        self.handler = http.server.SimpleHTTPRequestHandler
        self.httpd = None
        
    def print_banner(self):
        print("=" * 60)
        print("🏛️  TİCARET İMPARATORLUĞU - OYUN SUNUCUSU")
        print("=" * 60)
        print(f"🌐 Sunucu Adresi: http://localhost:{self.port}")
        print(f"📱 Mobil Uyumlu: Evet")
        print(f"🎮 Oyun Durumu: Aktif")
        print(f"🔧 Geliştirme Modu: Açık")
        print("=" * 60)
        print("🚀 Tarayıcıda açılıyor...")
        print("📋 Özellikler:")
        print("   • 81 Şehir ticaret sistemi")
        print("   • Araç ve işletme yönetimi")
        print("   • Çok oyunculu mod")
        print("   • Gerçek para dükkanı")
        print("   • Mobil uyumlu arayüz")
        print("=" * 60)
        
    def open_browser(self):
        """Tarayıcıda otomatik olarak oyunu aç"""
        def delayed_open():
            time.sleep(1.5)  # Sunucunun tamamen başlaması için bekle
            try:
                webbrowser.open(f'http://localhost:{self.port}')
                print(f"✅ Tarayıcıda açıldı: http://localhost:{self.port}")
            except Exception as e:
                print(f"⚠️  Tarayıcı açılamadı: {e}")
                print(f"🌐 Manuel olarak açın: http://localhost:{self.port}")
        
        browser_thread = threading.Thread(target=delayed_open)
        browser_thread.daemon = True
        browser_thread.start()
        
    def start_server(self):
        """HTTP sunucusunu başlat"""
        try:
            self.httpd = socketserver.TCPServer(('', self.port), self.handler)
            print(f"🚀 Sunucu {self.port} port'unda başlatılıyor...")
            
            # Tarayıcıyı aç
            self.open_browser()
            
            # Sunucuyu çalıştır
            print(f"📡 Sunucu çalışıyor... (Durdurmak için Ctrl+C)")
            self.httpd.serve_forever()
            
        except OSError as e:
            if "Address already in use" in str(e):
                print(f"❌ Hata: Port {self.port} zaten kullanılıyor!")
                print(f"💡 Çözüm: Farklı port deneyin")
                print(f"🔧 Komut: python server.py --port 8080")
                self.try_alternative_ports()
            else:
                print(f"❌ Sunucu başlatma hatası: {e}")
        except KeyboardInterrupt:
            print("\n🛑 Sunucu kullanıcı tarafından durduruldu")
            if self.httpd:
                self.httpd.server_close()
            print("✅ Sunucu güvenli bir şekilde kapatıldı")
        except Exception as e:
            print(f"❌ Beklenmedik hata: {e}")
            
    def try_alternative_ports(self):
        """Alternatif portları dene"""
        alternative_ports = [8080, 3000, 5000, 9000]
        for port in alternative_ports:
            try:
                test_server = socketserver.TCPServer(('', port), self.handler)
                test_server.server_close()
                print(f"✅ Port {port} kullanılabilir!")
                choice = input(f"🤔 Port {port} ile başlatmak ister misiniz? (E/H): ").upper()
                if choice == 'E':
                    self.port = port
                    self.start_server()
                    return
            except OSError:
                print(f"❌ Port {port} de kullanımda")
        print("❌ Kullanılabilir port bulunamadı!")
        
    def run(self):
        """Sunucuyu çalıştır"""
        # Banner göster
        self.print_banner()
        
        # Çalışma dizinini kontrol et
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
        
        # Sunucuyu başlat
        self.start_server()

def main():
    """Ana fonksiyon"""
    # Port kontrolü
    port = 8000
    if len(sys.argv) > 1:
        if "--port" in sys.argv:
            try:
                port_index = sys.argv.index("--port") + 1
                if port_index < len(sys.argv):
                    port = int(sys.argv[port_index])
            except (ValueError, IndexError):
                print("❌ Geçersiz port numarası!")
                print("💡 Kullanım: python server.py --port 8080")
                return
    
    # Sunucuyu oluştur ve çalıştır
    server = GameServer(port)
    server.run()

if __name__ == "__main__":
    main()
