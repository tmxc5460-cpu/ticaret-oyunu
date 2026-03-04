// Türkiye 81 İli ve Koordinatları
const turkeyProvinces = [
    { name: "Adana", x: 520, y: 380, region: "Akdeniz", population: 2200000, economy: "tarim, sanayi, ticaret" },
    { name: "Adıyaman", x: 580, y: 320, region: "Güneydoğu", population: 750000, economy: "tarim, hayvancilik" },
    { name: "Afyonkarahisar", x: 380, y: 280, region: "Ege", population: 740000, economy: "tarim, madencilik" },
    { name: "Ağrı", x: 700, y: 180, region: "Doğu Anadolu", population: 530000, economy: "hayvancilik, tarim" },
    { name: "Aksaray", x: 460, y: 260, region: "İç Anadolu", population: 420000, economy: "tarim, sanayi" },
    { name: "Amasya", x: 580, y: 180, region: "Karadeniz", population: 350000, economy: "tarim, turizm" },
    { name: "Ankara", x: 440, y: 220, region: "İç Anadolu", population: 5500000, economy: "hizmet, sanayi, teknoloji" },
    { name: "Antalya", x: 440, y: 400, region: "Akdeniz", population: 2500000, economy: "turizm, tarim, ticaret" },
    { name: "Artvin", x: 680, y: 120, region: "Karadeniz", population: 180000, economy: "tarim, balikcilik" },
    { name: "Aydın", x: 400, y: 340, region: "Ege", population: 1100000, economy: "tarim, turizm, sanayi" },
    { name: "Balıkesir", x: 360, y: 260, region: "Marmara", population: 1250000, economy: "tarim, sanayi, turizm" },
    { name: "Bartın", x: 520, y: 140, region: "Karadeniz", population: 200000, economy: "madencilik, ormancilik" },
    { name: "Batman", x: 660, y: 340, region: "Güneydoğu", population: 630000, economy: "petrol, sanayi" },
    { name: "Bayburt", x: 660, y: 140, region: "Karadeniz", population: 80000, economy: "tarim, hayvancilik" },
    { name: "Bilecik", x: 380, y: 220, region: "Marmara", population: 225000, economy: "sanayi, tarim" },
    { name: "Bingöl", x: 640, y: 260, region: "Doğu Anadolu", population: 270000, economy: "hayvancilik, tarim" },
    { name: "Bitlis", x: 660, y: 300, region: "Doğu Anadolu", population: 350000, economy: "tarim, hayvancilik" },
    { name: "Bolu", x: 460, y: 180, region: "Karadeniz", population: 320000, economy: "sanayi, turizm" },
    { name: "Burdur", x: 420, y: 360, region: "Akdeniz", population: 270000, economy: "tarim, gida" },
    { name: "Bursa", x: 380, y: 240, region: "Marmara", population: 3000000, economy: "sanayi, ticaret, otomotiv" },
    { name: "Çanakkale", x: 340, y: 220, region: "Marmara", population: 550000, economy: "tarim, turizm, sanayi" },
    { name: "Çankırı", x: 480, y: 180, region: "Karadeniz", population: 200000, economy: "tarim, madencilik" },
    { name: "Çorum", x: 560, y: 180, region: "Karadeniz", population: 550000, economy: "sanayi, tarim" },
    { name: "Denizli", x: 400, y: 320, region: "Ege", population: 1050000, economy: "tekstil, tarim, turizm" },
    { name: "Diyarbakır", x: 640, y: 320, region: "Güneydoğu", population: 1700000, economy: "tarim, sanayi, ticaret" },
    { name: "Düzce", x: 480, y: 160, region: "Karadeniz", population: 400000, economy: "sanayi, ormancilik" },
    { name: "Edirne", x: 320, y: 180, region: "Marmara", population: 400000, economy: "tarim, ticaret" },
    { name: "Elazığ", x: 620, y: 280, region: "Doğu Anadolu", population: 600000, economy: "sanayi, tarim" },
    { name: "Erzincan", x: 620, y: 200, region: "Doğu Anadolu", population: 230000, economy: "tarim, hayvancilik" },
    { name: "Erzurum", x: 660, y: 200, region: "Doğu Anadolu", population: 770000, economy: "turizm, hayvancilik" },
    { name: "Eskişehir", x: 400, y: 220, region: "İç Anadolu", population: 900000, economy: "sanayi, eğitim, havacilik" },
    { name: "Gaziantep", x: 560, y: 340, region: "Güneydoğu", population: 2100000, economy: "sanayi, ticaret, gida" },
    { name: "Giresun", x: 620, y: 140, region: "Karadeniz", population: 450000, economy: "tarim, balikcilik" },
    { name: "Gümüşhane", x: 640, y: 160, region: "Karadeniz", population: 130000, economy: "madencilik, tarim" },
    { name: "Hakkâri", x: 680, y: 340, region: "Güneydoğu", population: 280000, economy: "hayvancilik, tarim" },
    { name: "Hatay", x: 540, y: 380, region: "Akdeniz", population: 1600000, economy: "ticaret, tarim, sanayi" },
    { name: "Iğdır", x: 720, y: 180, region: "Doğu Anadolu", population: 200000, economy: "tarim, hayvancilik" },
    { name: "Isparta", x: 420, y: 340, region: "Akdeniz", population: 450000, economy: "tarim, gida" },
    { name: "İstanbul", x: 360, y: 200, region: "Marmara", population: 16000000, economy: "ticaret, finans, turizm, teknoloji" },
    { name: "İzmir", x: 380, y: 320, region: "Ege", population: 4500000, economy: "liman, sanayi, ticaret, turizm" },
    { name: "Kahramanmaraş", x: 560, y: 320, region: "Akdeniz", population: 1150000, economy: "sanayi, tarim, gida" },
    { name: "Karabük", x: 520, y: 160, region: "Karadeniz", population: 250000, economy: "demir-çelik, sanayi" },
    { name: "Karaman", x: 460, y: 320, region: "Akdeniz", population: 280000, economy: "tarim, gida" },
    { name: "Kars", x: 700, y: 140, region: "Doğu Anadolu", population: 290000, economy: "hayvancilik, tarim, turizm" },
    { name: "Kastamonu", x: 540, y: 140, region: "Karadeniz", population: 380000, economy: "ormancilik, tarim" },
    { name: "Kayseri", x: 500, y: 260, region: "İç Anadolu", population: 1400000, economy: "sanayi, ticaret, havacilik" },
    { name: "Kırıkkale", x: 460, y: 200, region: "İç Anadolu", population: 280000, economy: "sanayi, tarim" },
    { name: "Kırklareli", x: 340, y: 160, region: "Marmara", population: 350000, economy: "tarim, sanayi" },
    { name: "Kırşehir", x: 480, y: 220, region: "İç Anadolu", population: 250000, economy: "tarim, hayvancilik" },
    { name: "Kilis", x: 560, y: 360, region: "Güneydoğu", population: 140000, economy: "tarim, ticaret" },
    { name: "Kocaeli", x: 380, y: 200, region: "Marmara", population: 2000000, economy: "sanayi, otomotiv, kimya" },
    { name: "Konya", x: 440, y: 280, region: "İç Anadolu", population: 2200000, economy: "tarim, sanayi, ticaret" },
    { name: "Kütahya", x: 380, y: 260, region: "Ege", population: 290000, economy: "seramik, madencilik, sanayi" },
    { name: "Malatya", x: 600, y: 280, region: "Doğu Anadolu", population: 820000, economy: "tarim, kayisi, sanayi" },
    { name: "Manisa", x: 380, y: 300, region: "Ege", population: 1450000, economy: "sanayi, tarim, madencilik" },
    { name: "Mardin", x: 660, y: 340, region: "Güneydoğu", population: 850000, economy: "tarim, ticaret, turizm" },
    { name: "Mersin", x: 500, y: 380, region: "Akdeniz", population: 1900000, economy: "liman, sanayi, tarim, ticaret" },
    { name: "Muğla", x: 400, y: 360, region: "Ege", population: 1050000, economy: "turizm, tarim, sanayi" },
    { name: "Muş", x: 660, y: 240, region: "Doğu Anadolu", population: 420000, economy: "hayvancilik, tarim" },
    { name: "Nevşehir", x: 480, y: 240, region: "İç Anadolu", population: 310000, economy: "turizm, tarim" },
    { name: "Niğde", x: 480, y: 280, region: "İç Anadolu", population: 370000, economy: "tarim, madencilik" },
    { name: "Ordu", x: 620, y: 120, region: "Karadeniz", population: 780000, economy: "tarim, balikcilik, fındik" },
    { name: "Osmaniye", x: 540, y: 360, region: "Akdeniz", population: 550000, economy: "tarim, sanayi" },
    { name: "Rize", x: 660, y: 120, region: "Karadeniz", population: 350000, economy: "çay, tarim, turizm" },
    { name: "Sakarya", x: 400, y: 190, region: "Marmara", population: 1050000, economy: "sanayi, tarim, otomotiv" },
    { name: "Samsun", x: 600, y: 120, region: "Karadeniz", population: 1350000, economy: "liman, tarim, sanayi, ticaret" },
    { name: "Siirt", x: 660, y: 320, region: "Güneydoğu", population: 330000, economy: "tarim, hayvancilik" },
    { name: "Sinop", x: 560, y: 100, region: "Karadeniz", population: 220000, economy: "tarim, balikcilik, turizm" },
    { name: "Sivas", x: 560, y: 220, region: "İç Anadolu", population: 650000, economy: "tarim, hayvancilik, sanayi" },
    { name: "Şanlıurfa", x: 620, y: 340, region: "Güneydoğu", population: 2100000, economy: "tarim, ticaret, sanayi" },
    { name: "Şırnak", x: 680, y: 320, region: "Güneydoğu", population: 550000, economy: "tarim, hayvancilik" },
    { name: "Tekirdağ", x: 340, y: 190, region: "Marmara", population: 1100000, economy: "tarim, sanayi, ticaret" },
    { name: "Tokat", x: 580, y: 160, region: "Karadeniz", population: 620000, economy: "tarim, sanayi" },
    { name: "Trabzon", x: 640, y: 120, region: "Karadeniz", population: 820000, economy: "liman, tarim, ticaret, turizm" },
    { name: "Tunceli", x: 640, y: 220, region: "Doğu Anadolu", population: 85000, economy: "hayvancilik, tarim" },
    { name: "Şanlıurfa", x: 620, y: 340, region: "Güneydoğu", population: 2100000, economy: "tarim, ticaret, sanayi" },
    { name: "Uşak", x: 380, y: 280, region: "Ege", population: 370000, economy: "tekstil, madencilik" },
    { name: "Van", x: 700, y: 260, region: "Doğu Anadolu", population: 1150000, economy: "tarim, hayvancilik, ticaret" },
    { name: "Yalova", x: 360, y: 200, region: "Marmara", population: 280000, economy: "sanayi, tarim, turizm" },
    { name: "Yozgat", x: 520, y: 200, region: "İç Anadolu", population: 420000, economy: "tarim, hayvancilik" },
    { name: "Zonguldak", x: 520, y: 150, region: "Karadeniz", population: 600000, economy: "madencilik, sanayi" }
];

