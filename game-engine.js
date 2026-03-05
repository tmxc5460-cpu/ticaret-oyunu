// --- OYUN VERİLERİ ---
const player = {
    money: 100000,
    btc: 0,
    debt: 0,
    diamonds: 0,
    btcPrice: 65000,
    location: "İstanbul, Türkiye"
};

// --- KRİPTO BORSA ALGORİTMASI ---
setInterval(() => {
    // Bitcoin fiyatı her 2 saniyede bir rastgele dalgalanır
    const change = (Math.random() * 2000 - 1000); 
    player.btcPrice = Math.max(20000, Math.floor(player.btcPrice + change));
    
    // Eğer ekranda fiyat etiketi varsa güncelle
    const priceTag = document.getElementById('btc-live-price');
    if(priceTag) priceTag.innerText = player.btcPrice.toLocaleString();
}, 2000);

// --- ARAYÜZ MOTORU ---
const ui = {
    render: function(module) {
        const container = document.getElementById('app-container');
        let html = "";

        switch(module) {
            case 'world':
                html = `
                    <div class="panel">
                        <h3>🌍 Dünya Turu (195 Ülke)</h3>
                        <input type="text" id="loc-input" placeholder="Ülke, İl veya İlçe yaz..." class="mobile-input">
                        <button onclick="actions.travel()" class="btn-buy" style="width:100%; margin-top:10px;">GİT (2.000 Birim)</button>
                    </div>`;
                break;

            case 'crypto':
                html = `
                    <div class="panel">
                        <h3>📈 Bitcoin Borsası</h3>
                        <div class="crypto-card">
                            <span>BTC/BIRIM</span>
                            <strong style="color:#f7931a">₿ <span id="btc-live-price">${player.btcPrice}</span></strong>
                        </div>
                        <div class="trade-actions">
                            <button onclick="actions.tradeBTC('buy')" class="btn-buy">BTC AL</button>
                            <button onclick="actions.tradeBTC('sell')" class="btn-sell">BTC SAT</button>
                        </div>
                    </div>`;
                break;

            case 'shop':
                html = `
                    <div class="panel">
                        <h3>💎 Elmas & Paket Dükkanı</h3>
                        <div class="shop-item">
                            <span>1.000.000 Oyun Parası</span>
                            <button onclick="actions.realBuy('Para Paketi', 49.99)" class="btn-premium">₺49,99</button>
                        </div>
                        <div class="shop-item">
                            <span>100 Elmas (VIP)</span>
                            <button onclick="actions.realBuy('Elmas Paketi', 99.99)" class="btn-premium">₺99,99</button>
                        </div>
                    </div>`;
                break;

            case 'bank':
                html = `
                    <div class="panel">
                        <h3>🏦 Bankacılık</h3>
                        <p>Borç: ${player.debt.toLocaleString()} Birim</p>
                        <button onclick="actions.getLoan()" class="btn-buy" style="width:100%">50.000 Birim Kredi Çek</button>
                    </div>`;
                break;
        }
        container.innerHTML = html;
        this.updateStats();
    },

    updateStats: function() {
        document.getElementById('p-money').innerText = player.money.toLocaleString();
        document.getElementById('p-btc').innerText = player.btc.toFixed(4);
        document.getElementById('p-location').innerText = player.location;
    }
};

// --- OYUN AKSİYONLARI ---
const actions = {
    tradeBTC: function(type) {
        const amount = 0.1; // Her tıkta 0.1 BTC işlem yapar
        const cost = player.btcPrice * amount;

        if(type === 'buy') {
            if(player.money >= cost) {
                player.money -= cost;
                player.btc += amount;
            } else { alert("Yeterli paran yok knk!"); }
        } else {
            if(player.btc >= amount) {
                player.btc -= amount;
                player.money += cost;
            } else { alert("Satacak BTC'n yok knk!"); }
        }
        ui.updateStats();
        ui.render('crypto');
    },

    travel: function() {
        const target = document.getElementById('loc-input').value;
        if(target.length < 2) return alert("Nereye gidiyoruz?");
        if(player.money < 2000) return alert("Bilet parası yok!");
        
        player.money -= 2000;
        player.location = target;
        ui.updateStats();
        alert(target + " konumuna varıldı!");
    },

    getLoan: function() {
        player.money += 50000;
        player.debt += 60000; // %20 faiz
        ui.updateStats();
        ui.render('bank');
    },

    realBuy: function(item, price) {
        alert(item + " için ödeme sayfasına gidiliyor... Fiyat: " + price + " TL");
        // Burada ödeme başarılı simülasyonu:
        if(item.includes('Para')) player.money += 1000000;
        else player.diamonds += 100;
        ui.updateStats();
    }
};

// Oyunu Başlat
document.getElementById('start-game-btn').onclick = () => {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('game-screen').classList.remove('hidden');
    ui.render('world');
};