class AdvancedTradeSimulator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameRunning = false;
        
        // Oyun durumu
        this.money = 50000;
        this.currentCity = 33; // İstanbul
        this.inventory = {};
        this.maxCargo = 50;
        this.currentCargo = 0;
        this.vehicles = [];
        this.businesses = [];
        this.employees = [];
        this.reputation = 50;
        this.level = 1;
        this.experience = 0;
        
        // Online mod
        this.isOnline = false;
        this.onlinePlayers = [];
        this.playerId = Date.now();
        this.playerName = '';
        this.playerProfile = null;
        this.friends = [];
        this.friendRequests = [];
        this.serverConnection = null;
        this.localIP = this.getLocalIP();
        this.isHost = false;
        this.hostedGames = [];
        this.joinedGame = null;
        
        // Zaman sistemi
        this.gameTime = new Date();
        this.gameSpeed = 1; // 1 saat = 1 saniye
        this.lastTimeUpdate = Date.now();
        this.isPaused = false;
        
        // Harita
        this.zoom = 1.0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        
        // Yolculuk
        this.traveling = false;
        this.travelProgress = 0;
        this.travelFrom = null;
        this.travelTo = null;
        this.travelSpeed = 0.01;
        this.currentVehicle = null;
        
        // UI
        this.selectedCity = null;
        this.hoveredCity = null;
        this.currentModal = null;
        
        // Ses
        this.soundManager = null;
        
        this.init();
    }
    
    init() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
        this.setupEventListeners();
        this.setupUI();
        this.initializeGame();
        
        // Ses yöneticisi
        this.soundManager = new SoundManager();
    }
    
    initializeGame() {
        // Başlangıç envanteri
        tradeGoods.forEach(good => {
            this.inventory[good.name] = 0;
        });
        
        // Başlangıç aracı
        this.addVehicle({
            ...vehicleTypes[1], // Kamyonet
            id: Date.now(),
            condition: 100,
            fuel: 100,
            location: this.currentCity
        });
        
        this.currentVehicle = this.vehicles[0];
        
        // Profil kontrolü
        this.loadPlayerProfile();
    }
    
    getLocalIP() {
        // Simüle edilmiş local IP (gerçek uygulamada fetch ile alınır)
        return `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
    }
    
    loadPlayerProfile() {
        const savedProfile = localStorage.getItem('playerProfile');
        if (savedProfile) {
            this.playerProfile = JSON.parse(savedProfile);
            this.playerName = this.playerProfile.name;
            this.friends = this.playerProfile.friends || [];
            this.playerId = this.playerProfile.id || this.playerId;
        } else {
            // İlk kez oynuyor - profil oluştur
            this.showProfileCreationModal();
        }
    }
    
    showProfileCreationModal() {
        const modal = document.getElementById('profile-modal');
        if (!modal) {
            this.createProfileModal();
        }
        document.getElementById('profile-modal').style.display = 'block';
    }
    
    createProfileModal() {
        const modalHTML = `
            <div id="profile-modal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="game.closeProfileModal()">&times;</span>
                    <h2>Profil Oluştur</h2>
                    <div class="profile-form">
                        <div class="form-group">
                            <label for="player-name-input">Oyuncu Adı:</label>
                            <input type="text" id="player-name-input" placeholder="Adınızı girin" maxlength="20">
                        </div>
                        <div class="form-group">
                            <label for="player-avatar">Avatar:</label>
                            <div class="avatar-selection">
                                <div class="avatar-option" data-avatar="👤">👤</div>
                                <div class="avatar-option" data-avatar="👨">👨</div>
                                <div class="avatar-option" data-avatar="👩">👩</div>
                                <div class="avatar-option" data-avatar="🧑">🧑</div>
                                <div class="avatar-option" data-avatar="👶">👶</div>
                                <div class="avatar-option" data-avatar="👴">👴</div>
                                <div class="avatar-option" data-avatar="👵">👵</div>
                                <div class="avatar-option" data-avatar="🦸">🦸</div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="player-bio">Bio:</label>
                            <textarea id="player-bio" placeholder="Kendinizi tanıtın..." maxlength="100"></textarea>
                        </div>
                        <button class="create-profile-btn" onclick="game.createPlayerProfile()">Profil Oluştur</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.setupAvatarSelection();
    }
    
    setupAvatarSelection() {
        const avatarOptions = document.querySelectorAll('.avatar-option');
        avatarOptions.forEach(option => {
            option.addEventListener('click', function() {
                avatarOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
    
    createPlayerProfile() {
        const nameInput = document.getElementById('player-name-input');
        const bioInput = document.getElementById('player-bio');
        const selectedAvatar = document.querySelector('.avatar-option.selected');
        
        if (!nameInput.value.trim()) {
            alert('Lütfen bir oyuncu adı girin!');
            return;
        }
        
        this.playerProfile = {
            id: this.playerId,
            name: nameInput.value.trim(),
            avatar: selectedAvatar ? selectedAvatar.dataset.avatar : '👤',
            bio: bioInput.value.trim(),
            level: this.level,
            money: this.money,
            city: this.currentCity,
            joinDate: new Date().toISOString(),
            friends: [],
            achievements: [],
            stats: {
                totalTrades: 0,
                totalProfit: 0,
                citiesVisited: 1,
                businessesOwned: 0,
                vehiclesOwned: 1
            }
        };
        
        this.playerName = this.playerProfile.name;
        localStorage.setItem('playerProfile', JSON.stringify(this.playerProfile));
        
        this.closeProfileModal();
        this.soundManager.playSuccess();
        
        // Online modu başlat
        if (this.isOnline) {
            this.connectToServer();
        }
    }
    
    closeProfileModal() {
        const modal = document.getElementById('profile-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setupEventListeners() {
        // Canvas olayları
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleCanvasHover(e));
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('wheel', (e) => this.handleWheel(e));
        
        // Touch olayları
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Modal olayları
        document.querySelectorAll('.close').forEach(btn => {
            btn.addEventListener('click', () => this.closeAllModals());
        });
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    setupUI() {
        const startBtn = document.getElementById('start-btn');
        startBtn.addEventListener('click', () => this.startGame());
    }
    
    startGame() {
        this.gameRunning = true;
        document.getElementById('start-btn').style.display = 'none';
        this.soundManager.resumeContext();
        this.updateUI();
        this.startGameTime();
        this.connectToServer();
        this.animate();
    }
    
    startGameTime() {
        setInterval(() => {
            if (!this.isPaused && this.gameRunning) {
                const now = Date.now();
                const deltaTime = (now - this.lastTimeUpdate) * this.gameSpeed;
                this.gameTime = new Date(this.gameTime.getTime() + deltaTime * 1000);
                this.lastTimeUpdate = now;
                this.updateTimeDisplay();
            }
        }, 1000);
    }
    
    updateTimeDisplay() {
        const timeDisplay = document.getElementById('game-time');
        if (timeDisplay) {
            const hours = this.gameTime.getHours().toString().padStart(2, '0');
            const minutes = this.gameTime.getMinutes().toString().padStart(2, '0');
            const day = this.gameTime.getDate().toString().padStart(2, '0');
            const month = (this.gameTime.getMonth() + 1).toString().padStart(2, '0');
            const year = this.gameTime.getFullYear();
            
            timeDisplay.textContent = `${day}/${month}/${year} ${hours}:${minutes}`;
        }
    }
    
    connectToServer() {
        if (!this.playerProfile) {
            alert('Önce profil oluşturmalısınız!');
            return;
        }
        
        // Simüle edilmiş online bağlantı
        this.isOnline = true;
        this.simulateOnlinePlayers();
        this.startOnlineSync();
        this.startNetworkDiscovery();
    }
    
    startNetworkDiscovery() {
        // Local ağdaki oyuncuları keşfet (simülasyon)
        setInterval(() => {
            if (this.isOnline) {
                this.discoverLocalPlayers();
            }
        }, 10000); // Her 10 saniyede bir
    }
    
    discoverLocalPlayers() {
        // Simüle edilmiş local oyuncu keşfi
        const localPlayers = [
            { name: 'Ahmet', ip: '192.168.1.100', level: 5, city: 0 },
            { name: 'Mehmet', ip: '192.168.1.101', level: 3, city: 1 },
            { name: 'Ayşe', ip: '192.168.1.102', level: 7, city: 2 },
            { name: 'Fatma', ip: '192.168.1.103', level: 4, city: 3 },
            { name: 'Mustafa', ip: '192.168.1.104', level: 6, city: 4 }
        ];
        
        // Rastgele oyuncular ekle
        if (Math.random() < 0.3 && this.onlinePlayers.length < 10) {
            const randomPlayer = localPlayers[Math.floor(Math.random() * localPlayers.length)];
            if (!this.onlinePlayers.find(p => p.name === randomPlayer.name)) {
                this.onlinePlayers.push({
                    id: Date.now() + Math.random(),
                    name: randomPlayer.name,
                    ip: randomPlayer.ip,
                    city: randomPlayer.city,
                    money: Math.floor(Math.random() * 200000) + 50000,
                    level: randomPlayer.level,
                    activity: this.getRandomActivity(),
                    isLocal: true,
                    profile: {
                        avatar: '👤',
                        bio: 'Ticaret tutkunu',
                        joinDate: new Date().toISOString()
                    }
                });
            }
        }
    }
    
    sendFriendRequest(playerId) {
        const player = this.onlinePlayers.find(p => p.id === playerId);
        if (!player) return;
        
        // Arkadaşlık isteği gönder (simülasyon)
        if (!this.friendRequests.find(req => req.playerId === playerId)) {
            this.friendRequests.push({
                playerId: playerId,
                playerName: player.name,
                timestamp: Date.now(),
                status: 'pending'
            });
            
            // Diğer oyuncuya bildirim gönder (simülasyon)
            console.log(`Arkadaşlık isteği gönderildi: ${this.playerName} → ${player.name}`);
            this.soundManager.playNotification();
        }
    }
    
    acceptFriendRequest(requestId) {
        const request = this.friendRequests.find(req => req.playerId === requestId);
        if (!request) return;
        
        // Arkadaş ekle
        this.friends.push({
            id: request.playerId,
            name: request.playerName,
            addedDate: Date.now()
        });
        
        // İsteği kaldır
        this.friendRequests = this.friendRequests.filter(req => req.playerId !== requestId);
        
        // Profili güncelle
        this.updatePlayerProfile();
        this.soundManager.playSuccess();
    }
    
    declineFriendRequest(requestId) {
        this.friendRequests = this.friendRequests.filter(req => req.playerId !== requestId);
        this.soundManager.playClick();
    }
    
    updatePlayerProfile() {
        if (this.playerProfile) {
            this.playerProfile.friends = this.friends;
            this.playerProfile.level = this.level;
            this.playerProfile.money = this.money;
            this.playerProfile.city = this.currentCity;
            localStorage.setItem('playerProfile', JSON.stringify(this.playerProfile));
        }
    }
    
    createJointBusiness(friendId, businessType) {
        const friend = this.friends.find(f => f.id === friendId);
        if (!friend) return;
        
        const business = businessTypes[businessType];
        const playerCost = Math.floor(business.initialCost / 2);
        
        if (this.money >= playerCost) {
            this.money -= playerCost;
            
            const jointBusiness = {
                ...business,
                id: Date.now(),
                type: 'joint',
                owners: [this.playerId, friendId],
                level: 1,
                popularity: 50,
                location: this.currentCity,
                upgradeCost: Math.floor(business.upgradeCost / 2),
                hireCost: Math.floor(business.hireCost / 2),
                sellValue: Math.floor(business.sellValue / 2),
                createdDate: Date.now()
            };
            
            this.businesses.push(jointBusiness);
            
            // Arkadaşa bildirim gönder (simülasyon)
            console.log(`Ortak işletme kurdu: ${this.playerName} + ${friend.name}`);
            
            this.gainExperience(500);
            this.updateUI();
            this.soundManager.playSuccess();
        }
    }
    
    getJointBusinesses() {
        return this.businesses.filter(b => b.type === 'joint');
    }
    
    getFriendBusinesses(friendId) {
        return this.businesses.filter(b => b.owners && b.owners.includes(friendId));
    }
    
    simulateOnlinePlayers() {
        // Simüle edilmiş online oyuncular
        const playerNames = ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma', 'Mustafa', 'Zeynep', 'Ali', 'Veli'];
        const cities = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // İlk 10 şehir
        
        for (let i = 0; i < 5; i++) {
            this.onlinePlayers.push({
                id: Date.now() + i,
                name: playerNames[Math.floor(Math.random() * playerNames.length)],
                city: cities[Math.floor(Math.random() * cities.length)],
                money: Math.floor(Math.random() * 100000) + 10000,
                level: Math.floor(Math.random() * 10) + 1,
                activity: this.getRandomActivity()
            });
        }
    }
    
    getRandomActivity() {
        const activities = ['ticaret yapıyor', 'yolculuk ediyor', 'işletme yönetiyor', 'araç tamir ediyor', 'çalışan işe alıyor'];
        return activities[Math.floor(Math.random() * activities.length)];
    }
    
    startOnlineSync() {
        // Her 5 saniyede bir online verileri güncelle
        setInterval(() => {
            if (this.isOnline) {
                this.updateOnlineData();
                this.syncWithServer();
            }
        }, 5000);
    }
    
    updateOnlineData() {
        // Online oyuncuların konumlarını ve durumlarını güncelle
        this.onlinePlayers.forEach(player => {
            if (Math.random() < 0.3) { // %30 ihtimalle hareket et
                player.city = Math.floor(Math.random() * turkeyProvinces.length);
                player.activity = this.getRandomActivity();
            }
            if (Math.random() < 0.2) { // %20 ihtimalle para değişimi
                player.money += Math.floor(Math.random() * 10000) - 5000;
            }
        });
    }
    
    syncWithServer() {
        // Simüle edilmiş senkronizasyon
        const playerData = {
            id: this.playerId,
            name: this.playerName,
            city: this.currentCity,
            money: this.money,
            level: this.level,
            activity: this.getCurrentActivity()
        };
        
        // Diğer oyuncularla veri paylaşımı (simülasyon)
        this.broadcastPlayerData(playerData);
    }
    
    getCurrentActivity() {
        if (this.traveling) return 'yolculuk ediyor';
        if (this.currentModal === 'trade') return 'ticaret yapıyor';
        if (this.currentModal === 'vehicles') return 'araç yönetiyor';
        if (this.currentModal === 'business') return 'işletme yönetiyor';
        if (this.currentModal === 'employees') return 'çalışan yönetiyor';
        return 'bekliyor';
    }
    
    broadcastPlayerData(data) {
        // Simüle edilmiş yayın - diğer oyuncuların verilerini güncelle
        // Gerçek bir sunucuda bu WebSocket veya HTTP ile yapılır
        console.log('Player data broadcasted:', data);
    }
    
    getOnlinePlayersInCity(cityIndex) {
        return this.onlinePlayers.filter(player => player.city === cityIndex);
    }
    
    toggleOnlineMode() {
        this.isOnline = !this.isOnline;
        if (this.isOnline) {
            this.connectToServer();
        } else {
            this.onlinePlayers = [];
        }
        this.updateUI();
        return this.isOnline;
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        if (!this.isPaused) {
            this.lastTimeUpdate = Date.now();
        }
        this.updateUI();
        return this.isPaused;
    }
    
    changeGameSpeed(speed) {
        this.gameSpeed = speed;
        this.updateUI();
    }
    
    handleCanvasClick(e) {
        if (!this.gameRunning || this.traveling || this.isDragging) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left - this.offsetX) / this.zoom;
        const y = (e.clientY - rect.top - this.offsetY) / this.zoom;
        
        // Zaman kontrol butonları kontrolü
        const zoomControlX = this.canvas.width - 110;
        const zoomControlY = 10;
        const zoomControlWidth = 100;
        const zoomControlHeight = 120;
        
        if (x >= zoomControlX && x <= zoomControlX + zoomControlWidth &&
            y >= zoomControlY && y <= zoomControlY + zoomControlHeight) {
            
            // Zaman hız butonları
            if (y >= 95 && y <= 115) {
                // 1x butonu
                this.changeGameSpeed(1);
                return;
            } else if (y >= 105 && y <= 125) {
                // 2x butonu
                this.changeGameSpeed(2);
                return;
            } else if (y >= 115 && y <= 135) {
                // 5x butonu
                this.changeGameSpeed(5);
                return;
            }
        }
        
        // Şehir kontrolü
        for (let i = 0; i < turkeyProvinces.length; i++) {
            const city = turkeyProvinces[i];
            const distance = Math.sqrt(Math.pow(x - city.x, 2) + Math.pow(y - city.y, 2));
            
            if (distance < 15) {
                if (i === this.currentCity) {
                    // Kendi şehrinde - menüyü aç
                    this.openCityMenu(city);
                } else {
                    // Başka şehre git
                    this.travelToCity(i);
                }
                break;
            }
        }
    }
    
    handleCanvasHover(e) {
        if (!this.gameRunning) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left - this.offsetX) / this.zoom;
        const y = (e.clientY - rect.top - this.offsetY) / this.zoom;
        
        this.hoveredCity = null;
        
        for (let i = 0; i < turkeyProvinces.length; i++) {
            const city = turkeyProvinces[i];
            const distance = Math.sqrt(Math.pow(x - city.x, 2) + Math.pow(y - city.y, 2));
            
            if (distance < 15) {
                this.hoveredCity = i;
                this.canvas.style.cursor = 'pointer';
                return;
            }
        }
        
        this.canvas.style.cursor = this.isDragging ? 'grabbing' : 'grab';
    }
    
    handleMouseDown(e) {
        if (e.button === 0) { // Sol tık
            this.isDragging = true;
            this.dragStartX = e.clientX - this.offsetX;
            this.dragStartY = e.clientY - this.offsetY;
            this.canvas.style.cursor = 'grabbing';
        }
    }
    
    handleMouseUp(e) {
        this.isDragging = false;
        this.canvas.style.cursor = 'pointer';
    }
    
    handleWheel(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.max(0.5, Math.min(3.0, this.zoom * delta));
        
        // Zoom'u mouse pozisyonuna göre ayarla
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        this.offsetX = mouseX - (mouseX - this.offsetX) * (newZoom / this.zoom);
        this.offsetY = mouseY - (mouseY - this.offsetY) * (newZoom / this.zoom);
        
        this.zoom = newZoom;
    }
    
    handleTouchStart(e) {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            this.isDragging = true;
            this.dragStartX = touch.clientX - this.offsetX;
            this.dragStartY = touch.clientY - this.offsetY;
        }
    }
    
    handleTouchMove(e) {
        if (e.touches.length === 1 && this.isDragging) {
            e.preventDefault();
            const touch = e.touches[0];
            this.offsetX = touch.clientX - this.dragStartX;
            this.offsetY = touch.clientY - this.dragStartY;
        }
    }
    
    handleTouchEnd(e) {
        this.isDragging = false;
    }
    
    openCityMenu(city) {
        const modal = document.getElementById('trade-modal');
        const modalTitle = document.getElementById('modal-title');
        const goodsList = document.getElementById('goods-list');
        
        modalTitle.textContent = `${city.name} - Ticaret Merkezi`;
        
        // Online oyuncuları göster
        const onlinePlayers = this.getOnlinePlayersInCity(turkeyProvinces.indexOf(city));
        
        let html = `
            <div class="city-info">
                <div class="city-name">${city.name}</div>
                <div class="city-description">Bölge: ${city.region} | Nüfus: ${(city.population / 1000000).toFixed(1)}M</div>
                <div class="city-description">Ekonomi: ${city.economy}</div>
                <div class="online-players">
                    <strong>Online Oyuncular (${onlinePlayers.length}):</strong>
                    ${onlinePlayers.map(player => `
                        <div class="online-player">
                            <span class="player-name">${player.name}</span>
                            <span class="player-level">Lv.${player.level}</span>
                            <span class="player-money">₺${player.money.toLocaleString('tr-TR')}</span>
                            <span class="player-activity">${player.activity}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="menu-tabs">
                <button class="tab-btn active" onclick="game.switchTab('trade')">Ticaret</button>
                <button class="tab-btn" onclick="game.switchTab('vehicles')">Araçlar</button>
                <button class="tab-btn" onclick="game.switchTab('business')">İşletmeler</button>
                <button class="tab-btn" onclick="game.switchTab('employees')">Çalışanlar</button>
                <button class="tab-btn" onclick="game.switchTab('online')">Online</button>
            </div>
            
            <div id="tab-content">
        `;
        
        // Ticaret sekmesi
        html += this.generateTradeContent(city);
        html += `</div>`;
        
        goodsList.innerHTML = html;
        modal.style.display = 'block';
        this.currentModal = 'trade';
        this.soundManager.playClick();
    }
    
    generateTradeContent(city) {
        let html = '<div class="trade-section">';
        
        // Araç seçimi
        if (this.vehicles.length > 1) {
            html += '<div class="vehicle-selection"><h4>Araç Seçimi:</h4>';
            this.vehicles.forEach((vehicle, index) => {
                const isSelected = this.currentVehicle?.id === vehicle.id;
                html += `
                    <button class="vehicle-btn ${isSelected ? 'selected' : ''}" 
                            onclick="game.selectVehicle(${index})">
                        ${vehicle.name} (Kapasite: ${vehicle.cargo})
                    </button>
                `;
            });
            html += '</div>';
        }
        
        // Mallar
        Object.entries(this.getCityGoods(city)).forEach(([goodName, goodData]) => {
            const owned = this.inventory[goodName] || 0;
            const canBuy = this.money >= goodData.price && this.currentCargo < this.currentVehicle.cargo;
            const canSell = owned > 0;
            const maxBuy = Math.min(
                Math.floor(this.money / goodData.price),
                this.currentVehicle.cargo - this.currentCargo
            );
            
            html += `
                <div class="goods-item">
                    <div class="goods-header">
                        <span class="goods-name">${goodName}</span>
                        <span class="goods-price">${goodData.price} ₺</span>
                    </div>
                    <div class="goods-info">
                        Stok: ${goodData.stock} | Sahip: ${owned} | Vol: ${(goodData.volatility * 100).toFixed(0)}%
                    </div>
                    <div class="trade-controls">
                        <div class="quantity-control">
                            <input type="number" id="qty-${goodName}" min="1" max="${canBuy ? maxBuy : owned}" value="1">
                            <span>Adet</span>
                        </div>
                        <div class="trade-buttons">
                            <button class="buy-btn" ${!canBuy ? 'disabled' : ''} 
                                    onclick="game.buyGood('${goodName}', ${goodData.price})">
                                Al
                            </button>
                            <button class="sell-btn" ${!canSell ? 'disabled' : ''} 
                                    onclick="game.sellGood('${goodName}', ${goodData.price})">
                                Sat
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    getCityGoods(city) {
        const goods = {};
        const regionData = regionSpecialties[city.region];
        
        tradeGoods.forEach(good => {
            let basePrice = good.basePrice;
            
            // Bölge bonusları
            if (regionData.specialties.includes(good.name)) {
                basePrice *= 0.8; // Ucuz
            }
            
            // Şehir büyüklüğü etkisi
            const populationFactor = 1 + (city.population / 10000000);
            
            // Fiyat hesapla
            const price = Math.floor(basePrice * populationFactor * (1 + (Math.random() - 0.5) * good.volatility));
            
            goods[good.name] = {
                price: Math.max(1, price),
                stock: Math.floor(Math.random() * 100) + 20,
                volatility: good.volatility
            };
        });
        
        return goods;
    }
    
    switchTab(tab) {
        // Tab değiştirme mantığı
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        const tabContent = document.getElementById('tab-content');
        
        switch(tab) {
            case 'trade':
                tabContent.innerHTML = this.generateTradeContent(turkeyProvinces[this.currentCity]);
                break;
            case 'vehicles':
                tabContent.innerHTML = this.generateVehiclesContent();
                break;
            case 'business':
                tabContent.innerHTML = this.generateBusinessContent();
                break;
            case 'employees':
                tabContent.innerHTML = this.generateEmployeesContent();
                break;
            case 'online':
                tabContent.innerHTML = this.generateOnlineContent();
                break;
        }
        
        this.currentModal = tab;
        this.soundManager.playClick();
    }
    
    generateOnlineContent() {
        let html = '<div class="online-section">';
        
        // Oyun durumu
        html += `
            <div class="online-status">
                <h3>Online Durum</h3>
                <div class="status-info">
                    <div class="status-item">
                        <span class="status-label">Bağlantı:</span>
                        <span class="status-value ${this.isOnline ? 'online' : 'offline'}">
                            ${this.isOnline ? '🟢 Çevrimiçi' : '🔴 Çevrimdışı'}
                        </span>
                    </div>
                    <div class="status-item">
                        <span class="status-label">Oyuncu Adı:</span>
                        <span class="status-value">${this.playerName || 'Profil Yok'}</span>
                    </div>
                    <div class="status-item">
                        <span class="status-label">IP Adresi:</span>
                        <span class="status-value">${this.localIP}</span>
                    </div>
                    <div class="status-item">
                        <span class="status-label">Oyuncu ID:</span>
                        <span class="status-value">#${this.playerId}</span>
                    </div>
                    <div class="status-item">
                        <span class="status-label">Aktivite:</span>
                        <span class="status-value">${this.getCurrentActivity()}</span>
                    </div>
                </div>
                <div class="online-controls">
                    <button class="online-btn ${this.isOnline ? 'disconnect' : 'connect'}" 
                            onclick="game.toggleOnlineMode()">
                        ${this.isOnline ? '🔴 Bağlantıyı Kes' : '🟢 Bağlan'}
                    </button>
                </div>
            </div>
        `;
        
        // Arkadaşlık istekleri
        if (this.friendRequests.length > 0) {
            html += `
                <div class="friend-requests">
                    <h3>Arkadaşlık İstekleri (${this.friendRequests.length})</h3>
                    <div class="requests-list">
            `;
            
            this.friendRequests.forEach(request => {
                html += `
                    <div class="request-item">
                        <div class="request-info">
                            <span class="request-name">${request.playerName}</span>
                            <span class="request-time">${this.formatTime(request.timestamp)}</span>
                        </div>
                        <div class="request-actions">
                            <button class="accept-btn" onclick="game.acceptFriendRequest(${request.playerId})">✓ Kabul Et</button>
                            <button class="decline-btn" onclick="game.declineFriendRequest(${request.playerId})">✗ Reddet</button>
                        </div>
                    </div>
                `;
            });
            
            html += '</div></div>';
        }
        
        // Arkadaşlar
        if (this.friends.length > 0) {
            html += `
                <div class="friends-section">
                    <h3>Arkadaşlar (${this.friends.length})</h3>
                    <div class="friends-list">
            `;
            
            this.friends.forEach(friend => {
                html += `
                    <div class="friend-item">
                        <div class="friend-info">
                            <span class="friend-name">${friend.name}</span>
                            <span class="friend-since">Eklenme: ${this.formatTime(friend.addedDate)}</span>
                        </div>
                        <div class="friend-actions">
                            <button class="joint-business-btn" onclick="game.showJointBusinessModal(${friend.id})">
                                🏢 Ortak İşletme
                            </button>
                        </div>
                    </div>
                `;
            });
            
            html += '</div></div>';
        }
        
        // Tüm online oyuncular
        html += `
            <div class="all-online-players">
                <h3>Tüm Online Oyuncular (${this.onlinePlayers.length + 1})</h3>
                <div class="players-list">
                    <div class="player-card current-player">
                        <div class="player-avatar">${this.playerProfile?.avatar || '👤'}</div>
                        <div class="player-info">
                            <div class="player-name-main">${this.playerName || 'Sen'} (Sen)</div>
                            <div class="player-details">
                                <span class="player-city">${turkeyProvinces[this.currentCity].name}</span>
                                <span class="player-level-main">Lv.${this.level}</span>
                                <span class="player-money-main">₺${this.money.toLocaleString('tr-TR')}</span>
                                <span class="player-ip">${this.localIP}</span>
                            </div>
                            <div class="player-activity-main">${this.getCurrentActivity()}</div>
                        </div>
                    </div>
        `;
        
        this.onlinePlayers.forEach(player => {
            const isFriend = this.friends.find(f => f.id === player.id);
            const hasRequest = this.friendRequests.find(r => r.playerId === player.id);
            
            html += `
                <div class="player-card ${isFriend ? 'friend' : ''}">
                    <div class="player-avatar">${player.profile?.avatar || '👤'}</div>
                    <div class="player-info">
                        <div class="player-name-main">${player.name} ${player.isLocal ? '🏠' : '🌐'}</div>
                        <div class="player-details">
                            <span class="player-city">${turkeyProvinces[player.city].name}</span>
                            <span class="player-level-main">Lv.${player.level}</span>
                            <span class="player-money-main">₺${player.money.toLocaleString('tr-TR')}</span>
                            <span class="player-ip">${player.ip || 'N/A'}</span>
                        </div>
                        <div class="player-activity-main">${player.activity}</div>
                        <div class="player-actions">
                            ${!isFriend && !hasRequest ? 
                                `<button class="add-friend-btn" onclick="game.sendFriendRequest(${player.id})">➕ Arkadaş Ekle</button>` : 
                                isFriend ? 
                                `<button class="joint-business-btn" onclick="game.showJointBusinessModal(${player.id})">🏢 Ortak İşletme</button>` :
                                `<span class="request-sent">İstek Gönderildi</span>`
                            }
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div></div>';
        
        // Ortak işletmeler
        const jointBusinesses = this.getJointBusinesses();
        if (jointBusinesses.length > 0) {
            html += `
                <div class="joint-businesses">
                    <h3>Ortak İşletmeler (${jointBusinesses.length})</h3>
                    <div class="joint-businesses-list">
            `;
            
            jointBusinesses.forEach(business => {
                const owners = business.owners.map(ownerId => {
                    if (ownerId === this.playerId) return this.playerName;
                    const friend = this.friends.find(f => f.id === ownerId);
                    return friend ? friend.name : 'Bilinmeyen';
                }).join(' + ');
                
                html += `
                    <div class="joint-business-card">
                        <h4>${business.name}</h4>
                        <p>Ortaklar: ${owners}</p>
                        <p>Günlük Gelir: ₺${business.dailyIncome.toLocaleString('tr-TR')}</p>
                        <p>Seviye: ${business.level} | Popülerlik: ${business.popularity}%</p>
                        <div class="business-actions">
                            <button onclick="game.upgradeJointBusiness(${business.id})">Yükselt (₺${business.upgradeCost})</button>
                        </div>
                    </div>
                `;
            });
            
            html += '</div></div>';
        }
        
        // Sunucu bilgisi
        html += `
            <div class="server-info">
                <h3>Sunucu Bilgisi</h3>
                <div class="server-details">
                    <div class="server-item">
                        <span class="server-label">Sunucu:</span>
                        <span class="server-value">Ticaret Sunucu #1</span>
                    </div>
                    <div class="server-item">
                        <span class="server-label">Ping:</span>
                        <span class="server-value">${Math.floor(Math.random() * 50) + 10}ms</span>
                    </div>
                    <div class="server-item">
                        <span class="server-label">Versiyon:</span>
                        <span class="server-value">1.0.0</span>
                    </div>
                    <div class="server-item">
                        <span class="server-label">Son Senkronizasyon:</span>
                        <span class="server-value">Az önce</span>
                    </div>
                    <div class="server-item">
                        <span class="server-label">Local IP:</span>
                        <span class="server-value">${this.localIP}</span>
                    </div>
                </div>
            </div>
        `;
        
        html += '</div>';
        return html;
    }
    
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Az önce';
        if (diff < 3600000) return `${Math.floor(diff / 60000)} dakika önce`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)} saat önce`;
        return `${Math.floor(diff / 86400000)} gün önce`;
    }
    
    showJointBusinessModal(friendId) {
        const friend = this.friends.find(f => f.id === friendId);
        if (!friend) return;
        
        const modal = document.getElementById('joint-business-modal');
        if (!modal) {
            this.createJointBusinessModal();
        }
        
        let html = `
            <h3>${friend.name} ile Ortak İşletme</h3>
            <div class="joint-business-options">
        `;
        
        businessTypes.forEach((business, index) => {
            const playerCost = Math.floor(business.initialCost / 2);
            const canAfford = this.money >= playerCost;
            
            html += `
                <div class="business-option ${canAfford ? 'available' : 'unavailable'}">
                    <h4>${business.name}</h4>
                    <p>Maliyet: ₺${business.initialCost} (Sizin: ₺${playerCost})</p>
                    <p>Günlük Gelir: ₺${business.dailyIncome}</p>
                    <p>Çalışan: ${business.employees}</p>
                    <button onclick="game.createJointBusiness(${friendId}, ${index})" 
                            ${!canAfford ? 'disabled' : ''}>
                        ${canAfford ? 'Kur' : 'Yetersiz Para'}
                    </button>
                </div>
            `;
        });
        
        html += '</div>';
        document.getElementById('joint-business-content').innerHTML = html;
        document.getElementById('joint-business-modal').style.display = 'block';
    }
    
    createJointBusinessModal() {
        const modalHTML = `
            <div id="joint-business-modal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="game.closeJointBusinessModal()">&times;</span>
                    <div id="joint-business-content"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    closeJointBusinessModal() {
        const modal = document.getElementById('joint-business-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    upgradeJointBusiness(businessId) {
        const business = this.businesses.find(b => b.id === businessId);
        if (!business) return;
        
        if (this.money >= business.upgradeCost) {
            this.money -= business.upgradeCost;
            business.level++;
            business.dailyIncome = Math.floor(business.dailyIncome * 1.2);
            business.upgradeCost = Math.floor(business.upgradeCost * 1.5);
            business.sellValue = Math.floor(business.sellValue * 1.3);
            
            this.gainExperience(300);
            this.updateUI();
            this.switchTab('online');
            this.soundManager.playUpgrade();
        }
    }
    
    generateVehiclesContent() {
        let html = '<div class="vehicles-section">';
        
        // Mevcut araçlar
        html += '<h3>Mevcut Araçlar</h3>';
        this.vehicles.forEach((vehicle, index) => {
            html += `
                <div class="vehicle-card">
                    <h4>${vehicle.name}</h4>
                    <p>Kapasite: ${vehicle.cargo} | Durum: ${vehicle.condition}% | Yakıt: ${vehicle.fuel}%</p>
                    <p>Hız: ${vehicle.speed} | Yakıt Tüketimi: ${vehicle.fuelConsumption}</p>
                    <div class="vehicle-actions">
                        <button onclick="game.repairVehicle(${index})">Tamir Et (₺${Math.floor(1000 * (1 - vehicle.condition / 100))})</button>
                        <button onclick="game.refuelVehicle(${index})">Yakıt Doldur (₺${Math.floor(500 * (1 - vehicle.fuel / 100))})</button>
                        <button onclick="game.sellVehicle(${index})">Sat (₺${Math.floor(vehicle.basePrice * vehicle.condition / 100)})</button>
                    </div>
                </div>
            `;
        });
        
        // Yeni araçlar
        html += '<h3>Araç Galerisi</h3>';
        vehicleTypes.forEach((vehicleType, index) => {
            html += `
                <div class="vehicle-card">
                    <h4>${vehicleType.name}</h4>
                    <p>Fiyat: ₺${vehicleType.basePrice} | Kapasite: ${vehicleType.cargo}</p>
                    <p>Hız: ${vehicleType.speed} | Yakıt: ${vehicleType.fuelConsumption}</p>
                    <button onclick="game.buyVehicle(${index})" 
                            ${this.money < vehicleType.basePrice ? 'disabled' : ''}>
                        Satın Al
                    </button>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    generateBusinessContent() {
        let html = '<div class="business-section">';
        
        // Mevcut işletmeler
        html += '<h3>İşletmelerim</h3>';
        this.businesses.forEach((business, index) => {
            const dailyIncome = this.calculateBusinessIncome(business);
            html += `
                <div class="business-card">
                    <h4>${business.name}</h4>
                    <p>Çalışanlar: ${business.employees} | Günlük Gelir: ₺${dailyIncome}</p>
                    <p>Seviye: ${business.level} | Popülerlik: ${business.popularity}%</p>
                    <div class="business-actions">
                        <button onclick="game.upgradeBusiness(${index})">Yükselt (₺${business.upgradeCost})</button>
                        <button onclick="game.hireEmployee(${index})">Çalışan Al (₺${business.hireCost})</button>
                        <button onclick="game.sellBusiness(${index})">Sat (₺${business.sellValue})</button>
                    </div>
                </div>
            `;
        });
        
        // Yeni işletmeler
        html += '<h3>Yeni İşletmeler</h3>';
        businessTypes.forEach((businessType, index) => {
            html += `
                <div class="business-card">
                    <h4>${businessType.name}</h4>
                    <p>Maliyet: ₺${businessType.initialCost} | Günlük Gelir: ₺${businessType.dailyIncome}</p>
                    <p>Çalışan: ${businessType.employees} | Tip: ${businessType.type}</p>
                    <button onclick="game.buyBusiness(${index})"
                            ${this.money < businessType.initialCost ? 'disabled' : ''}>
                        Kur
                    </button>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    generateEmployeesContent() {
        let html = '<div class="employees-section">';
        
        // Mevcut çalışanlar
        html += '<h3>Çalışanlarım</h3>';
        this.employees.forEach((employee, index) => {
            html += `
                <div class="employee-card">
                    <h4>${employee.name}</h4>
                    <p>Pozisyon: ${employee.position} | Maaş: ₺${employee.salary}/gün</p>
                    <p>Verimlilik: ${employee.productivity}% | Memnuniyet: ${employee.satisfaction}%</p>
                    <div class="employee-actions">
                        <button onclick="game.trainEmployee(${index})">Eğit (₺${Math.floor(employee.salary * 10)})</button>
                        <button onclick="game.bonusEmployee(${index})">Bonus (₺${employee.salary})</button>
                        <button onclick="game.fireEmployee(${index})">Kov</button>
                    </div>
                </div>
            `;
        });
        
        // Yeni çalışanlar
        html += '<h3>İş İlanları</h3>';
        for (let i = 0; i < 5; i++) {
            const positions = ['Satış Danışmanı', 'Sürücü', 'Depo Çalışanı', 'Muhasebeci', 'Yönetici'];
            const names = ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma', 'Mustafa', 'Zeynep'];
            const position = positions[Math.floor(Math.random() * positions.length)];
            const name = names[Math.floor(Math.random() * names.length)];
            const salary = Math.floor(Math.random() * 500) + 200;
            
            html += `
                <div class="employee-card">
                    <h4>${name}</h4>
                    <p>Pozisyon: ${position} | Maaş: ₺${salary}/gün</p>
                    <p>Verimlilik: ${Math.floor(Math.random() * 30) + 70}%</p>
                    <button onclick="game.hireNewEmployee('${name}', '${position}', ${salary})"
                            ${this.money < salary * 7 ? 'disabled' : ''}>
                        İşe Al
                    </button>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }
    
    travelToCity(targetCity) {
        if (this.traveling) return;
        
        const distance = this.calculateDistance(this.currentCity, targetCity);
        const travelCost = Math.floor(distance * 10 * this.currentVehicle.fuelConsumption);
        const travelTime = distance / (this.currentVehicle.speed * 100);
        
        if (this.money >= travelCost && this.currentVehicle.fuel >= travelCost / 10) {
            this.traveling = true;
            this.travelFrom = this.currentCity;
            this.travelTo = targetCity;
            this.travelProgress = 0;
            this.travelSpeed = 0.02 / travelTime;
            
            this.money -= travelCost;
            this.currentVehicle.fuel -= travelCost / 10;
            this.updateUI();
            
            this.soundManager.playTravel();
        } else {
            alert("Yolculuk için yeterli paranız veya yakıtınız yok!");
        }
    }
    
    calculateDistance(from, to) {
        const city1 = turkeyProvinces[from];
        const city2 = turkeyProvinces[to];
        return Math.sqrt(Math.pow(city2.x - city1.x, 2) + Math.pow(city2.y - city1.y, 2));
    }
    
    buyGood(goodName, price) {
        const qtyInput = document.getElementById(`qty-${goodName}`);
        const quantity = parseInt(qtyInput.value) || 1;
        const totalCost = price * quantity;
        
        if (this.money >= totalCost && this.currentCargo + quantity <= this.currentVehicle.cargo) {
            this.money -= totalCost;
            this.inventory[goodName] = (this.inventory[goodName] || 0) + quantity;
            this.currentCargo += quantity;
            
            // XP kazan
            this.gainExperience(quantity * 10);
            
            this.updateUI();
            this.openCityMenu(turkeyProvinces[this.currentCity]);
            this.soundManager.playBuy();
        }
    }
    
    sellGood(goodName, price) {
        const qtyInput = document.getElementById(`qty-${goodName}`);
        const quantity = parseInt(qtyInput.value) || 1;
        const owned = this.inventory[goodName] || 0;
        
        if (owned >= quantity) {
            const totalRevenue = price * quantity;
            this.money += totalRevenue;
            this.inventory[goodName] -= quantity;
            this.currentCargo -= quantity;
            
            // XP kazan
            this.gainExperience(quantity * 15);
            
            this.updateUI();
            this.openCityMenu(turkeyProvinces[this.currentCity]);
            this.soundManager.playSell();
        }
    }
    
    addVehicle(vehicleData) {
        this.vehicles.push(vehicleData);
    }
    
    selectVehicle(index) {
        this.currentVehicle = this.vehicles[index];
        this.openCityMenu(turkeyProvinces[this.currentCity]);
    }
    
    buyVehicle(vehicleTypeIndex) {
        const vehicleType = vehicleTypes[vehicleTypeIndex];
        if (this.money >= vehicleType.basePrice) {
            this.money -= vehicleType.basePrice;
            this.addVehicle({
                ...vehicleType,
                id: Date.now(),
                condition: 100,
                fuel: 100,
                location: this.currentCity
            });
            
            this.gainExperience(500);
            this.updateUI();
            this.switchTab('vehicles');
            this.soundManager.playBuy();
        }
    }
    
    repairVehicle(index) {
        const vehicle = this.vehicles[index];
        const cost = Math.floor(1000 * (1 - vehicle.condition / 100));
        
        if (this.money >= cost) {
            this.money -= cost;
            vehicle.condition = 100;
            this.updateUI();
            this.switchTab('vehicles');
            this.soundManager.playRepair();
        }
    }
    
    refuelVehicle(index) {
        const vehicle = this.vehicles[index];
        const cost = Math.floor(500 * (1 - vehicle.fuel / 100));
        
        if (this.money >= cost) {
            this.money -= cost;
            vehicle.fuel = 100;
            this.updateUI();
            this.switchTab('vehicles');
            this.soundManager.playRefuel();
        }
    }
    
    sellVehicle(index) {
        const vehicle = this.vehicles[index];
        const sellPrice = Math.floor(vehicle.basePrice * vehicle.condition / 100);
        
        this.money += sellPrice;
        this.vehicles.splice(index, 1);
        
        if (this.currentVehicle?.id === vehicle.id) {
            this.currentVehicle = this.vehicles[0] || null;
        }
        
        this.updateUI();
        this.switchTab('vehicles');
        this.soundManager.playSell();
    }
    
    buyBusiness(businessTypeIndex) {
        const businessType = businessTypes[businessTypeIndex];
        if (this.money >= businessType.initialCost) {
            this.money -= businessType.initialCost;
            
            this.businesses.push({
                ...businessType,
                id: Date.now(),
                level: 1,
                popularity: 50,
                location: this.currentCity,
                upgradeCost: businessType.initialCost,
                hireCost: businessType.dailyIncome * 10,
                sellValue: Math.floor(businessType.initialCost * 0.8)
            });
            
            this.gainExperience(1000);
            this.updateUI();
            this.switchTab('business');
            this.soundManager.playBuy();
        }
    }
    
    upgradeBusiness(index) {
        const business = this.businesses[index];
        if (this.money >= business.upgradeCost) {
            this.money -= business.upgradeCost;
            business.level++;
            business.dailyIncome = Math.floor(business.dailyIncome * 1.2);
            business.upgradeCost = Math.floor(business.upgradeCost * 1.5);
            business.sellValue = Math.floor(business.sellValue * 1.3);
            
            this.gainExperience(300);
            this.updateUI();
            this.switchTab('business');
            this.soundManager.playUpgrade();
        }
    }
    
    hireEmployee(businessIndex) {
        const business = this.businesses[businessIndex];
        if (this.money >= business.hireCost) {
            this.money -= business.hireCost;
            business.employees++;
            business.dailyIncome = Math.floor(business.dailyIncome * 1.1);
            
            this.gainExperience(200);
            this.updateUI();
            this.switchTab('business');
            this.soundManager.playHire();
        }
    }
    
    sellBusiness(index) {
        const business = this.businesses[index];
        this.money += business.sellValue;
        this.businesses.splice(index, 1);
        
        this.updateUI();
        this.switchTab('business');
        this.soundManager.playSell();
    }
    
    hireNewEmployee(name, position, salary) {
        const hireCost = salary * 7; // 1 haftalık maaş
        if (this.money >= hireCost) {
            this.money -= hireCost;
            
            this.employees.push({
                id: Date.now(),
                name,
                position,
                salary,
                productivity: Math.floor(Math.random() * 30) + 70,
                satisfaction: Math.floor(Math.random() * 30) + 70
            });
            
            this.gainExperience(150);
            this.updateUI();
            this.switchTab('employees');
            this.soundManager.playHire();
        }
    }
    
    fireEmployee(index) {
        this.employees.splice(index, 1);
        this.updateUI();
        this.switchTab('employees');
        this.soundManager.playFire();
    }
    
    trainEmployee(index) {
        const employee = this.employees[index];
        const cost = Math.floor(employee.salary * 10);
        
        if (this.money >= cost) {
            this.money -= cost;
            employee.productivity = Math.min(100, employee.productivity + 10);
            
            this.gainExperience(100);
            this.updateUI();
            this.switchTab('employees');
            this.soundManager.playTrain();
        }
    }
    
    bonusEmployee(index) {
        const employee = this.employees[index];
        
        if (this.money >= employee.salary) {
            this.money -= employee.salary;
            employee.satisfaction = Math.min(100, employee.satisfaction + 15);
            employee.productivity = Math.min(100, employee.productivity + 5);
            
            this.updateUI();
            this.switchTab('employees');
            this.soundManager.playBonus();
        }
    }
    
    calculateBusinessIncome(business) {
        let income = business.dailyIncome;
        
        // Çalışan verimlilik etkisi
        const avgProductivity = this.employees.reduce((sum, emp) => sum + emp.productivity, 0) / Math.max(1, this.employees.length);
        income *= avgProductivity / 100;
        
        // Popülerlik etkisi
        income *= business.popularity / 100;
        
        // Seviye etkisi
        income *= business.level;
        
        return Math.floor(income);
    }
    
    gainExperience(amount) {
        this.experience += amount;
        const requiredExp = this.level * 1000;
        
        if (this.experience >= requiredExp) {
            this.level++;
            this.experience -= requiredExp;
            this.reputation = Math.min(100, this.reputation + 5);
            
            // Level bonusu
            this.money += this.level * 1000;
            
            this.soundManager.playLevelUp();
        }
    }
    
    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        this.currentModal = null;
        this.soundManager.playClick();
    }
    
    updateUI() {
        document.getElementById('money').textContent = this.money.toLocaleString('tr-TR');
        document.getElementById('current-city').textContent = turkeyProvinces[this.currentCity].name;
        document.getElementById('cargo').textContent = `${this.currentCargo}/${this.currentVehicle?.cargo || 0}`;
        
        // Level ve XP
        if (document.getElementById('level-info')) {
            document.getElementById('level-info').textContent = `Seviye ${this.level} (${this.experience}/${this.level * 1000} XP)`;
        }
        
        // Zaman güncelleme
        if (document.getElementById('game-time')) {
            const hours = this.gameTime.getHours().toString().padStart(2, '0');
            const minutes = this.gameTime.getMinutes().toString().padStart(2, '0');
            const day = this.gameTime.getDate().toString().padStart(2, '0');
            const month = (this.gameTime.getMonth() + 1).toString().padStart(2, '0');
            const year = this.gameTime.getFullYear();
            
            document.getElementById('game-time').textContent = `${day}/${month}/${year} ${hours}:${minutes}`;
        }
        
        // Online durumu güncelleme
        if (document.getElementById('online-status')) {
            const onlineStatus = document.getElementById('online-status');
            if (this.isOnline) {
                onlineStatus.textContent = `🟢 Online (${this.onlinePlayers.length + 1} oyuncu)`;
                onlineStatus.classList.remove('offline');
            } else {
                onlineStatus.textContent = '🔴 Offline';
                onlineStatus.classList.add('offline');
            }
        }
        
        // Oyun kontrol butonları
        if (document.getElementById('pause-btn')) {
            document.getElementById('pause-btn').textContent = this.isPaused ? '▶️' : '⏸';
        }
        
        if (document.getElementById('speed-btn')) {
            document.getElementById('speed-btn').textContent = `${this.gameSpeed}x`;
        }
        
        if (document.getElementById('online-btn')) {
            document.getElementById('online-btn').textContent = this.isOnline ? '🔴' : '🌐';
        }
    }
    
    updateEconomy() {
        // İşletme gelirleri
        let totalIncome = 0;
        this.businesses.forEach(business => {
            totalIncome += this.calculateBusinessIncome(business);
        });
        
        // Çalışan maaşları
        let totalExpenses = 0;
        this.employees.forEach(employee => {
            totalExpenses += employee.salary;
        });
        
        // Günlük kar/zarar
        const dailyProfit = totalIncome - totalExpenses;
        this.money += dailyProfit;
        
        // Araç bakım maliyetleri
        this.vehicles.forEach(vehicle => {
            vehicle.condition = Math.max(50, vehicle.condition - 0.1);
            vehicle.fuel = Math.max(0, vehicle.fuel - 0.05);
        });
        
        // İşletme popülerlik değişimi
        this.businesses.forEach(business => {
            business.popularity += (Math.random() - 0.5) * 2;
            business.popularity = Math.max(20, Math.min(100, business.popularity));
        });
        
        // Çalışan memnuniyet değişimi
        this.employees.forEach(employee => {
            employee.satisfaction += (Math.random() - 0.5) * 1;
            employee.satisfaction = Math.max(30, Math.min(100, employee.satisfaction));
        });
    }
    
    draw() {
        // Temizle
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Arka plan
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98D8C8');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Canvas transform
        this.ctx.save();
        this.ctx.translate(this.offsetX, this.offsetY);
        this.ctx.scale(this.zoom, this.zoom);
        
        // Türkiye haritası sınırları
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(200, 50, 600, 400);
        
        // Bölge renklendirme
        const regionColors = {
            'Marmara': 'rgba(255, 200, 200, 0.3)',
            'Ege': 'rgba(200, 255, 200, 0.3)',
            'Akdeniz': 'rgba(200, 200, 255, 0.3)',
            'İç Anadolu': 'rgba(255, 255, 200, 0.3)',
            'Karadeniz': 'rgba(200, 255, 255, 0.3)',
            'Doğu Anadolu': 'rgba(255, 200, 255, 0.3)',
            'Güneydoğu': 'rgba(255, 255, 255, 0.3)'
        };
        
        // Şehirleri çiz
        turkeyProvinces.forEach((city, index) => {
            const isCurrentCity = index === this.currentCity;
            const isHovered = index === this.hoveredCity;
            
            // Bölge arka planı
            if (regionColors[city.region]) {
                this.ctx.fillStyle = regionColors[city.region];
                this.ctx.beginPath();
                this.ctx.arc(city.x, city.y, 25, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            // Şehir daire
            this.ctx.beginPath();
            this.ctx.arc(city.x, city.y, isHovered ? 12 : 10, 0, Math.PI * 2);
            
            if (isCurrentCity) {
                this.ctx.fillStyle = '#FFD700';
            } else if (isHovered) {
                this.ctx.fillStyle = '#FF6B6B';
            } else {
                this.ctx.fillStyle = '#4ECDC4';
            }
            
            this.ctx.fill();
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Online oyuncu sayısı
            if (this.isOnline) {
                const onlineCount = this.getOnlinePlayersInCity(index).length;
                if (onlineCount > 0) {
                    this.ctx.fillStyle = '#FF6B6B';
                    this.ctx.beginPath();
                    this.ctx.arc(city.x + 8, city.y - 8, 6, 0, Math.PI * 2);
                    this.ctx.fill();
                    
                    this.ctx.fillStyle = 'white';
                    this.ctx.font = 'bold 10px Arial';
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText(onlineCount.toString(), city.x + 8, city.y - 5);
                }
            }
            
            // Şehir adı (zoom'a göre)
            if (this.zoom > 0.7) {
                this.ctx.fillStyle = 'black';
                this.ctx.font = `${Math.max(8, 10 * this.zoom)}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.fillText(city.name, city.x, city.y - 15);
            }
        });
        
        // Yolculuk animasyonu
        if (this.traveling && this.travelFrom !== null && this.travelTo !== null) {
            const fromCity = turkeyProvinces[this.travelFrom];
            const toCity = turkeyProvinces[this.travelTo];
            
            const x = fromCity.x + (toCity.x - fromCity.x) * this.travelProgress;
            const y = fromCity.y + (toCity.y - fromCity.y) * this.travelProgress;
            
            // Araç ikonu
            this.ctx.beginPath();
            this.ctx.arc(x, y, 8, 0, Math.PI * 2);
            this.ctx.fillStyle = '#FF6B6B';
            this.ctx.fill();
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
        
        this.ctx.restore();
        
        // UI katmanı
        this.drawUI();
    }
    
    drawUI() {
        // Üst bilgi paneli
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(10, 10, 450, 150);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Para: ₺${this.money.toLocaleString('tr-TR')}`, 20, 35);
        this.ctx.fillText(`Şehir: ${turkeyProvinces[this.currentCity].name}`, 20, 60);
        this.ctx.fillText(`Yük: ${this.currentCargo}/${this.currentVehicle?.cargo || 0}`, 20, 85);
        this.ctx.fillText(`Seviye: ${this.level} (${this.experience}/${this.level * 1000} XP)`, 20, 110);
        
        // Zaman ve online durumu
        this.ctx.font = '14px Arial';
        const hours = this.gameTime.getHours().toString().padStart(2, '0');
        const minutes = this.gameTime.getMinutes().toString().padStart(2, '0');
        this.ctx.fillText(`Saat: ${hours}:${minutes}`, 20, 135);
        
        if (this.isOnline) {
            this.ctx.fillStyle = '#4CAF50';
            this.ctx.fillText(`🟢 Online (${this.onlinePlayers.length + 1} oyuncu)`, 250, 35);
        } else {
            this.ctx.fillStyle = '#f44336';
            this.ctx.fillText('🔴 Offline', 250, 35);
        }
        
        // Oyun hız kontrolü
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Hız: ${this.gameSpeed}x`, 250, 60);
        this.ctx.fillText(this.isPaused ? '⏸ Duraklatıldı' : '▶️ Oynuyor', 250, 85);
        
        // Araç bilgisi
        if (this.currentVehicle) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillRect(10, 170, 300, 80);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.fillText(`Araç: ${this.currentVehicle.name}`, 20, 195);
            this.ctx.font = '12px Arial';
            this.ctx.fillText(`Durum: ${this.currentVehicle.condition}% | Yakıt: ${this.currentVehicle.fuel}%`, 20, 215);
            this.ctx.fillText(`Hız: ${this.currentVehicle.speed}x`, 20, 235);
        }
        
        // Zoom kontrolü
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(this.canvas.width - 110, 10, 100, 120);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Zoom: ${(this.zoom * 100).toFixed(0)}%`, this.canvas.width - 60, 35);
        this.ctx.fillText('Scroll: Zoom', this.canvas.width - 60, 55);
        this.ctx.fillText('Drag: Move', this.canvas.width - 60, 75);
        
        // Zaman kontrol butonları
        this.ctx.fillText('Zaman:', this.canvas.width - 60, 95);
        this.ctx.font = '12px Arial';
        this.ctx.fillText('1x 2x 5x', this.canvas.width - 60, 115);
        
        // Yolculuk bilgisi
        if (this.traveling) {
            const progressWidth = 300;
            const progressHeight = 20;
            const progressX = (this.canvas.width - progressWidth) / 2;
            const progressY = this.canvas.height - 50;
            
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillRect(progressX - 10, progressY - 30, progressWidth + 20, progressHeight + 40);
            
            // Progress bar
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.fillRect(progressX, progressY, progressWidth, progressHeight);
            
            this.ctx.fillStyle = '#4CAF50';
            this.ctx.fillRect(progressX, progressY, progressWidth * this.travelProgress, progressHeight);
            
            // Yolculuk metni
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            const fromCity = turkeyProvinces[this.travelFrom].name;
            const toCity = turkeyProvinces[this.travelTo].name;
            this.ctx.fillText(`${fromCity} → ${toCity}`, this.canvas.width / 2, progressY - 10);
        }
        
        // Ekonomi özeti
        if (!this.traveling) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillRect(10, this.canvas.height - 100, 350, 90);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'left';
            
            const totalIncome = this.businesses.reduce((sum, b) => sum + this.calculateBusinessIncome(b), 0);
            const totalExpenses = this.employees.reduce((sum, e) => sum + e.salary, 0);
            
            this.ctx.fillText(`İşletmeler: ${this.businesses.length} | Çalışanlar: ${this.employees.length}`, 20, this.canvas.height - 75);
            this.ctx.fillText(`Günlük Gelir: ₺${totalIncome.toLocaleString('tr-TR')}`, 20, this.canvas.height - 55);
            this.ctx.fillText(`Günlük Gider: ₺${totalExpenses.toLocaleString('tr-TR')}`, 20, this.canvas.height - 35);
            this.ctx.fillText(`Net Kâr: ₺${(totalIncome - totalExpenses).toLocaleString('tr-TR')}`, 20, this.canvas.height - 15);
        }
        
        // Online oyuncu göstergesi
        if (this.isOnline && this.onlinePlayers.length > 0) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillRect(this.canvas.width - 160, 140, 150, 80);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Online Oyuncular', this.canvas.width - 85, 160);
            
            // En aktif şehirler
            const cityCounts = {};
            this.onlinePlayers.forEach(player => {
                cityCounts[player.city] = (cityCounts[player.city] || 0) + 1;
            });
            
            const topCities = Object.entries(cityCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3);
            
            topCities.forEach(([cityIndex, count], index) => {
                const city = turkeyProvinces[cityIndex];
                this.ctx.fillText(`${city.name}: ${count}`, this.canvas.width - 85, 180 + index * 15);
            });
        }
    }
    
    animate() {
        if (!this.gameRunning) return;
        
        requestAnimationFrame(() => this.animate());
        
        // Yolculuk güncelleme
        if (this.traveling) {
            this.travelProgress += this.travelSpeed;
            
            if (this.travelProgress >= 1) {
                this.traveling = false;
                this.currentCity = this.travelTo;
                this.travelFrom = null;
                this.travelTo = null;
                this.travelProgress = 0;
                
                if (this.currentVehicle) {
                    this.currentVehicle.location = this.currentCity;
                }
                
                this.updateUI();
                this.soundManager.playArrival();
            }
        }
        
        // Ekonomi güncelleme (her saniye)
        if (!this.lastEconomyUpdate || Date.now() - this.lastEconomyUpdate > 1000) {
            this.updateEconomy();
            this.updateUI();
            this.lastEconomyUpdate = Date.now();
        }
        
        this.draw();
    }
}

// Oyunu başlat
let game;
window.addEventListener('load', () => {
    game = new AdvancedTradeSimulator();
});