// Bölge ekonomileri ve özel mallar
const regionSpecialties = {
    "Marmara": {
        specialties: ["Otomobil", "Tekstil", "Gıda", "Makine", "Kimyasal"],
        vehicleBonus: 1.2,
        industryBonus: 1.3
    },
    "Ege": {
        specialties: ["Zeytin", "Üzüm", "Pamuk", "Turizm", "Tekstil"],
        agricultureBonus: 1.4,
        tourismBonus: 1.5
    },
    "Akdeniz": {
        specialties: ["Narenciye", "Turizm", "Tarım", "Limancılık", "Gıda"],
        agricultureBonus: 1.3,
        tourismBonus: 1.6
    },
    "İç Anadolu": {
        specialties: ["Buğday", "Şeker Pancarı", "Makine", "Otomotiv", "Havacılık"],
        agricultureBonus: 1.5,
        industryBonus: 1.2
    },
    "Karadeniz": {
        specialties: ["Çay", "Fındık", "Balık", "Fındık", "Ormancılık"],
        agricultureBonus: 1.3,
        fishingBonus: 1.8
    },
    "Doğu Anadolu": {
        specialties: ["Hayvan", "Tarım", "Madencilik", "Enerji", "Gıda"],
        livestockBonus: 1.6,
        miningBonus: 1.4
    },
    "Güneydoğu": {
        specialties: ["Petrol", "Pamuk", "Tarım", "Gıda", "Tekstil"],
        oilBonus: 1.8,
        agricultureBonus: 1.2
    }
};

