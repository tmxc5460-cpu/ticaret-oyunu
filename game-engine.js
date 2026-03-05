// Dünya Ticaret İmparatorluğu - Ana Oyun Motoru
class WorldTradeGame {
    constructor() {
        this.playerProfile = null;
        this.selectedAvatar = '👑';
        this.selectedMoney = 1000000;
        this.startOnline = false;
        this.gameState = 'login';
        this.cities = [];
        this.currentCity = null;
        this.inventory = [];
        this.money = 1000000;
        this.gameTime = 0;
        this.gameDay = 1;
        this.visitedCities = [];
        this.trades = [];
        this.level = 1;
        this.experience = 0;
        this.achievements = [];
        this.settings = {
            sound: true,
            music: true,
            animations: true,
            theme: 'dark',
            language: 'tr'
        };
        
        // Mobil cihaz tespiti
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768;
        
        this.init();
    }
    
    init() {
        console.log('🌍 Dünya Ticaret İmparatorluğu başlatılıyor...');
        
        // Mobil optimizasyonları
        if (this.isMobile) {
            this.setupMobileOptimizations();
        }
        
        // Event listener'ları kur
        this.setupEventListeners();
        
        // Oyunu başlat
        this.initializeGame();
    }
    
    setupMobileOptimizations() {
        console.log('📱 Mobil optimizasyonları uygulanıyor...');
        
        // Viewport ayarları
        const viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.appendChild(meta);
        }
        
        // iOS zoom önleme
        document.addEventListener('gesturestart', function(e) {
            e.preventDefault();
        });
        
