// Mini Game - Runner Game (like Chrome Dino)
class MiniGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.canvas.width = 800;
        this.canvas.height = 200;
        
        // Game state
        this.gameRunning = false;
        this.gameOver = false;
        this.score = 0;
        this.cansCollected = 0;
        this.highScore = localStorage.getItem('silentLifeHighScore') || 0;
        this.highCans = localStorage.getItem('silentLifeHighCans') || 0;
        
        // Player
        this.player = {
            x: 50,
            y: 150,
            width: 24,
            height: 32,
            velocityY: 0,
            jumping: false
        };
        
        // Ground
        this.groundY = 190;
        this.gravity = 0.6;
        this.jumpForce = -12;
        
        // Obstacles
        this.obstacles = [];
        this.obstacleTimer = 0;
        this.obstacleInterval = 100;
        this.minObstacleInterval = 60;
        
        // Collectibles (canned food)
        this.cans = [];
        this.canTimer = 0;
        this.canInterval = 150;
        
        // Game speed
        this.gameSpeed = 5;
        this.maxGameSpeed = 12;
        
        // Bind events
        this.canvas.addEventListener('click', () => this.jump());
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.jump();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                this.jump();
            }
        });
        
        // Start game loop
        this.gameLoop();
    }
    
    jump() {
        if (!this.gameRunning && !this.gameOver) {
            this.startGame();
        }
        
        if (this.gameOver) {
            this.resetGame();
            return;
        }
        
        if (!this.player.jumping) {
            this.player.velocityY = this.jumpForce;
            this.player.jumping = true;
        }
    }
    
    startGame() {
        this.gameRunning = true;
        this.gameOver = false;
        this.score = 0;
        this.cansCollected = 0;
        this.obstacles = [];
        this.cans = [];
        this.obstacleTimer = 0;
        this.canTimer = 0;
        this.gameSpeed = 5;
        document.querySelector('.game-over-text').classList.remove('show');
    }
    
    resetGame() {
        this.gameRunning = false;
        this.gameOver = false;
        this.score = 0;
        this.cansCollected = 0;
        this.obstacles = [];
        this.cans = [];
        this.obstacleTimer = 0;
        this.canTimer = 0;
        this.gameSpeed = 5;
        this.player.y = 150;
        this.player.velocityY = 0;
        this.player.jumping = false;
        document.querySelector('.game-over-text').classList.remove('show');
    }
    
    update() {
        if (!this.gameRunning || this.gameOver) return;
        
        // Update score
        this.score++;
        
        // Increase difficulty
        if (this.score % 100 === 0 && this.gameSpeed < this.maxGameSpeed) {
            this.gameSpeed += 0.5;
            if (this.obstacleInterval > this.minObstacleInterval) {
                this.obstacleInterval -= 5;
            }
        }
        
        // Update player
        this.player.velocityY += this.gravity;
        this.player.y += this.player.velocityY;
        
        // Ground collision
        if (this.player.y >= this.groundY - this.player.height) {
            this.player.y = this.groundY - this.player.height;
            this.player.velocityY = 0;
            this.player.jumping = false;
        }
        
        // Spawn obstacles
        this.obstacleTimer++;
        if (this.obstacleTimer >= this.obstacleInterval) {
            this.obstacles.push({
                x: this.canvas.width,
                y: this.groundY - 30,
                width: 20,
                height: 30,
                color: '#8B4513'
            });
            this.obstacleTimer = 0;
        }
        
        // Spawn canned food
        this.canTimer++;
        if (this.canTimer >= this.canInterval) {
            // Random height: on ground or in air
            const isAirborne = Math.random() > 0.5;
            this.cans.push({
                x: this.canvas.width,
                y: isAirborne ? this.groundY - 80 : this.groundY - 20,
                width: 16,
                height: 20,
                collected: false
            });
            this.canTimer = Math.floor(Math.random() * 50); // Random next spawn
        }
        
        // Update obstacles
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            this.obstacles[i].x -= this.gameSpeed;
            
            // Remove off-screen obstacles
            if (this.obstacles[i].x + this.obstacles[i].width < 0) {
                this.obstacles.splice(i, 1);
                continue;
            }
            
            // Check collision with obstacles
            if (this.checkCollision(this.player, this.obstacles[i])) {
                this.endGame();
            }
        }
        
        // Update cans
        for (let i = this.cans.length - 1; i >= 0; i--) {
            this.cans[i].x -= this.gameSpeed;
            
            // Remove off-screen cans
            if (this.cans[i].x + this.cans[i].width < 0) {
                this.cans.splice(i, 1);
                continue;
            }
            
            // Check collection
            if (!this.cans[i].collected && this.checkCollision(this.player, this.cans[i])) {
                this.cans[i].collected = true;
                this.cansCollected++;
                this.cans.splice(i, 1);
            }
        }
    }
    
    checkCollision(player, object) {
        return player.x < object.x + object.width &&
               player.x + player.width > object.x &&
               player.y < object.y + object.height &&
               player.y + player.height > object.y;
    }
    
    endGame() {
        this.gameOver = true;
        this.gameRunning = false;
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('silentLifeHighScore', this.highScore);
        }
        
        // Update high cans
        if (this.cansCollected > this.highCans) {
            this.highCans = this.cansCollected;
            localStorage.setItem('silentLifeHighCans', this.highCans);
        }
        
        document.querySelector('.game-over-text').classList.add('show');
    }
    
    drawSurvivor(x, y) {
        const ctx = this.ctx;
        const pixelSize = 2;
        
        // Helper function to draw pixel
        const drawPixel = (px, py, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x + px * pixelSize, y + py * pixelSize, pixelSize, pixelSize);
        };
        
        // Head (beige/skin tone)
        const skinColor = '#D4A574';
        drawPixel(4, 2, skinColor);
        drawPixel(5, 2, skinColor);
        drawPixel(6, 2, skinColor);
        drawPixel(7, 2, skinColor);
        drawPixel(3, 3, skinColor);
        drawPixel(4, 3, skinColor);
        drawPixel(5, 3, skinColor);
        drawPixel(6, 3, skinColor);
        drawPixel(7, 3, skinColor);
        drawPixel(8, 3, skinColor);
        drawPixel(3, 4, skinColor);
        drawPixel(4, 4, skinColor);
        drawPixel(5, 4, skinColor);
        drawPixel(6, 4, skinColor);
        drawPixel(7, 4, skinColor);
        drawPixel(8, 4, skinColor);
        
        // Hair/Hat (dark brown)
        const hatColor = '#3D2817';
        drawPixel(3, 1, hatColor);
        drawPixel(4, 1, hatColor);
        drawPixel(5, 1, hatColor);
        drawPixel(6, 1, hatColor);
        drawPixel(7, 1, hatColor);
        drawPixel(8, 1, hatColor);
        drawPixel(3, 2, hatColor);
        drawPixel(8, 2, hatColor);
        
        // Eyes (black)
        drawPixel(4, 3, '#000000');
        drawPixel(7, 3, '#000000');
        
        // Body - Jacket (olive green/military)
        const jacketColor = '#5A6B3F';
        drawPixel(3, 5, jacketColor);
        drawPixel(4, 5, jacketColor);
        drawPixel(5, 5, jacketColor);
        drawPixel(6, 5, jacketColor);
        drawPixel(7, 5, jacketColor);
        drawPixel(8, 5, jacketColor);
        drawPixel(2, 6, jacketColor);
        drawPixel(3, 6, jacketColor);
        drawPixel(4, 6, jacketColor);
        drawPixel(5, 6, jacketColor);
        drawPixel(6, 6, jacketColor);
        drawPixel(7, 6, jacketColor);
        drawPixel(8, 6, jacketColor);
        drawPixel(9, 6, jacketColor);
        drawPixel(2, 7, jacketColor);
        drawPixel(3, 7, jacketColor);
        drawPixel(4, 7, jacketColor);
        drawPixel(5, 7, jacketColor);
        drawPixel(6, 7, jacketColor);
        drawPixel(7, 7, jacketColor);
        drawPixel(8, 7, jacketColor);
        drawPixel(9, 7, jacketColor);
        
        // Backpack (dark brown)
        const backpackColor = '#4A3728';
        drawPixel(9, 5, backpackColor);
        drawPixel(10, 5, backpackColor);
        drawPixel(10, 6, backpackColor);
        drawPixel(10, 7, backpackColor);
        drawPixel(9, 8, backpackColor);
        drawPixel(10, 8, backpackColor);
        
        // Belt/Waist (dark)
        const beltColor = '#2A1F1A';
        drawPixel(3, 8, beltColor);
        drawPixel(4, 8, beltColor);
        drawPixel(5, 8, beltColor);
        drawPixel(6, 8, beltColor);
        drawPixel(7, 8, beltColor);
        drawPixel(8, 8, beltColor);
        
        // Pants (dark gray)
        const pantsColor = '#3A3A3A';
        drawPixel(3, 9, pantsColor);
        drawPixel(4, 9, pantsColor);
        drawPixel(5, 9, pantsColor);
        drawPixel(6, 9, pantsColor);
        drawPixel(7, 9, pantsColor);
        drawPixel(8, 9, pantsColor);
        drawPixel(3, 10, pantsColor);
        drawPixel(4, 10, pantsColor);
        drawPixel(7, 10, pantsColor);
        drawPixel(8, 10, pantsColor);
        
        // Legs
        drawPixel(3, 11, pantsColor);
        drawPixel(4, 11, pantsColor);
        drawPixel(7, 11, pantsColor);
        drawPixel(8, 11, pantsColor);
        drawPixel(3, 12, pantsColor);
        drawPixel(4, 12, pantsColor);
        drawPixel(7, 12, pantsColor);
        drawPixel(8, 12, pantsColor);
        
        // Boots (black)
        const bootsColor = '#1A1A1A';
        drawPixel(2, 13, bootsColor);
        drawPixel(3, 13, bootsColor);
        drawPixel(4, 13, bootsColor);
        drawPixel(7, 13, bootsColor);
        drawPixel(8, 13, bootsColor);
        drawPixel(9, 13, bootsColor);
        drawPixel(2, 14, bootsColor);
        drawPixel(3, 14, bootsColor);
        drawPixel(4, 14, bootsColor);
        drawPixel(7, 14, bootsColor);
        drawPixel(8, 14, bootsColor);
        drawPixel(9, 14, bootsColor);
        
        // Arms
        drawPixel(1, 6, jacketColor);
        drawPixel(1, 7, jacketColor);
        drawPixel(0, 8, skinColor);
        drawPixel(1, 8, skinColor);
    }
    
    drawCan(x, y, width, height) {
        const ctx = this.ctx;
        
        // Can body (silver/metal)
        ctx.fillStyle = '#C0C0C0';
        ctx.fillRect(x + 2, y, width - 4, height);
        
        // Top rim
        ctx.fillStyle = '#A0A0A0';
        ctx.fillRect(x, y, width, 3);
        
        // Bottom rim
        ctx.fillRect(x, y + height - 3, width, 3);
        
        // Label (red)
        ctx.fillStyle = '#C41E3A';
        ctx.fillRect(x + 2, y + 5, width - 4, height - 10);
        
        // Label text line
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x + 4, y + 8, width - 8, 2);
        ctx.fillRect(x + 4, y + 12, width - 8, 1);
        
        // Highlight
        ctx.fillStyle = '#E8E8E8';
        ctx.fillRect(x + width - 5, y + 4, 2, height - 8);
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#1A1A1A';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw ground
        this.ctx.fillStyle = '#2A2A2A';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, 10);
        
        // Draw ground details (grass/debris)
        this.ctx.fillStyle = '#3A3A2A';
        for (let i = 0; i < this.canvas.width; i += 20) {
            this.ctx.fillRect(i + (this.score % 20), this.groundY, 8, 2);
        }
        
        // Draw player (pixel art survivor)
        this.drawSurvivor(this.player.x, this.player.y);
        
        // Draw obstacles
        this.obstacles.forEach(obstacle => {
            this.ctx.fillStyle = obstacle.color;
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            
            // Add detail to obstacles (barbed wire/debris)
            this.ctx.fillStyle = '#6B3410';
            this.ctx.fillRect(obstacle.x + 3, obstacle.y + 3, obstacle.width - 6, obstacle.height - 6);
            
            // Add spikes
            this.ctx.fillStyle = '#A0A0A0';
            for (let i = 0; i < 3; i++) {
                this.ctx.fillRect(obstacle.x + 2, obstacle.y + i * 10, 2, 2);
                this.ctx.fillRect(obstacle.x + obstacle.width - 4, obstacle.y + i * 10 + 5, 2, 2);
            }
        });
        
        // Draw cans
        this.cans.forEach(can => {
            if (!can.collected) {
                this.drawCan(can.x, can.y, can.width, can.height);
            }
        });
        
        // Draw score and cans collected
        this.ctx.fillStyle = '#C4A35A';
        this.ctx.font = 'bold 20px "Bebas Neue", sans-serif';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`SCORE: ${Math.floor(this.score / 10)}`, this.canvas.width - 20, 30);
        this.ctx.fillText(`BEST: ${Math.floor(this.highScore / 10)}`, this.canvas.width - 20, 55);
        
        // Draw cans collected
        this.ctx.fillStyle = '#C41E3A';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`🥫 CANS: ${this.cansCollected}`, 20, 30);
        this.ctx.fillStyle = '#A0A0A0';
        this.ctx.font = 'bold 16px "Bebas Neue", sans-serif';
        this.ctx.fillText(`BEST: ${this.highCans}`, 20, 50);
        
        // Draw start message
        if (!this.gameRunning && !this.gameOver) {
            this.ctx.fillStyle = '#E8E8E8';
            this.ctx.font = 'bold 24px "Bebas Neue", sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('CLICK TO START', this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.font = 'bold 16px "Bebas Neue", sans-serif';
            this.ctx.fillStyle = '#A0A0A0';
            this.ctx.fillText('Collect cans and avoid obstacles!', this.canvas.width / 2, this.canvas.height / 2 + 25);
        }
        
        // Draw game over message
        if (this.gameOver) {
            this.ctx.fillStyle = '#8B4513';
            this.ctx.font = 'bold 32px "Bebas Neue", sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 20);
            
            this.ctx.fillStyle = '#C41E3A';
            this.ctx.font = 'bold 20px "Bebas Neue", sans-serif';
            this.ctx.fillText(`Cans Collected: ${this.cansCollected}`, this.canvas.width / 2, this.canvas.height / 2 + 5);
            
            this.ctx.fillStyle = '#A0A0A0';
            this.ctx.font = 'bold 18px "Bebas Neue", sans-serif';
            this.ctx.fillText('CLICK TO RESTART', this.canvas.width / 2, this.canvas.height / 2 + 30);
        }
    }
    
    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure canvas is ready
    setTimeout(() => {
        if (document.getElementById('gameCanvas')) {
            new MiniGame();
        }
    }, 100);
});