// Araç tipleri ve özellikleri
const vehicleTypes = [
    { name: "Taksi", basePrice: 150000, cargo: 4, speed: 1.2, fuelConsumption: 0.8, type: "passenger" },
    { name: "Kamyonet", basePrice: 200000, cargo: 8, speed: 1.0, fuelConsumption: 1.0, type: "cargo" },
    { name: "Tır", basePrice: 500000, cargo: 20, speed: 0.8, fuelConsumption: 1.5, type: "heavy_cargo" },
    { name: "Minibüs", basePrice: 250000, cargo: 12, speed: 1.1, fuelConsumption: 1.2, type: "passenger" },
    { name: "Panelvan", basePrice: 180000, cargo: 6, speed: 1.0, fuelConsumption: 0.9, type: "cargo" },
    { name: "Kamyon", basePrice: 350000, cargo: 15, speed: 0.9, fuelConsumption: 1.3, type: "cargo" },
    { name: "Otobüs", basePrice: 800000, cargo: 30, speed: 0.9, fuelConsumption: 1.8, type: "passenger" },
    { name: "Pickup", basePrice: 160000, cargo: 5, speed: 1.1, fuelConsumption: 0.9, type: "cargo" }
];

// İşletme tipleri
const businessTypes = [
    { name: "Otel", initialCost: 500000, dailyIncome: 5000, employees: 5, type: "tourism" },
    { name: "Restoran", initialCost: 200000, dailyIncome: 2000, employees: 3, type: "food" },
    { name: "Dükkân", initialCost: 100000, dailyIncome: 1000, employees: 2, type: "retail" },
    { name: "Fabrika", initialCost: 2000000, dailyIncome: 15000, employees: 20, type: "industry" },
    { name: "Tarım İşletmesi", initialCost: 300000, dailyIncome: 3000, employees: 4, type: "agriculture" },
    { name: "Oto Galeri", initialCost: 800000, dailyIncome: 8000, employees: 6, type: "automotive" },
    { name: "Lojistik Firması", initialCost: 600000, dailyIncome: 6000, employees: 8, type: "logistics" },
    { name: "İnşaat Şirketi", initialCost: 1500000, dailyIncome: 12000, employees: 15, type: "construction" }
];

