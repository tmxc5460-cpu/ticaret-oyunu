class SpaceShooterGame {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.spaceship = null;
        this.asteroids = [];
        this.powerUps = [];
        this.particles = [];
        this.stars = [];
        
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.gameRunning = false;
        this.gamePaused = false;
        
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.spaceshipVelocity = { x: 0, y: 0 };
        
        this.asteroidSpawnTimer = 0;
        this.powerUpSpawnTimer = 0;
        
        this.soundManager = new SoundManager();
        
        this.init();
    }
    
    init() {
        this.setupScene();
        this.setupLights();
        this.createStarfield();
        this.createSpaceship();
        this.setupEventListeners();
        this.setupUI();
    }
    
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x000033, 100, 1000);
        
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        this.camera.position.set(0, 5, 20);
        this.camera.lookAt(0, 0, 0);
        
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('game-canvas'),
            antialias: window.devicePixelRatio < 2,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Mobile optimizations
        if (this.isMobile()) {
            this.renderer.shadowMap.enabled = false;
            this.renderer.toneMapping = THREE.NoToneMapping;
        }
    }
    
    setupLights() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 10, 5);
        
        if (!this.isMobile()) {
            directionalLight.castShadow = true;
            directionalLight.shadow.camera.near = 0.1;
            directionalLight.shadow.camera.far = 50;
            directionalLight.shadow.camera.left = -30;
            directionalLight.shadow.camera.right = 30;
            directionalLight.shadow.camera.top = 30;
            directionalLight.shadow.camera.bottom = -30;
        }
        
        this.scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0x00ffff, 0.5, 100);
        pointLight.position.set(0, 10, 0);
        this.scene.add(pointLight);
    }
    
    createStarfield() {
        const starGeometry = new THREE.BufferGeometry();
        const starCount = this.isMobile() ? 500 : 1000;
        const positions = new Float32Array(starCount * 3);
        
        for (let i = 0; i < starCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 2000;
            positions[i + 1] = (Math.random() - 0.5) * 2000;
            positions[i + 2] = (Math.random() - 0.5) * 2000;
        }
        
        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 2,
            transparent: true,
            opacity: 0.8
        });
        
        const stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(stars);
        this.stars.push(stars);
    }
    
    createSpaceship() {
        const spaceshipGroup = new THREE.Group();
        
        // Ana gövde
        const bodyGeometry = new THREE.ConeGeometry(1, 3, 8);
        const bodyMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x00ffff,
            emissive: 0x004444,
            shininess: 100
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.rotation.z = Math.PI / 2;
        body.castShadow = true;
        spaceshipGroup.add(body);
        
        // Kanatlar
        const wingGeometry = new THREE.BoxGeometry(4, 0.2, 1);
        const wingMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0088ff,
            emissive: 0x002244
        });
        const wings = new THREE.Mesh(wingGeometry, wingMaterial);
        wings.position.z = -0.5;
        if (!this.isMobile()) {
            wings.castShadow = true;
        }
        spaceshipGroup.add(wings);
        
        // Motor ışıkları
        const engineGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        const engineMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xff6600,
            emissive: 0xff3300
        });
        
        const engine1 = new THREE.Mesh(engineGeometry, engineMaterial);
        engine1.position.set(-1, 0, -1.5);
        spaceshipGroup.add(engine1);
        
        const engine2 = new THREE.Mesh(engineGeometry, engineMaterial);
        engine2.position.set(1, 0, -1.5);
        spaceshipGroup.add(engine2);
        
        spaceshipGroup.position.set(0, 0, 10);
        this.spaceship = spaceshipGroup;
        this.scene.add(spaceship);
    }
    
    createAsteroid() {
        const size = Math.random() * 2 + 0.5;
        const geometry = new THREE.DodecahedronGeometry(size, 1);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x8B4513,
            emissive: 0x222222
        });
        
        const asteroid = new THREE.Mesh(geometry, material);
        asteroid.position.set(
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 20,
            -50
        );
        
        asteroid.velocity = {
            x: (Math.random() - 0.5) * 0.2,
            y: (Math.random() - 0.5) * 0.2,
            z: Math.random() * 0.5 + 0.3
        };
        
        asteroid.rotationSpeed = {
            x: Math.random() * 0.02,
            y: Math.random() * 0.02,
            z: Math.random() * 0.02
        };
        
        if (!this.isMobile()) {
            asteroid.castShadow = true;
            asteroid.receiveShadow = true;
        }
        
        this.asteroids.push(asteroid);
        this.scene.add(asteroid);
    }
    
    createPowerUp() {
        const geometry = new THREE.OctahedronGeometry(1, 0);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0xffff00,
            emissive: 0x444400,
            transparent: true,
            opacity: 0.8
        });
        
        const powerUp = new THREE.Mesh(geometry, material);
        powerUp.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 15,
            -30
        );
        
        powerUp.velocity = {
            x: 0,
            y: 0,
            z: 0.3
        };
        
        powerUp.rotationSpeed = 0.05;
        powerUp.type = Math.random() > 0.5 ? 'health' : 'points';
        
        this.powerUps.push(powerUp);
        this.scene.add(powerUp);
    }
    
    createExplosion(position) {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const geometry = new THREE.SphereGeometry(0.1, 4, 4);
            const material = new THREE.MeshBasicMaterial({ 
                color: new THREE.Color().setHSL(Math.random() * 0.1, 1, 0.5),
                transparent: true,
                opacity: 1
            });
            
            const particle = new THREE.Mesh(geometry, material);
            particle.position.copy(position);
            
            particle.velocity = {
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5,
                z: (Math.random() - 0.5) * 0.5
            };
            
            particle.life = 1;
            this.particles.push(particle);
            this.scene.add(particle);
        }
    }
    
    setupEventListeners() {
        // Touch controls
        document.addEventListener('touchstart', (e) => {
            if (this.gameRunning && !this.gamePaused) {
                this.touchStartX = e.touches[0].clientX;
                this.touchStartY = e.touches[0].clientY;
            }
        });
        
        document.addEventListener('touchmove', (e) => {
            if (this.gameRunning && !this.gamePaused) {
                e.preventDefault();
                const touchX = e.touches[0].clientX;
                const touchY = e.touches[0].clientY;
                
                const deltaX = touchX - this.touchStartX;
                const deltaY = touchY - this.touchStartY;
                
                this.spaceshipVelocity.x = deltaX * 0.01;
                this.spaceshipVelocity.y = -deltaY * 0.01;
            }
        });
        
        document.addEventListener('touchend', () => {
            this.spaceshipVelocity.x *= 0.5;
            this.spaceshipVelocity.y *= 0.5;
        });
        
        // Mouse controls for desktop
        document.addEventListener('mousemove', (e) => {
            if (this.gameRunning && !this.gamePaused) {
                const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
                
                this.spaceshipVelocity.x = mouseX * 0.3;
                this.spaceshipVelocity.y = mouseY * 0.3;
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    setupUI() {
        const startBtn = document.getElementById('start-btn');
        const pauseBtn = document.getElementById('pause-btn');
        
        startBtn.addEventListener('click', () => {
            this.startGame();
        });
        
        pauseBtn.addEventListener('click', () => {
            this.togglePause();
        });
    }
    
    startGame() {
        this.gameRunning = true;
        this.gamePaused = false;
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        
        this.soundManager.resumeContext();
        
        document.getElementById('start-btn').style.display = 'none';
        document.getElementById('pause-btn').style.display = 'block';
        
        this.updateUI();
        this.animate();
    }
    
    togglePause() {
        this.gamePaused = !this.gamePaused;
        document.getElementById('pause-btn').textContent = this.gamePaused ? 'Devam Et' : 'Duraklat';
        
        if (!this.gamePaused) {
            this.animate();
        }
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('lives').textContent = this.lives;
    }
    
    updateSpaceship() {
        if (!this.spaceship) return;
        
        // Apply velocity with damping
        this.spaceship.position.x += this.spaceshipVelocity.x;
        this.spaceship.position.y += this.spaceshipVelocity.y;
        
        // Apply damping
        this.spaceshipVelocity.x *= 0.95;
        this.spaceshipVelocity.y *= 0.95;
        
        // Boundaries
        const boundary = 15;
        this.spaceship.position.x = Math.max(-boundary, Math.min(boundary, this.spaceship.position.x));
        this.spaceship.position.y = Math.max(-10, Math.min(10, this.spaceship.position.y));
        
        // Tilt based on movement
        this.spaceship.rotation.z = -this.spaceshipVelocity.x * 0.1;
        this.spaceship.rotation.x = this.spaceshipVelocity.y * 0.05;
    }
    
    updateAsteroids() {
        for (let i = this.asteroids.length - 1; i >= 0; i--) {
            const asteroid = this.asteroids[i];
            
            asteroid.position.x += asteroid.velocity.x;
            asteroid.position.y += asteroid.velocity.y;
            asteroid.position.z += asteroid.velocity.z;
            
            asteroid.rotation.x += asteroid.rotationSpeed.x;
            asteroid.rotation.y += asteroid.rotationSpeed.y;
            asteroid.rotation.z += asteroid.rotationSpeed.z;
            
            // Remove if too far
            if (asteroid.position.z > 30) {
                this.scene.remove(asteroid);
                this.asteroids.splice(i, 1);
                continue;
            }
            
            // Check collision with spaceship
            if (this.spaceship && this.checkCollision(asteroid, this.spaceship, 2)) {
                this.createExplosion(asteroid.position);
                this.soundManager.playExplosion();
                this.scene.remove(asteroid);
                this.asteroids.splice(i, 1);
                this.lives--;
                this.updateUI();
                
                if (this.lives <= 0) {
                    this.gameOver();
                }
            }
        }
    }
    
    updatePowerUps() {
        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            const powerUp = this.powerUps[i];
            
            powerUp.position.z += powerUp.velocity.z;
            powerUp.rotation.y += powerUp.rotationSpeed;
            
            // Remove if too far
            if (powerUp.position.z > 30) {
                this.scene.remove(powerUp);
                this.powerUps.splice(i, 1);
                continue;
            }
            
            // Check collision with spaceship
            if (this.spaceship && this.checkCollision(powerUp, this.spaceship, 2)) {
                if (powerUp.type === 'health') {
                    this.lives = Math.min(this.lives + 1, 5);
                } else {
                    this.score += 100;
                }
                
                this.soundManager.playPowerUp();
                this.createExplosion(powerUp.position);
                this.scene.remove(powerUp);
                this.powerUps.splice(i, 1);
                this.updateUI();
            }
        }
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.position.x += particle.velocity.x;
            particle.position.y += particle.velocity.y;
            particle.position.z += particle.velocity.z;
            
            particle.life -= 0.02;
            particle.material.opacity = particle.life;
            
            if (particle.life <= 0) {
                this.scene.remove(particle);
                this.particles.splice(i, 1);
            }
        }
    }
    
    checkCollision(obj1, obj2, threshold) {
        const distance = obj1.position.distanceTo(obj2.position);
        return distance < threshold;
    }
    
    spawnObjects() {
        // Spawn asteroids
        this.asteroidSpawnTimer++;
        if (this.asteroidSpawnTimer > Math.max(30, 120 - this.level * 10)) {
            this.createAsteroid();
            this.asteroidSpawnTimer = 0;
        }
        
        // Spawn power-ups
        this.powerUpSpawnTimer++;
        if (this.powerUpSpawnTimer > 300) {
            this.createPowerUp();
            this.powerUpSpawnTimer = 0;
        }
        
        // Level progression
        if (this.score > this.level * 500) {
            this.level++;
            this.updateUI();
        }
    }
    
    gameOver() {
        this.gameRunning = false;
        this.soundManager.playGameOver();
        
        const gameOverDiv = document.createElement('div');
        gameOverDiv.className = 'game-over';
        gameOverDiv.innerHTML = `
            <h2>Oyun Bitti!</h2>
            <p>Final Skor: ${this.score}</p>
            <p>Ulaşılan Seviye: ${this.level}</p>
            <button onclick="location.reload()">Tekrar Oyna</button>
        `;
        document.body.appendChild(gameOverDiv);
    }
    
    animate() {
        if (!this.gameRunning || this.gamePaused) return;
        
        requestAnimationFrame(() => this.animate());
        
        this.updateSpaceship();
        this.updateAsteroids();
        this.updatePowerUps();
        this.updateParticles();
        this.spawnObjects();
        
        // Rotate starfield
        this.stars.forEach(star => {
            star.rotation.y += 0.0001;
        });
        
        // Update score
        this.score += 1;
        this.updateUI();
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    const game = new SpaceShooterGame();
});
