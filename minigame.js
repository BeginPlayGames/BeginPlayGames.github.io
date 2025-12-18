// Mini Game - Runner Game with animated character (legs movement)
class MiniGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = 800;
        this.canvas.height = 200;

        this.gameRunning = false;
        this.gameOver = false;
        this.score = 0;
        this.cansCollected = 0;
        this.highScore = localStorage.getItem('silentLifeHighScore') || 0;
        this.highCans = localStorage.getItem('silentLifeHighCans') || 0;

        this.player = {
            x: 50,
            y: 150,
            width: 24,
            height: 32,
            velocityY: 0,
            jumping: false
        };

        this.groundY = 190;
        this.gravity = 0.6;
        this.jumpForce = -12;

        this.obstacles = [];
        this.obstacleTimer = 0;
        this.obstacleInterval = 100;
        this.minObstacleInterval = 60;

        this.cans = [];
        this.canTimer = 0;
        this.canInterval = 150;

        this.gameSpeed = 5;
        this.maxGameSpeed = 12;

        this.stepFrame = 0;

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
        document.querySelector('.game-over-text')?.classList.remove('show');
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
        document.querySelector('.game-over-text')?.classList.remove('show');
    }

    update() {
        if (!this.gameRunning || this.gameOver) return;

        this.score++;
        if (this.score % 100 === 0 && this.gameSpeed < this.maxGameSpeed) {
            this.gameSpeed += 0.5;
            if (this.obstacleInterval > this.minObstacleInterval) {
                this.obstacleInterval -= 5;
            }
        }

        this.player.velocityY += this.gravity;
        this.player.y += this.player.velocityY;
        if (this.player.y >= this.groundY - this.player.height) {
            this.player.y = this.groundY - this.player.height;
            this.player.velocityY = 0;
            this.player.jumping = false;
        }

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

        this.canTimer++;
        if (this.canTimer >= this.canInterval) {
            const isAirborne = Math.random() > 0.5;
            this.cans.push({
                x: this.canvas.width,
                y: isAirborne ? this.groundY - 80 : this.groundY - 20,
                width: 16,
                height: 20,
                collected: false
            });
            this.canTimer = Math.floor(Math.random() * 50);
        }

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            this.obstacles[i].x -= this.gameSpeed;
            if (this.obstacles[i].x + this.obstacles[i].width < 0) {
                this.obstacles.splice(i, 1);
                continue;
            }
            if (this.checkCollision(this.player, this.obstacles[i])) {
                this.endGame();
            }
        }

        for (let i = this.cans.length - 1; i >= 0; i--) {
            this.cans[i].x -= this.gameSpeed;
            if (this.cans[i].x + this.cans[i].width < 0) {
                this.cans.splice(i, 1);
                continue;
            }
            if (!this.cans[i].collected && this.checkCollision(this.player, this.cans[i])) {
                this.cans[i].collected = true;
                this.cansCollected++;
                this.cans.splice(i, 1);
            }
        }

        this.stepFrame = (this.stepFrame + 1) % 20;
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
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('silentLifeHighScore', this.highScore);
        }
        if (this.cansCollected > this.highCans) {
            this.highCans = this.cansCollected;
            localStorage.setItem('silentLifeHighCans', this.highCans);
        }
        document.querySelector('.game-over-text')?.classList.add('show');
    }

    drawSurvivor(x, y, step) {
        const ctx = this.ctx;
        const drawPixel = (px, py, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x + px * 2, y + py * 2, 2, 2);
        };

        const skin = '#F1C27D';
        const hair = '#3D2817';
        const jacket = '#4B5320';
        const pants = '#3A3A3A';
        const boots = '#1A1A1A';

        // Head
        drawPixel(4, 2, skin); drawPixel(5, 2, skin);
        drawPixel(4, 3, skin); drawPixel(5, 3, skin);
        drawPixel(4, 1, hair); drawPixel(5, 1, hair);

        // Body
        drawPixel(4, 4, jacket); drawPixel(5, 4, jacket);
        drawPixel(4, 5, jacket); drawPixel(5, 5, jacket);

        // Legs with animation
        if (step < 10) {
            drawPixel(4, 6, pants); drawPixel(5, 6, pants);
            drawPixel(4, 7, boots); drawPixel(5, 7, boots);
        } else {
            drawPixel(3, 6, pants); drawPixel(6, 6, pants);
            drawPixel(3, 7, boots); drawPixel(6, 7, boots);
        }
    }

    draw() {
        this.ctx.fillStyle = '#1A1A1A';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#2A2A2A';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, 10);

        this.drawSurvivor(this.player.x, this.player.y, this.stepFrame);

        this.obstacles.forEach(o => {
            this.ctx.fillStyle = o.color;
            this.ctx.fillRect(o.x, o.y, o.width, o.height);
        });

        this.cans.forEach(can => {
            if (!can.collected) {
                this.ctx.fillStyle = '#C0C0C0';
                this.ctx.fillRect(can.x, can.y, can.width, can.height);
            }
        });

        this.ctx.fillStyle = '#C4A35A';
        this.ctx.font = '20px sans-serif';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`SCORE: ${Math.floor(this.score / 10)}`, this.canvas.width - 20, 30);
        this.ctx.fillText(`BEST: ${Math.floor(this.highScore / 10)}`, this.canvas.width - 20, 55);
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`🥫 CANS: ${this.cansCollected}`, 20, 30);
        this.ctx.fillText(`BEST: ${this.highCans}`, 20, 50);
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.getElementById('gameCanvas')) {
            new MiniGame();
        }
    }, 100);
});
