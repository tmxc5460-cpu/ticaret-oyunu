class TradeSimulator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameRunning = false;
        
        // Oyun durumu
        this.money = 1000;
        this.currentCity = 0;
        this.inventory = {};
        this.maxCargo = 10;
        this.currentCargo = 0;
        
        // Şehirler
        this.cities = [
            {
                name: "İstanbul",
                x: 400,
                y: 200,
                description: "Ticaret merkezi, her şey bulunur",
                goods: {
                    "Buğday": { price: 10, stock: 100, volatility: 0.1 },
                    "İpek": { price: 50, stock: 50, volatility: 0.2 },
                    "Baharat": { price: 30, stock: 30, volatility: 0.3 }
                }
            },
            {
                name: "Ankara",
                x: 300,
                y: 150,
                description: "Başkent, devlet malzemeleri",
                goods: {
                    "Buğday": { price: 15, stock: 80, volatility: 0.1 },
                    "Demir": { price: 25, stock: 60, volatility: 0.15 },
                    "Kömür": { price: 20, stock: 70, volatility: 0.1 }
                }
            },
            {
                name: "İzmir",
                x: 350,
                y: 300,
                description: "Liman şehri, deniz ürünleri",
                goods: {
                    "Tuz": { price: 8, stock: 90, volatility: 0.2 },
                    "Zeytin": { price: 40, stock: 40, volatility: 0.25 },
                    "Balık": { price: 35, stock: 60, volatility: 0.3 }
                }
            },
            {
                name: "Trabzon",
                x: 500,
                y: 100,
                description: "Karadeniz, fındık ve çay",
                goods: {
                    "Fındık": { price: 45, stock: 35, volatility: 0.2 },
                    "Çay": { price: 25, stock: 50, volatility: 0.15 },
                    "Bal": { price: 60, stock: 25, volatility: 0.3 }
                }
            },
            {
                name: "Gaziantep",
                x: 200,
                y: 250,
                description: "Baklava ve antikalar",
                goods: {
                    "Antika": { price: 100, stock: 10, volatility: 0.4 },
                    "Pistach": { price: 55, stock: 30, volatility: 0.2 },
                    "Baharat": { price: 25, stock: 40, volatility: 0.25 }
                }
            }
        ];
        
        // Yolculuk durumu
        this.traveling = false;
        this.travelProgress = 0;
        this.travelFrom = null;
        this.travelTo = null;
        this.travelSpeed = 0.02;
        
        // Grafik
        this.selectedCity = null;
        this.hoveredCity = null;
        
        this.init();
    }
    
    init() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
        this.setupEventListeners();
        this.setupUI();
        
        // Başlangıç envanteri
        this.inventory = {};
        Object.keys(this.cities[0].goods).forEach(good => {
            this.inventory[good] = 0;
        });
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setupEventListeners() {
        // Canvas olayları
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleCanvasHover(e));
        
        // Modal olayları
        const modal = document.getElementById('trade-modal');
        const closeBtn = document.querySelector('.close');
        
        closeBtn.addEventListener('click', () => this.closeModal());
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    setupUI() {
        const startBtn = document.getElementById('start-btn');
        startBtn.addEventListener('click', () => this.startGame());
    }
    
    startGame() {
        this.gameRunning = true;
        document.getElementById('start-btn').style.display = 'none';
        this.updateUI();
        this.animate();
    }
    
    handleCanvasClick(e) {
        if (!this.gameRunning || this.traveling) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Şehir kontrolü
        for (let i = 0; i < this.cities.length; i++) {
            const city = this.cities[i];
            const distance = Math.sqrt(Math.pow(x - city.x, 2) + Math.pow(y - city.y, 2));
            
            if (distance < 30) {
                if (i === this.currentCity) {
                    // Kendi şehrinde - ticaret modalını aç
                    this.openTradeModal(city);
                } else {
                    // Başka şehre git
                    this.travelToCity(i);
                }
                break;
            }
        }
    }
    
    handleCanvasHover(e) {
        if (!this.gameRunning || this.traveling) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.hoveredCity = null;
        
        for (let i = 0; i < this.cities.length; i++) {
            const city = this.cities[i];
            const distance = Math.sqrt(Math.pow(x - city.x, 2) + Math.pow(y - city.y, 2));
            
            if (distance < 30) {
                this.hoveredCity = i;
                this.canvas.style.cursor = 'pointer';
                return;
            }
        }
        
        this.canvas.style.cursor = 'default';
    }
    
    travelToCity(targetCity) {
        if (this.traveling) return;
        
        this.traveling = true;
        this.travelFrom = this.currentCity;
        this.travelTo = targetCity;
        this.travelProgress = 0;
        
        // Seyahat maliyeti
        const distance = this.calculateDistance(this.travelFrom, this.travelTo);
        const travelCost = Math.floor(distance * 2);
        
        if (this.money >= travelCost) {
            this.money -= travelCost;
            this.updateUI();
        } else {
            this.traveling = false;
            alert("Yolculuk için yeterli paranız yok!");
            return;
        }
    }
    
    calculateDistance(from, to) {
        const city1 = this.cities[from];
        const city2 = this.cities[to];
        return Math.sqrt(Math.pow(city2.x - city1.x, 2) + Math.pow(city2.y - city1.y, 2));
    }
    
    openTradeModal(city) {
        const modal = document.getElementById('trade-modal');
        const modalTitle = document.getElementById('modal-title');
        const goodsList = document.getElementById('goods-list');
        
        modalTitle.textContent = `${city.name} - Ticaret Merkezi`;
        
        // Şehir bilgisi
        let html = `
            <div class="city-info">
                <div class="city-name">${city.name}</div>
                <div class="city-description">${city.description}</div>
            </div>
        `;
        
        // Mallar
        Object.entries(city.goods).forEach(([goodName, goodData]) => {
            const currentPrice = this.calculateCurrentPrice(goodData);
            const owned = this.inventory[goodName] || 0;
            const canBuy = this.money >= currentPrice && this.currentCargo < this.maxCargo;
            const canSell = owned > 0;
            
            html += `
                <div class="goods-item">
                    <div class="goods-header">
                        <span class="goods-name">${goodName}</span>
                        <span class="goods-price">${currentPrice} ₺</span>
                    </div>
                    <div class="goods-info">
                        Stok: ${goodData.stock} | Sahip: ${owned} | Volatilite: ${(goodData.volatility * 100).toFixed(0)}%
                    </div>
                    <div class="trade-buttons">
                        <button class="buy-btn" ${!canBuy ? 'disabled' : ''} 
                                onclick="game.buyGood('${goodName}', ${currentPrice})">
                            Al
                        </button>
                        <button class="sell-btn" ${!canSell ? 'disabled' : ''} 
                                onclick="game.sellGood('${goodName}', ${currentPrice})">
                            Sat
                        </button>
                    </div>
                </div>
            `;
        });
        
        goodsList.innerHTML = html;
        modal.style.display = 'block';
    }
    
    closeModal() {
        document.getElementById('trade-modal').style.display = 'none';
    }
    
    calculateCurrentPrice(goodData) {
        const volatility = goodData.volatility;
        const basePrice = goodData.price;
        const randomFactor = 1 + (Math.random() - 0.5) * volatility;
        return Math.floor(basePrice * randomFactor);
    }
    
    buyGood(goodName, price) {
        if (this.money >= price && this.currentCargo < this.maxCargo) {
            this.money -= price;
            this.inventory[goodName] = (this.inventory[goodName] || 0) + 1;
            this.currentCargo++;
            
            // Stok azalt
            const city = this.cities[this.currentCity];
            if (city.goods[goodName]) {
                city.goods[goodName].stock--;
            }
            
            this.updateUI();
            this.openTradeModal(city); // Modalı yenile
        }
    }
    
    sellGood(goodName, price) {
        if (this.inventory[goodName] > 0) {
            this.money += price;
            this.inventory[goodName]--;
            this.currentCargo--;
            
            // Stok artır
            const city = this.cities[this.currentCity];
            if (city.goods[goodName]) {
                city.goods[goodName].stock++;
            }
            
            this.updateUI();
            this.openTradeModal(city); // Modalı yenile
        }
    }
    
    updateUI() {
        document.getElementById('money').textContent = this.money;
        document.getElementById('current-city').textContent = this.cities[this.currentCity].name;
        document.getElementById('cargo').textContent = this.currentCargo;
    }
    
    updatePrices() {
        // Fiyatları güncelle (volatilite)
        this.cities.forEach(city => {
            Object.values(city.goods).forEach(good => {
                if (Math.random() < 0.1) { // %10 ihtimalle fiyat değişir
                    good.price = Math.max(5, good.price * (1 + (Math.random() - 0.5) * good.volatility));
                }
            });
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
        
        // Yollar çiz
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        
        for (let i = 0; i < this.cities.length; i++) {
            for (let j = i + 1; j < this.cities.length; j++) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.cities[i].x, this.cities[i].y);
                this.ctx.lineTo(this.cities[j].x, this.cities[j].y);
                this.ctx.stroke();
            }
        }
        
        this.ctx.setLineDash([]);
        
        // Şehirleri çiz
        this.cities.forEach((city, index) => {
            const isCurrentCity = index === this.currentCity;
            const isHovered = index === this.hoveredCity;
            
            // Şehir daire
            this.ctx.beginPath();
            this.ctx.arc(city.x, city.y, isHovered ? 35 : 30, 0, Math.PI * 2);
            
            if (isCurrentCity) {
                this.ctx.fillStyle = '#FFD700';
            } else if (isHovered) {
                this.ctx.fillStyle = '#FF6B6B';
            } else {
                this.ctx.fillStyle = '#4ECDC4';
            }
            
            this.ctx.fill();
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Şehir adı
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(city.name, city.x, city.y - 40);
        });
        
        // Yolculuk animasyonu
        if (this.traveling && this.travelFrom !== null && this.travelTo !== null) {
            const fromCity = this.cities[this.travelFrom];
            const toCity = this.cities[this.travelTo];
            
            const x = fromCity.x + (toCity.x - fromCity.x) * this.travelProgress;
            const y = fromCity.y + (toCity.y - fromCity.y) * this.travelProgress;
            
            // Yolcu gemisi
            this.ctx.beginPath();
            this.ctx.arc(x, y, 10, 0, Math.PI * 2);
            this.ctx.fillStyle = '#FF6B6B';
            this.ctx.fill();
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // İlerleme çubuğu
            const progressWidth = 200;
            const progressHeight = 10;
            const progressX = (this.canvas.width - progressWidth) / 2;
            const progressY = this.canvas.height - 50;
            
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(progressX, progressY, progressWidth, progressHeight);
            
            this.ctx.fillStyle = '#4CAF50';
            this.ctx.fillRect(progressX, progressY, progressWidth * this.travelProgress, progressHeight);
            
            // Yolculuk metni
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                `${fromCity.name} → ${toCity.name}`,
                this.canvas.width / 2,
                progressY - 10
            );
        }
        
        // Oyun bilgisi
        if (!this.traveling) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(20, this.canvas.height - 80, 300, 60);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = '14px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`Mevcut Şehir: ${this.cities[this.currentCity].name}`, 30, this.canvas.height - 55);
            this.ctx.fillText(`Para: ${this.money} ₺ | Yük: ${this.currentCargo}/${this.maxCargo}`, 30, this.canvas.height - 35);
            this.ctx.fillText('Şehre tıkla: Ticaret | Diğer şehir: Yolculuk', 30, this.canvas.height - 15);
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
                
                // Fiyatları güncelle
                this.updatePrices();
                this.updateUI();
            }
        }
        
        this.draw();
    }
}

// Oyunu başlat
let game;
window.addEventListener('load', () => {
    game = new TradeSimulator();
});