// Ticari mallar
const tradeGoods = [
    { name: "Buğday", basePrice: 8, category: "agriculture", volatility: 0.15, demand: "high" },
    { name: "Pamuk", basePrice: 12, category: "agriculture", volatility: 0.25, demand: "medium" },
    { name: "Zeytin", basePrice: 25, category: "agriculture", volatility: 0.2, demand: "high" },
    { name: "Çay", basePrice: 30, category: "agriculture", volatility: 0.18, demand: "medium" },
    { name: "Fındık", basePrice: 35, category: "agriculture", volatility: 0.3, demand: "medium" },
    { name: "Narenciye", basePrice: 15, category: "agriculture", volatility: 0.22, demand: "high" },
    { name: "Şeker Pancarı", basePrice: 10, category: "agriculture", volatility: 0.12, demand: "high" },
    { name: "Tütün", basePrice: 40, category: "agriculture", volatility: 0.35, demand: "low" },
    { name: "Balık", basePrice: 20, category: "fishing", volatility: 0.28, demand: "medium" },
    { name: "Et", basePrice: 45, category: "livestock", volatility: 0.2, demand: "high" },
    { name: "Süt", basePrice: 12, category: "livestock", volatility: 0.15, demand: "high" },
    { name: "Yün", basePrice: 18, category: "livestock", volatility: 0.18, demand: "medium" },
    { name: "Demir", basePrice: 50, category: "mining", volatility: 0.25, demand: "high" },
    { name: "Kömür", basePrice: 25, category: "mining", volatility: 0.2, demand: "high" },
    { name: "Bakır", basePrice: 60, category: "mining", volatility: 0.3, demand: "medium" },
    { name: "Petrol", basePrice: 80, category: "energy", volatility: 0.4, demand: "high" },
    { name: "Doğalgaz", basePrice: 70, category: "energy", volatility: 0.35, demand: "high" },
    { name: "Tekstil", basePrice: 35, category: "manufacturing", volatility: 0.15, demand: "medium" },
    { name: "Otomobil", basePrice: 150000, category: "automotive", volatility: 0.1, demand: "medium" },
    { name: "Makine", basePrice: 25000, category: "manufacturing", volatility: 0.12, demand: "medium" },
    { name: "Kimyasal", basePrice: 45, category: "chemical", volatility: 0.22, demand: "medium" },
    { name: "Gıda", basePrice: 20, category: "food", volatility: 0.18, demand: "high" },
    { name: "İçki", basePrice: 80, category: "beverage", volatility: 0.25, demand: "medium" },
    { name: "Mobilya", basePrice: 500, category: "furniture", volatility: 0.2, demand: "medium" },
    { name: "Elektronik", basePrice: 2000, category: "technology", volatility: 0.15, demand: "high" },
    { name: "İlaç", basePrice: 150, category: "pharmaceutical", volatility: 0.18, demand: "high" },
    { name: "Kıyafet", basePrice: 80, category: "textile", volatility: 0.2, demand: "high" },
    { name: "Ayakkabı", basePrice: 120, category: "textile", volatility: 0.18, demand: "medium" },
    { name: "Kitap", basePrice: 25, category: "education", volatility: 0.1, demand: "medium" },
    { name: "Oyuncak", basePrice: 35, category: "entertainment", volatility: 0.22, demand: "medium" }
];
