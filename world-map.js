// Dünya Haritası Sistemi - Gelişmiş Harita Motoru
class WorldMapSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.cities = [];
        this.selectedCity = null;
        this.hoveredCity = null;
        this.zoom = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.animationFrame = 0;
        this.particles = [];
        this.onCityClick = null;
        
        this.image = new Image();
        this.image.onload = () => this.draw();
        this.image.src = this.getWorldMapDataURL();
        
        this.setupEventListeners();
        this.startAnimation();
    }
    
    getWorldMapDataURL() {
        // Dünya haritası için detaylı SVG
        return 'data:image/svg+xml;base64,' + btoa(`
            <svg width="1600" height="800" xmlns="http://www.w3.org/2000/svg">
                <!-- Okyanus arka plan -->
                <defs>
                    <radialGradient id="oceanGradient" cx="50%" cy="50%">
                        <stop offset="0%" style="stop-color:#1e3c72;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#2a5298;stop-opacity:1" />
                    </radialGradient>
                    <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#8BC34A;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#689F38;stop-opacity:1" />
                    </linearGradient>
                    <filter id="shadow">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                        <feOffset dx="2" dy="2" result="offsetblur"/>
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.3"/>
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                
                <!-- Okyanus -->
                <rect width="1600" height="800" fill="url(#oceanGradient)"/>
                
                <!-- Dalga efektleri -->
                <path d="M 0 400 Q 200 380 400 400 T 800 400 T 1200 400 T 1600 400" 
                      stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none" opacity="0.5">
                    <animate attributeName="d" 
                             values="M 0 400 Q 200 380 400 400 T 800 400 T 1200 400 T 1600 400;
                                     M 0 400 Q 200 420 400 400 T 800 400 T 1200 400 T 1600 400;
                                     M 0 400 Q 200 380 400 400 T 800 400 T 1200 400 T 1600 400"
                             dur="8s" repeatCount="indefinite"/>
                </path>
                
                <!-- Avrupa -->
                <g id="europe">
                    <path d="M 600 200 Q 700 180 800 200 L 900 220 Q 950 250 900 280 L 850 320 Q 800 340 750 330 L 700 340 Q 650 320 620 280 L 600 240 Q 590 220 600 200 Z" 
                          fill="url(#landGradient)" 
                          stroke="#2E7D32" 
                          stroke-width="2"
                          filter="url(#shadow)"/>
                    <text x="750" y="260" text-anchor="middle" font-family="Arial" font-size="24" fill="#2E7D32" font-weight="bold">AVRUPA</text>
                </g>
                
                <!-- Asya -->
                <g id="asia">
                    <path d="M 900 150 Q 1000 120 1100 140 L 1200 160 Q 1300 180 1400 200 L 1450 250 Q 1500 300 1450 350 L 1400 400 Q 1300 420 1200 400 L 1100 380 Q 1000 360 950 340 L 900 300 Q 880 250 900 200 Z" 
                          fill="url(#landGradient)" 
                          stroke="#D32F2F" 
                          stroke-width="2"
                          filter="url(#shadow)"/>
                    <text x="1200" y="280" text-anchor="middle" font-family="Arial" font-size="24" fill="#D32F2F" font-weight="bold">ASYA</text>
                </g>
                
                <!-- Afrika -->
                <g id="africa">
                    <path d="M 600 400 Q 650 380 700 400 L 750 420 Q 800 440 850 460 L 900 480 Q 920 500 900 520 L 850 540 Q 800 560 750 550 L 700 540 Q 650 520 620 500 L 600 480 Q 590 460 600 440 Z" 
                          fill="url(#landGradient)" 
                          stroke="#FF9800" 
                          stroke-width="2"
                          filter="url(#shadow)"/>
                    <text x="750" y="480" text-anchor="middle" font-family="Arial" font-size="24" fill="#FF9800" font-weight="bold">AFRİKA</text>
                </g>
                
                <!-- Kuzey Amerika -->
                <g id="north-america">
                    <path d="M 200 150 Q 250 130 300 150 L 350 170 Q 400 190 450 210 L 500 230 Q 520 250 500 270 L 450 290 Q 400 310 350 300 L 300 290 Q 250 270 220 260 L 200 250 Q 180 220 190 190 Z" 
                          fill="url(#landGradient)" 
                          stroke="#1976D2" 
                          stroke-width="2"
                          filter="url(#shadow)"/>
                    <text x="350" y="220" text-anchor="middle" font-family="Arial" font-size="20" fill="#1976D2" font-weight="bold">K. AMERİKA</text>
                </g>
                
                <!-- Güney Amerika -->
                <g id="south-america">
                    <path d="M 350 400 Q 400 380 450 400 L 500 420 Q 520 440 500 460 L 450 480 Q 400 500 350 490 L 300 480 Q 280 460 320 450 L 350 420 Q 360 410 350 400 Z" 
                          fill="url(#landGradient)" 
                          stroke="#4CAF50" 
                          stroke-width="2"
                          filter="url(#shadow)"/>
                    <text x="400" y="440" text-anchor="middle" font-family="Arial" font-size="20" fill="#4CAF50" font-weight="bold">G. AMERİKA</text>
                </g>
                
                <!-- Okyanusya -->
                <g id="oceania">
                    <path d="M 1200 500 Q 1250 480 1300 500 L 1350 520 Q 1400 540 1450 560 L 1500 580 Q 1520 600 1500 620 L 1450 640 Q 1400 660 1350 640 L 1300 620 Q 1250 600 1200 580 Z" 
                          fill="url(#landGradient)" 
                          stroke="#9C27B0" 
                          stroke-width="2"
                          filter="url(#shadow)"/>
                    <text x="1350" y="580" text-anchor="middle" font-family="Arial" font-size="20" fill="#9C27B0" font-weight="bold">OKYANUSYA</text>
                </g>
                
                <!-- Dekoratif elementler -->
                <g id="decorations">
                    <!-- Pusula -->
                    <g transform="translate(1450, 100)">
                        <circle cx="0" cy="0" r="30" fill="rgba(255,255,255,0.2)" stroke="#fff" stroke-width="2"/>
                        <path d="M 0,-20 L 5,5 L 0,10 L -5,5 Z" fill="#FF5722"/>
                        <text x="0" y="50" text-anchor="middle" font-family="Arial" font-size="12" fill="#fff">N</text>
                        <text x="0" y="-40" text-anchor="middle" font-family="Arial" font-size="12" fill="#fff">S</text>
                        <text x="-40" y="5" text-anchor="middle" font-family="Arial" font-size="12" fill="#fff">W</text>
                        <text x="40" y="5" text-anchor="middle" font-family="Arial" font-size="12" fill="#fff">E</text>
                    </g>
                    
                    <!-- Ölçek -->
                    <g transform="translate(100, 700)">
                        <rect x="0" y="0" width="200" height="60" fill="rgba(255,255,255,0.1)" stroke="#fff" stroke-width="1" rx="5"/>
                        <text x="100" y="20" text-anchor="middle" font-family="Arial" font-size="12" fill="#fff">ÖLÇEK</text>
                        <line x1="20" y1="30" x2="180" y2="30" stroke="#fff" stroke-width="2"/>
                        <line x1="20" y1="30" x2="20" y2="40" stroke="#fff" stroke-width="2"/>
                        <line x1="180" y1="30" x2="180" y2="40" stroke="#fff" stroke-width="2"/>
                        <line x1="20" y1="40" x2="180" y2="40" stroke="#fff" stroke-width="2"/>
                        <text x="100" y="50" text-anchor="middle" font-family="Arial" font-size="10" fill="#fff">1:10,000,000 km</text>
                    </g>
                </g>
            </svg>
        `);
    }
    
    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('wheel', (e) => this.handleWheel(e));
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        
        // Touch events
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Prevent context menu
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.isDragging = true;
        this.dragStartX = x - this.offsetX;
        this.dragStartY = y - this.offsetY;
        this.canvas.style.cursor = 'grabbing';
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (this.isDragging) {
            this.offsetX = x - this.dragStartX;
            this.offsetY = y - this.dragStartY;
            this.draw();
        } else {
            // Hover efekti
            const city = this.findCityAtPosition(x, y);
            if (city !== this.hoveredCity) {
                this.hoveredCity = city;
                this.canvas.style.cursor = city ? 'pointer' : 'grab';
                this.draw();
            }
        }
    }
    
    handleMouseUp(e) {
        this.isDragging = false;
        this.canvas.style.cursor = 'grab';
    }
    
    handleWheel(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.max(0.5, Math.min(3, this.zoom * delta));
        
        // Zoom merkezini hesapla
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const worldX = (x - this.offsetX) / this.zoom;
        const worldY = (y - this.offsetY) / this.zoom;
        
        this.zoom = newZoom;
        
        this.offsetX = x - worldX * this.zoom;
        this.offsetY = y - worldY * this.zoom;
        
        this.draw();
    }
    
    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const city = this.findCityAtPosition(x, y);
        if (city && this.onCityClick) {
            this.onCityClick(city);
        }
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        this.isDragging = true;
        this.dragStartX = x - this.offsetX;
        this.dragStartY = y - this.offsetY;
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        if (this.isDragging) {
            this.offsetX = x - this.dragStartX;
            this.offsetY = y - this.dragStartY;
            this.draw();
        }
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        this.isDragging = false;
        
        // Touch tıklama kontrolü
        const touch = e.changedTouches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        const city = this.findCityAtPosition(x, y);
        if (city && this.onCityClick) {
            this.onCityClick(city);
        }
    }
    
    setCities(cities) {
        this.cities = cities.map(city => ({
            ...city,
            x: this.lngToX(city.lng),
            y: this.latToY(city.lat),
            visited: city.visited || false,
            pulsePhase: Math.random() * Math.PI * 2
        }));
        this.draw();
    }
    
    lngToX(lng) {
        // Longitude (-180 to 180) to X coordinate (0 to 1600)
        return ((lng + 180) / 360) * 1600;
    }
    
    latToY(lat) {
        // Latitude (90 to -90) to Y coordinate (0 to 800)
        return ((90 - lat) / 180) * 800;
    }
    
    findCityAtPosition(x, y) {
        const mapWidth = 1600 * this.zoom;
        const mapHeight = 800 * this.zoom;
        const offsetX = (this.canvas.width - mapWidth) / 2 + this.offsetX;
        const offsetY = (this.canvas.height - mapHeight) / 2 + this.offsetY;
        
        const worldX = (x - offsetX) / this.zoom;
        const worldY = (y - offsetY) / this.zoom;
        
        return this.cities.find(city => {
            const distance = Math.sqrt(
                Math.pow(city.x - worldX, 2) + 
                Math.pow(city.y - worldY, 2)
            );
            return distance < 15; // 15 piksel yarıçap
        });
    }
    
    selectCity(city) {
        this.selectedCity = city;
        this.draw();
    }
    
    startAnimation() {
        const animate = () => {
            this.animationFrame++;
            this.updateParticles();
            this.draw();
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    updateParticles() {
        // Yeni parçacıklar ekle
        if (Math.random() < 0.02) {
            this.particles.push({
                x: Math.random() * 1600,
                y: Math.random() * 800,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                life: 100,
                maxLife: 100,
                size: Math.random() * 3 + 1,
                color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
            });
        }
        
        // Parçacıkları güncelle
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            return particle.life > 0;
        });
    }
    
    draw() {
        // Canvas'ı temizle
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Transform uygula
        this.ctx.save();
        
        const mapWidth = 1600 * this.zoom;
        const mapHeight = 800 * this.zoom;
        const offsetX = (this.canvas.width - mapWidth) / 2 + this.offsetX;
        const offsetY = (this.canvas.height - mapHeight) / 2 + this.offsetY;
        
        this.ctx.translate(offsetX, offsetY);
        this.ctx.scale(this.zoom, this.zoom);
        
        // Harita resmini çiz
        if (this.image.complete) {
            this.ctx.drawImage(this.image, 0, 0, 1600, 800);
        }
        
        // Parçacıkları çiz
        this.drawParticles();
        
        // Şehirleri çiz
        this.drawCities();
        
        // Transform geri al
        this.ctx.restore();
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            const opacity = particle.life / particle.maxLife;
            this.ctx.globalAlpha = opacity * 0.6;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
    }
    
    drawCities() {
        this.cities.forEach(city => {
            const isSelected = this.selectedCity === city;
            const isHovered = this.hoveredCity === city;
            const isVisited = city.visited;
            
            // Nabız animasyonu
            city.pulsePhase += 0.05;
            const pulseSize = Math.sin(city.pulsePhase) * 2;
            
            // Şehir işaretçisi
            const baseSize = 8;
            const size = baseSize + pulseSize + (isHovered ? 4 : (isSelected ? 6 : 0));
            
            // Dış halka
            this.ctx.beginPath();
            this.ctx.arc(city.x, city.y, size + 3, 0, Math.PI * 2);
            this.ctx.fillStyle = isVisited ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 152, 0, 0.3)';
            this.ctx.fill();
            
            // İç halka
            this.ctx.beginPath();
            this.ctx.arc(city.x, city.y, size, 0, Math.PI * 2);
            
            // Gradient dolgu
            const gradient = this.ctx.createRadialGradient(
                city.x, city.y, 0,
                city.x, city.y, size
            );
            
            if (isSelected) {
                gradient.addColorStop(0, '#FF5722');
                gradient.addColorStop(1, '#FF9800');
            } else if (isVisited) {
                gradient.addColorStop(0, '#4CAF50');
                gradient.addColorStop(1, '#8BC34A');
            } else {
                gradient.addColorStop(0, '#FF9800');
                gradient.addColorStop(1, '#F57C00');
            }
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Hover halkası
            if (isHovered) {
                this.ctx.beginPath();
                this.ctx.arc(city.x, city.y, size + 8, 0, Math.PI * 2);
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }
            
            // Şehir adı
            this.ctx.fillStyle = '#fff';
            this.ctx.font = isHovered ? 'bold 12px Arial' : '11px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.lineWidth = 3;
            this.ctx.strokeText(city.name, city.x, city.y - size - 8);
            this.ctx.fillText(city.name, city.x, city.y - size - 8);
            
            // Seçili şehir için ek bilgi
            if (isSelected) {
                const infoBox = {
                    width: 200,
                    height: 80,
                    x: city.x + 15,
                    y: city.y - 40
                };
                
                // Bilgi kutusu
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                this.ctx.fillRect(infoBox.x, infoBox.y, infoBox.width, infoBox.height);
                
                // Bilgi metni
                this.ctx.fillStyle = '#fff';
                this.ctx.font = '11px Arial';
                this.ctx.textAlign = 'left';
                this.ctx.fillText(`📍 ${city.name}`, infoBox.x + 10, infoBox.y + 20);
                this.ctx.fillText(`👥 ${city.population ? city.population.toLocaleString() : 'N/A'}`, infoBox.x + 10, infoBox.y + 35);
                this.ctx.fillText(`🌍 ${city.country || 'Dünya'}`, infoBox.x + 10, infoBox.y + 50);
            }
        });
    }
    
    // Zoom ve pan kontrolleri
    zoomIn() {
        this.zoom = Math.min(3, this.zoom * 1.2);
        this.draw();
    }
    
    zoomOut() {
        this.zoom = Math.max(0.5, this.zoom / 1.2);
        this.draw();
    }
    
    reset() {
        this.zoom = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.draw();
    }
    
    fullscreen() {
        if (!document.fullscreenElement) {
            this.canvas.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorldMapSystem;
}
