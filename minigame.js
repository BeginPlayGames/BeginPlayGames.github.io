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
        this.highScore = localStorage.getItem('silentLifeHighScore') || 0;
        
        // Player
        this.player = {
            x: 50,
            y: 150,
            width: 30,
            height: 40,
            velocityY: 0,
            jumping: false,
            color: '#C4A35A'
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
        this.obstacles = [];
        this.obstacleTimer = 0;
        this.gameSpeed = 5;
        document.querySelector('.game-over-text').classList.remove('show');
    }
    
    resetGame() {
        this.gameRunning = false;
        this.gameOver = false;
        this.score = 0;
        this.obstacles = [];
        this.obstacleTimer = 0;
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
        
        // Update obstacles
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            this.obstacles[i].x -= this.gameSpeed;
            
            // Remove off-screen obstacles
            if (this.obstacles[i].x + this.obstacles[i].width < 0) {
                this.obstacles.splice(i, 1);
                continue;
            }
            
            // Check collision
            if (this.checkCollision(this.player, this.obstacles[i])) {
                this.endGame();
            }
        }
    }
    
    checkCollision(player, obstacle) {
        return player.x < obstacle.x + obstacle.width &&
               player.x + player.width > obstacle.x &&
               player.y < obstacle.y + obstacle.height &&
               player.y + player.height > obstacle.y;
    }
    
    endGame() {
        this.gameOver = true;
        this.gameRunning = false;
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('silentLifeHighScore', this.highScore);
        }
        
        document.querySelector('.game-over-text').classList.add('show');
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#1A1A1A';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw ground
        this.ctx.fillStyle = '#2A2A2A';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, 10);
        
        // Draw player
        this.ctx.fillStyle = this.player.color;
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        
        // Draw player details (simple character)
        this.ctx.fillStyle = '#E8E8E8';
        // Head
        this.ctx.fillRect(this.player.x + 8, this.player.y + 5, 14, 14);
        // Eyes
        this.ctx.fillStyle = '#0A0A0A';
        this.ctx.fillRect(this.player.x + 11, this.player.y + 9, 3, 3);
        this.ctx.fillRect(this.player.x + 16, this.player.y + 9, 3, 3);
        
        // Draw obstacles
        this.obstacles.forEach(obstacle => {
            this.ctx.fillStyle = obstacle.color;
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            
            // Add detail to obstacles
            this.ctx.fillStyle = '#6B3410';
            this.ctx.fillRect(obstacle.x + 3, obstacle.y + 3, obstacle.width - 6, obstacle.height - 6);
        });
        
        // Draw score
        this.ctx.fillStyle = '#C4A35A';
        this.ctx.font = 'bold 20px "Bebas Neue", sans-serif';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`SCORE: ${Math.floor(this.score / 10)}`, this.canvas.width - 20, 30);
        this.ctx.fillText(`BEST: ${Math.floor(this.highScore / 10)}`, this.canvas.width - 20, 55);
        
        // Draw start message
        if (!this.gameRunning && !this.gameOver) {
            this.ctx.fillStyle = '#E8E8E8';
            this.ctx.font = 'bold 24px "Bebas Neue", sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('CLICK TO START', this.canvas.width / 2, this.canvas.height / 2);
        }
        
        // Draw game over message
        if (this.gameOver) {
            this.ctx.fillStyle = '#8B4513';
            this.ctx.font = 'bold 32px "Bebas Neue", sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 10);
            
            this.ctx.fillStyle = '#A0A0A0';
            this.ctx.font = 'bold 18px "Bebas Neue", sans-serif';
            this.ctx.fillText('CLICK TO RESTART', this.canvas.width / 2, this.canvas.height / 2 + 20);
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