        // Touch optimizasyonları
        document.body.style.touchAction = 'manipulation';
        document.body.style.webkitUserSelect = 'none';
        document.body.style.userSelect = 'none';
        document.body.style.webkitTapHighlightColor = 'transparent';
    }
    
    setupEventListeners() {
        // Login screen events
        this.setupLoginEvents();
        
        // Game screen events
        this.setupGameEvents();
        
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Window events
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('orientationchange', () => this.handleOrientationChange());
    }
    
    setupLoginEvents() {
        // Avatar seçimi
        const avatarOptions = document.querySelectorAll('.avatar-option-login');
        avatarOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                // Tüm seçimleri kaldır
                avatarOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Yeni seçimi ekle
                e.target.classList.add('selected');
                this.selectedAvatar = e.target.dataset.avatar;
                
                this.playSound('select');
                this.vibrate(50);
            });
        });
        
        // Para seçimi
        const moneyOptions = document.querySelectorAll('.money-option');
        moneyOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                // Tüm seçimleri kaldır
                moneyOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Yeni seçimi ekle
                e.currentTarget.classList.add('selected');
                this.selectedMoney = parseInt(e.currentTarget.dataset.money);
                
                this.playSound('select');
                this.vibrate(50);
            });
        });
        
        // Start game button
        const startBtn = document.getElementById('start-game-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startGame());
        }
    }
    
    setupGameEvents() {
        // Map controls
        const zoomInBtn = document.getElementById('zoom-in-btn');
        const zoomOutBtn = document.getElementById('zoom-out-btn');
        const resetBtn = document.getElementById('reset-map-btn');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        
        if (zoomInBtn) zoomInBtn.addEventListener('click', () => this.mapSystem.zoomIn());
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => this.mapSystem.zoomOut());
        if (resetBtn) resetBtn.addEventListener('click', () => this.mapSystem.reset());
        if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => this.mapSystem.fullscreen());
        
        // Trade buttons
        const travelBtn = document.getElementById('travel-btn');
        const bankBtn = document.getElementById('bank-btn');
        const saveBtn = document.getElementById('save-game-btn');
        const settingsBtn = document.getElementById('settings-btn');
        
        if (travelBtn) travelBtn.addEventListener('click', () => this.openTravelModal());
        if (bankBtn) bankBtn.addEventListener('click', () => this.openBankModal());
        if (saveBtn) saveBtn.addEventListener('click', () => this.saveGame());
        if (settingsBtn) settingsBtn.addEventListener('click', () => this.openSettingsModal());
        
        // Modal events
        const modalClose = document.getElementById('modal-close');
        const modalCancel = document.getElementById('modal-cancel');
        const modalConfirm = document.getElementById('modal-confirm');
        
        if (modalClose) modalClose.addEventListener('click', () => this.closeModal());
        if (modalCancel) modalCancel.addEventListener('click', () => this.closeModal());
        if (modalConfirm) modalConfirm.addEventListener('click', () => this.confirmModal());
    }
    
    initializeGame() {
        // Dünya verilerini yükle
        this.loadWorldData();
        
        // Harita sistemini başlat
        this.initializeMap();
        
        // Oyun mekaniklerini başlat
        this.startGameLoop();
    }
    
    loadWorldData() {
        console.log('🌍 Dünya verileri yükleniyor...');
        
        // Tüm dünya şehirlerini birleştir
        this.cities = [];
        
        // Avrupa şehirleri
        Object.entries(worldData.europe.türkiye.cities).forEach(([key, city]) => {
            this.cities.push({
                id: `tr_${key}`,
                name: city.name,
                country: 'Türkiye',
                flag: '🇹🇷',
                lat: city.lat,
                lng: city.lng,
                population: city.population,
                region: 'Avrupa',
                districts: city.districts || {},
                visited: false,
                prices: this.generateCityPrices('europe')
            });
        });
        
        // Diğer Avrupa ülkeleri
        ['almanya', 'ingiltere', 'fransa', 'italya', 'ispanya'].forEach(countryKey => {
            const country = worldData.europe[countryKey];
            if (country && country.cities) {
                Object.values(country.cities).forEach(city => {
                    this.cities.push({
                        id: `${countryKey}_${city.name.toLowerCase().replace(/\s+/g, '_')}`,
                        name: city.name,
                        country: country.name,
                        flag: country.flag,
                        lat: city.lat,
                        lng: city.lng,
                        population: city.population || 1000000,
                        region: 'Avrupa',
                        districts: city.districts || {},
                        visited: false,
                        prices: this.generateCityPrices('europe')
                    });
                });
            }
        });
        
        // Asya şehirleri
        ['cin', 'japonya', 'hindistan'].forEach(countryKey => {
            const country = worldData.asia[countryKey];
            if (country && country.cities) {
                Object.values(country.cities).forEach(city => {
                    this.cities.push({
                        id: `${countryKey}_${city.name.toLowerCase().replace(/\s+/g, '_')}`,
                        name: city.name,
                        country: country.name,
                        flag: country.flag,
                        lat: city.lat,
                        lng: city.lng,
                        population: city.population || 2000000,
                        region: 'Asya',
                        districts: city.districts || {},
                        visited: false,
                        prices: this.generateCityPrices('asia')
                    });
                });
            }
        });
        
        // Amerika şehirleri
        ['abd', 'brezilya', 'kanada'].forEach(countryKey => {
            const country = worldData.americas[countryKey];
            if (country && country.cities) {
                Object.values(country.cities).forEach(city => {
                    this.cities.push({
                        id: `${countryKey}_${city.name.toLowerCase().replace(/\s+/g, '_')}`,
                        name: city.name,
                        country: country.name,
                        flag: country.flag,
                        lat: city.lat,
                        lng: city.lng,
                        population: city.population || 3000000,
                        region: 'Amerika',
                        districts: city.districts || {},
                        visited: false,
                        prices: this.generateCityPrices('americas')
                    });
                });
            }
        });
        
        // Afrika şehirleri
        ['misir', 'nijerya', 'guneyafrika'].forEach(countryKey => {
            const country = worldData.africa[countryKey];
            if (country && country.cities) {
                Object.values(country.cities).forEach(city => {
                    this.cities.push({
                        id: `${countryKey}_${city.name.toLowerCase().replace(/\s+/g, '_')}`,
                        name: city.name,
                        country: country.name,
                        flag: country.flag,
                        lat: city.lat,
                        lng: city.lng,
                        population: city.population || 5000000,
                        region: 'Afrika',
                        districts: city.districts || {},
                        visited: false,
                        prices: this.generateCityPrices('africa')
                    });
                });
            }
        });
        
        // Okyanusya şehirleri
        ['avustralya', 'yuzelanda'].forEach(countryKey => {
            const country = worldData.oceania[countryKey];
            if (country && country.cities) {
                Object.values(country.cities).forEach(city => {
                    this.cities.push({
                        id: `${countryKey}_${city.name.toLowerCase().replace(/\s+/g, '_')}`,
                        name: city.name,
                        country: country.name,
                        flag: country.flag,
                        lat: city.lat,
                        lng: city.lng,
                        population: city.population || 2000000,
                        region: 'Okyanusya',
                        districts: city.districts || {},
                        visited: false,
                        prices: this.generateCityPrices('oceania')
                    });
                });
            }
        });
        
        console.log(`✅ ${this.cities.length} dünya şehri yüklendi`);
    }
    
    generateCityPrices(region) {
        const prices = {};
        const regionData = regionPrices[region] || regionPrices.europe;
        
        tradeGoods.forEach(good => {
            let basePrice = good.basePrice;
            
            // Bölge çarpanını uygula
            basePrice *= regionData.buyMultiplier;
            
            // Rastgele fiyat dalgalanması (%20)
            const fluctuation = 0.8 + Math.random() * 0.4;
            basePrice *= fluctuation;
            
            prices[good.name] = {
                buy: Math.round(basePrice),
                sell: Math.round(basePrice * regionData.sellMultiplier),
                category: good.category,
                icon: good.icon
            };
        });
        
        return prices;
    }
    
    initializeMap() {
        console.log('🗺️ Dünya haritası başlatılıyor...');
        
        this.mapSystem = new WorldMapSystem('game-map');
        this.mapSystem.setCities(this.cities);
        this.mapSystem.onCityClick = (city) => {
            this.handleCityClick(city);
        };
        
        // Başlangıç şehri olarak İstanbul'u ayarla
        this.currentCity = this.cities.find(city => city.id === 'tr_istanbul') || this.cities[0];
        if (this.currentCity) {
            this.currentCity.visited = true;
            this.mapSystem.selectCity(this.currentCity);
        }
    }
    
    startGameLoop() {
        console.log('🎮 Oyun döngüsü başlatılıyor...');
        
        // Oyun zamanlayıcısı
        setInterval(() => {
            this.gameTime++;
            if (this.gameTime % 60 === 0) {
                this.gameDay++;
                this.updateGameTime();
            }
        }, 1000);
        
        // Fiyat güncellemeleri
        setInterval(() => {
            this.updatePrices();
        }, 30000); // 30 saniyede bir
        
        // UI güncellemesi
        this.updateUI();
    }
    
    startGame() {
        console.log('🚀 Oyun başlatılıyor...');
        
        // Oyuncu profilini oluştur
        this.playerProfile = {
            name: document.getElementById('player-name-login').value || 'İmparator',
            avatar: this.selectedAvatar,
            money: this.selectedMoney,
            level: 1,
            experience: 0,
            achievements: []
        };
        
        // Oyun durumunu güncelle
        this.money = this.selectedMoney;
        this.gameState = 'playing';
        
        // Login ekranını gizle, oyun ekranını göster
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        
        // Oyunu başlat
        this.updateUI();
        this.showNotification('🌍 İmparatorluğunuz başladı!', 'success');
        this.playSound('start');
    }
    
    handleCityClick(city) {
        console.log('🏙️ Şehir tıklandı:', city.name);
        
        // Şehir bilgisini göster
        this.showCityInfo(city);
        
        // Titreşim
        this.vibrate(100);
        
        // Ses
        this.playSound('click');
    }
    
    showCityInfo(city) {
        const cityInfo = document.getElementById('city-info');
        const cityName = document.getElementById('city-name');
        const cityRegion = document.getElementById('city-region');
        const cityShops = document.getElementById('city-shops');
        const cityPopulation = document.getElementById('city-population');
        const cityCountry = document.getElementById('city-country');
        const visitBtn = document.getElementById('visit-city-btn');
        
        if (cityInfo) {
            cityName.textContent = city.name;
            cityRegion.textContent = city.country;
            cityShops.textContent = Math.floor(Math.random() * 50) + 10;
            cityPopulation.textContent = city.population ? city.population.toLocaleString() : 'N/A';
            cityCountry.textContent = city.flag;
            
            // Ziyaret butonu
            if (visitBtn) {
                visitBtn.onclick = () => this.visitCity(city);
                visitBtn.textContent = city.visited ? '🔄 Şehre Geri Dön' : '🏪 Şehri Ziyaret Et';
            }
            
            cityInfo.style.display = 'block';
        }
    }
    
    visitCity(city) {
        if (this.currentCity && this.currentCity.id !== city.id) {
            // Seyahat maliyeti
            const distance = this.calculateDistance(this.currentCity, city);
            const travelCost = Math.round(distance * 10);
            
            if (this.money >= travelCost) {
                this.money -= travelCost;
                this.currentCity = city;
                city.visited = true;
                
                this.mapSystem.selectCity(city);
                this.updateUI();
                this.showNotification(`✈️ ${city.name} şehrine seyahat ettiniz! (-${travelCost.toLocaleString()} $)`, 'info');
                this.playSound('travel');
                this.vibrate(150);
                
                // Deneyim kazan
                this.gainExperience(Math.round(distance / 10));
            } else {
                this.showNotification('❌ Yetersiz bakiye!', 'error');
                this.playSound('error');
            }
        }
    }
    
    calculateDistance(city1, city2) {
        // Haversine formülü ile mesafe hesaplama
        const R = 6371; // Dünya yarıçapı (km)
        const dLat = this.toRadians(city2.lat - city1.lat);
        const dLng = this.toRadians(city2.lng - city1.lng);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(this.toRadians(city1.lat)) * Math.cos(this.toRadians(city2.lat)) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
    
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    
    generateTradeGoods() {
        const tradeGrid = document.getElementById('trade-grid');
        if (!tradeGrid) return;
        
        tradeGrid.innerHTML = '';
        
        const currentCityPrices = this.currentCity ? this.currentCity.prices : {};
        
        tradeGoods.forEach(good => {
            const cityPrice = currentCityPrices[good.name];
            if (!cityPrice) return;
            
            const tradeCard = document.createElement('div');
            tradeCard.className = 'trade-card';
            
            const profit = cityPrice.sell - cityPrice.buy;
            const profitClass = profit > 0 ? 'profit' : 'loss';
            const profitText = profit > 0 ? `+${profit.toLocaleString()} $` : `${profit.toLocaleString()} $`;
            
            tradeCard.innerHTML = `
                <h4>${good.icon} ${good.name}</h4>
                <div class="price">Alış: ${cityPrice.buy.toLocaleString()} $</div>
                <div class="price">Satış: ${cityPrice.sell.toLocaleString()} $</div>
                <div class="quantity ${profitClass}">Kâr: ${profitText}</div>
                <div class="trade-actions">
                    <button class="btn btn-primary" onclick="game.buyGood('${good.name}')">🛒 Al</button>
                    <button class="btn btn-secondary" onclick="game.sellGood('${good.name}')">💰 Sat</button>
                </div>
            `;
            
            tradeGrid.appendChild(tradeCard);
        });
    }
    
    buyGood(goodName) {
        const cityPrice = this.currentCity.prices[goodName];
        if (!cityPrice) return;
        
        const good = tradeGoods.find(g => g.name === goodName);
        if (!good) return;
        
        if (this.money >= cityPrice.buy) {
            this.money -= cityPrice.buy;
            
            // Envanta ekle
            const existingItem = this.inventory.find(item => item.name === goodName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.inventory.push({
                    name: goodName,
                    quantity: 1,
                    buyPrice: cityPrice.buy,
                    category: good.category,
                    icon: good.icon
                });
            }
            
            this.updateUI();
            this.showNotification(`🛒 ${goodName} satın alındı! (-${cityPrice.buy.toLocaleString()} $)`, 'success');
            this.playSound('buy');
            this.vibrate(80);
            
            // Deneyim kazan
            this.gainExperience(5);
        } else {
            this.showNotification('❌ Yetersiz bakiye!', 'error');
            this.playSound('error');
        }
    }
    
    sellGood(goodName) {
        const item = this.inventory.find(item => item.name === goodName);
        if (!item || item.quantity <= 0) return;
        
        const cityPrice = this.currentCity.prices[goodName];
        if (!cityPrice) return;
        
        this.money += cityPrice.sell;
        item.quantity--;
        
        // Envantadan temizle
        if (item.quantity <= 0) {
            this.inventory = this.inventory.filter(i => i.name !== goodName);
        }
        
        this.updateUI();
        this.showNotification(`💰 ${goodName} satıldı! (+${cityPrice.sell.toLocaleString()} $)`, 'success');
        this.playSound('sell');
        this.vibrate(80);
        
        // Deneyim kazan
        this.gainExperience(3);
    }
    
    gainExperience(amount) {
        this.experience += amount;
        
        // Level kontrolü
        const expNeeded = this.level * 100;
        if (this.experience >= expNeeded) {
            this.level++;
            this.experience = this.experience - expNeeded;
            this.showNotification(`🎉 Level ${this.level}'e yükseldiniz!`, 'success');
            this.playSound('levelup');
            this.vibrate(200);
        }
    }
    
    updatePrices() {
        // Fiyatları rastgele güncelle
        this.cities.forEach(city => {
            Object.keys(city.prices).forEach(goodName => {
                const currentPrice = city.prices[goodName];
                const fluctuation = 0.9 + Math.random() * 0.2;
                currentPrice.buy = Math.round(currentPrice.buy * fluctuation);
                currentPrice.sell = Math.round(currentPrice.sell * fluctuation);
            });
        });
        
        // Ticaret arayüzünü güncelle
        this.generateTradeGoods();
    }
    
    updateUI() {
        // Oyuncu bilgileri
        const playerAvatar = document.getElementById('player-avatar');
        const playerName = document.getElementById('player-name');
        const playerMoney = document.getElementById('player-money');
        const playerLevel = document.getElementById('player-level');
        const inventoryCount = document.getElementById('inventory-count');
        const currentLocation = document.getElementById('current-location');
        const currentCityName = document.getElementById('current-city-name');
        const currentCountryName = document.getElementById('current-country-name');
        const currentRegionName = document.getElementById('current-region-name');
        
        if (playerAvatar) playerAvatar.textContent = this.playerProfile.avatar;
        if (playerName) playerName.textContent = this.playerProfile.name;
        if (playerMoney) playerMoney.textContent = `${this.money.toLocaleString()} $`;
        if (playerLevel) playerLevel.textContent = `Level ${this.level}`;
        if (inventoryCount) inventoryCount.textContent = this.inventory.reduce((sum, item) => sum + item.quantity, 0);
        if (currentLocation) currentLocation.textContent = this.currentCity ? this.currentCity.name : 'Bilinmiyor';
        if (currentCityName) currentCityName.textContent = this.currentCity ? this.currentCity.name : 'Bilinmiyor';
        if (currentCountryName) currentCountryName.textContent = this.currentCity ? this.currentCity.country : 'Bilinmiyor';
        if (currentRegionName) currentRegionName.textContent = this.currentCity ? this.currentCity.region : 'Bilinmiyor';
        
        // Ticaret arayüzü
        this.generateTradeGoods();
    }
    
    updateGameTime() {
        const timeElement = document.getElementById('game-time');
        if (timeElement) {
            const hours = Math.floor(this.gameTime / 3600);
            const minutes = Math.floor((this.gameTime % 3600) / 60);
            const seconds = this.gameTime % 60;
            timeElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    openTravelModal() {
        this.showModal('✈️ Seyahat Et', 'Hangi şehre seyahat etmek istersiniz?', 'travel');
    }
    
    openBankModal() {
        this.showModal('🏦 Banka', `Mevcut bakiyeniz: ${this.money.toLocaleString()} $`, 'bank');
    }
    
    openSettingsModal() {
        this.showModal('⚙️ Ayarlar', 'Oyun ayarları burada olacak', 'settings');
    }
    
    showModal(title, content, type) {
        const modal = document.getElementById('modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        if (modal && modalTitle && modalBody) {
            modalTitle.textContent = title;
            modalBody.innerHTML = content;
            modal.style.display = 'flex';
            modal.dataset.type = type;
        }
    }
    
    closeModal() {
        const modal = document.getElementById('modal-overlay');
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    confirmModal() {
        const modal = document.getElementById('modal-overlay');
        if (modal && modal.dataset.type) {
            switch (modal.dataset.type) {
                case 'travel':
                    this.closeModal();
                    break;
                case 'bank':
                    this.closeModal();
                    break;
                case 'settings':
                    this.closeModal();
                    break;
            }
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Renk göre stil
        switch (type) {
            case 'success':
                notification.style.background = 'rgba(76, 175, 80, 0.95)';
                break;
            case 'error':
                notification.style.background = 'rgba(244, 67, 54, 0.95)';
                break;
            case 'warning':
                notification.style.background = 'rgba(255, 152, 0, 0.95)';
                break;
            default:
                notification.style.background = 'rgba(102, 126, 234, 0.95)';
        }
        
        document.body.appendChild(notification);
        
        // Otomatik kaldır
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    playSound(type) {
        if (!this.settings.sound) return;
        
        // Ses çalma kodu (basit sesler)
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch (type) {
            case 'click':
                oscillator.frequency.value = 800;
                gainNode.gain.value = 0.1;
                break;
            case 'select':
                oscillator.frequency.value = 1000;
                gainNode.gain.value = 0.15;
                break;
            case 'buy':
                oscillator.frequency.value = 1200;
                gainNode.gain.value = 0.2;
                break;
            case 'sell':
                oscillator.frequency.value = 600;
                gainNode.gain.value = 0.15;
                break;
            case 'travel':
                oscillator.frequency.value = 400;
                gainNode.gain.value = 0.1;
                break;
            case 'levelup':
                oscillator.frequency.value = 1600;
                gainNode.gain.value = 0.3;
                break;
            case 'start':
                oscillator.frequency.value = 2000;
                gainNode.gain.value = 0.2;
                break;
            case 'error':
                oscillator.frequency.value = 300;
                gainNode.gain.value = 0.1;
                break;
        }
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    vibrate(duration) {
        if (navigator.vibrate && this.isMobile) {
            try {
                navigator.vibrate(duration);
            } catch (e) {
                console.log('❌ Titreşim desteklenmiyor:', e);
            }
        }
    }
    
    handleKeyPress(e) {
        // Klavye kısayolları
        switch (e.key) {
            case '+':
            case '=':
                this.mapSystem.zoomIn();
                break;
            case '-':
            case '_':
                this.mapSystem.zoomOut();
                break;
            case 'r':
            case 'R':
                this.mapSystem.reset();
                break;
            case 'f':
            case 'F':
                this.mapSystem.fullscreen();
                break;
            case 'Escape':
                this.closeModal();
                break;
        }
    }
    
    handleResize() {
        if (this.mapSystem) {
            this.mapSystem.draw();
        }
    }
    
    handleOrientationChange() {
        setTimeout(() => {
            if (this.mapSystem) {
                this.mapSystem.draw();
            }
        }, 100);
    }
    
    saveGame() {
        const saveData = {
            playerProfile: this.playerProfile,
            money: this.money,
            level: this.level,
            experience: this.experience,
            currentCity: this.currentCity,
            inventory: this.inventory,
            visitedCities: this.visitedCities,
            gameDay: this.gameDay,
            gameTime: this.gameTime,
            achievements: this.achievements,
            settings: this.settings
        };
        
        localStorage.setItem('worldTradeGameSave', JSON.stringify(saveData));
        this.showNotification('💾 Oyun kaydedildi!', 'success');
        this.playSound('save');
    }
    
    loadGame() {
        const saveData = localStorage.getItem('worldTradeGameSave');
        if (saveData) {
            try {
                const data = JSON.parse(saveData);
                this.playerProfile = data.playerProfile;
                this.money = data.money;
                this.level = data.level;
                this.experience = data.experience;
                this.currentCity = data.currentCity;
                this.inventory = data.inventory || [];
                this.visitedCities = data.visitedCities || [];
                this.gameDay = data.gameDay;
                this.gameTime = data.gameTime;
                this.achievements = data.achievements || [];
                this.settings = data.settings || this.settings;
                
                // Oyun durumunu güncelle
                this.gameState = 'playing';
                document.getElementById('login-screen').style.display = 'none';
                document.getElementById('game-screen').style.display = 'block';
                
                this.updateUI();
                this.showNotification('📂 Oyun yüklendi!', 'success');
                return true;
            } catch (e) {
                console.error('Oyun yüklenirken hata:', e);
                return false;
            }
        }
        return false;
    }
}

// Oyunu başlat
let game;
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌍 Dünya Ticaret İmparatorluğu yükleniyor...');
    
    // Kayıtlı oyunu kontrol et
    game = new WorldTradeGame();
    
    console.log('🚀 Dünya Ticaret İmparatorluğu hazır!');
});
