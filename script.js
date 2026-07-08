document.addEventListener('DOMContentLoaded', () => {
    let balance = 1000;
    let clicks = 0;
    const clicksForLootbox = 100;

    const balanceEl = document.getElementById('balance');
    const clickArea = document.getElementById('click-area');
    const backgroundContainer = document.getElementById('background-container');
    const floatingTextsContainer = document.getElementById('floating-texts');
    const lootboxModal = document.getElementById('lootbox-modal');
    const lootboxItem = document.getElementById('lootbox-item');
    const header = document.querySelector('header');

    // Кринжовые фразочки при клике
    const cringePhrases = [
        "-1", "-1 лох", "Зачем?", "Остановись!", "Кринж...", 
        "Твоя стата падает", "Минус вайб", "Ты теряешь деньги",
        "А смысл?", "Деградация...", "Клик-клик, минус дошик",
        "Танцуй пока молодой", "Хватит это терпеть!", "Больно смотреть",
        "Ой всё", "И зачем мы тут?", "-1 IQ"
    ];

    // Цвета для вылетающих текстов
    const cringeColors = [
        "#ff0055", "#00ffcc", "#ffcc00", "#cc00ff", "#00ccff", "#ff3300", "#33ff00"
    ];

    // Ссылки на скачанные GIF с танцующими собаками
    const animalGifs = [
        "assets/dog1.gif",
        "assets/dog2.gif",
        "assets/dog3.gif"
    ];

    let currentGifIndex = 0;

    function changeBackground() {
        currentGifIndex = (currentGifIndex + 1) % animalGifs.length;
        backgroundContainer.style.backgroundImage = `url('${animalGifs[currentGifIndex]}')`;
    }

    backgroundContainer.style.backgroundImage = `url('${animalGifs[0]}')`;
    setInterval(changeBackground, 6000);

    function updateBalance() {
        balanceEl.innerText = balance;
    }

    function createFloatingText(x, y) {
        const textEl = document.createElement('div');
        textEl.classList.add('floating-text');
        
        const phrase = cringePhrases[Math.floor(Math.random() * cringePhrases.length)];
        const color = cringeColors[Math.floor(Math.random() * cringeColors.length)];
        const rot = Math.floor(Math.random() * 80) - 40;
        
        textEl.innerText = phrase;
        textEl.style.left = `${x}px`;
        textEl.style.top = `${y}px`;
        textEl.style.color = color;
        textEl.style.setProperty('--rot', rot);
        
        floatingTextsContainer.appendChild(textEl);

        setTimeout(() => {
            textEl.remove();
        }, 1500);
    }

    // ==========================================
    // 10 АБСУРДНЫХ СОБЫТИЙ (КРИНЖ-МЕХАНИКИ)
    // ==========================================
    
    // Подготовка CSS переходов
    document.body.style.transition = "filter 0.5s, transform 1s";
    clickArea.style.transition = "transform 0.3s, margin-left 0.2s, margin-top 0.2s";
    header.style.transition = "transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)";

    const absurdActions = [
        // 1. Уворот от мышки
        () => {
            const rx = (Math.random() - 0.5) * 400;
            const ry = (Math.random() - 0.5) * 400;
            clickArea.style.transform = `translate(${rx}px, ${ry}px)`;
            setTimeout(() => { clickArea.style.transform = "none"; }, 2000);
        },
        // 2. Экран крутится
        () => {
            document.body.style.transform = "rotate(180deg)";
            setTimeout(() => { document.body.style.transform = "none"; }, 3000);
        },
        // 3. Верблюд сжимается
        () => {
            clickArea.style.transform = "scale(0.1)";
            setTimeout(() => { clickArea.style.transform = "none"; }, 2500);
        },
        // 4. Верблюд становится огромным
        () => {
            clickArea.style.transform = "scale(3)";
            setTimeout(() => { clickArea.style.transform = "none"; }, 2000);
        },
        // 5. Внезапный штраф (фейковая ошибка)
        () => {
            alert("КРИТИЧЕСКАЯ ОШИБКА: Вы слишком много кликаете! Штраф: 50 монет.");
            balance -= 50;
            updateBalance();
        },
        // 6. Блюр экрана (Минус зрение)
        () => {
            document.body.style.filter = "blur(10px)";
            setTimeout(() => { document.body.style.filter = "none"; }, 3000);
        },
        // 7. Инверсия цветов
        () => {
            document.body.style.filter = "invert(100%) hue-rotate(180deg)";
            setTimeout(() => { document.body.style.filter = "none"; }, 3500);
        },
        // 8. Падение баланса вниз
        () => {
            header.style.transform = "translateY(80vh) rotate(45deg) scale(0.5)";
            setTimeout(() => { header.style.transform = "none"; }, 4000);
        },
        // 9. Курсор-обманка (создает фальшивый курсор мыши, который улетает)
        () => {
            const fakeCursor = document.createElement('div');
            fakeCursor.innerText = "↖";
            fakeCursor.style.position = "fixed";
            fakeCursor.style.left = "50%";
            fakeCursor.style.top = "50%";
            fakeCursor.style.fontSize = "40px";
            fakeCursor.style.color = "white";
            fakeCursor.style.zIndex = "9999";
            fakeCursor.style.pointerEvents = "none";
            fakeCursor.style.transition = "all 2s";
            document.body.appendChild(fakeCursor);
            
            setTimeout(() => {
                fakeCursor.style.transform = "translate(400px, -400px) rotate(180deg)";
            }, 100);
            
            setTimeout(() => fakeCursor.remove(), 2000);
        },
        // 10. Клик прибавляет 10 монет вместо -1 (Галлюцинация)
        () => {
            balance += 11; // +10 и компенсируем -1 от основного клика
            updateBalance();
            const hallucinationText = document.createElement('div');
            hallucinationText.innerText = "+10 ГАЛЛЮЦИНАЦИЯ!";
            hallucinationText.classList.add('floating-text');
            hallucinationText.style.color = "#00ff00";
            hallucinationText.style.left = "50%";
            hallucinationText.style.top = "50%";
            floatingTextsContainer.appendChild(hallucinationText);
            setTimeout(() => hallucinationText.remove(), 1500);
        }
    ];

    function triggerRandomAbsurdAction() {
        const randomIndex = Math.floor(Math.random() * absurdActions.length);
        absurdActions[randomIndex]();
    }

    // ==========================================
    // Основная логика
    // ==========================================

    clickArea.addEventListener('click', (e) => {
        balance -= 1;
        clicks += 1;
        updateBalance();

        const x = e.clientX || window.innerWidth / 2;
        const y = e.clientY || window.innerHeight / 2;
        createFloatingText(x, y);

        // 15% шанс на абсурдное действие при каждом клике
        if (Math.random() < 0.15) {
            triggerRandomAbsurdAction();
        }

        if (clicks % clicksForLootbox === 0) {
            spawnLootbox();
        }
    });

    // Иногда верблюд пугается мышки и пытается увернуться еще до клика (10% шанс при наведении)
    clickArea.addEventListener('mouseenter', () => {
        if (Math.random() < 0.10) {
            const rx = (Math.random() - 0.5) * 500;
            const ry = (Math.random() - 0.5) * 500;
            clickArea.style.transform = `translate(${rx}px, ${ry}px)`;
            setTimeout(() => { clickArea.style.transform = "none"; }, 1500);
        }
    });

    function spawnLootbox() {
        lootboxModal.classList.remove('hidden');
        lootboxItem.innerText = "📦";
        lootboxItem.classList.add('shake-animation');
    }

    function createCamelFireworks(x, y) {
        for (let i = 0; i < 25; i++) {
            const camel = document.createElement('img');
            camel.src = 'assets/Verb.png';
            camel.classList.add('camel-particle');
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * 400;
            const tx = Math.cos(angle) * distance + 'px';
            const ty = Math.sin(angle) * distance + 'px';
            const rot = (Math.random() * 720 - 360) + 'deg';
            
            camel.style.setProperty('--tx', tx);
            camel.style.setProperty('--ty', ty);
            camel.style.setProperty('--rot', rot);
            
            camel.style.left = `${x}px`;
            camel.style.top = `${y}px`;
            
            document.body.appendChild(camel);
            
            setTimeout(() => {
                camel.remove();
            }, 1500);
        }
    }

    lootboxItem.addEventListener('click', (e) => {
        const reward = Math.floor(Math.random() * 91) + 10;
        balance += reward;
        updateBalance();

        const rect = lootboxItem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        createCamelFireworks(centerX, centerY);

        lootboxItem.classList.remove('shake-animation');
        lootboxItem.innerText = "💰";

        const textEl = document.createElement('div');
        textEl.classList.add('floating-text');
        textEl.innerText = `+${reward} МОНЕТ! (Но зачем?)`;
        textEl.style.left = `${centerX}px`;
        textEl.style.top = `${rect.top}px`;
        textEl.style.color = "#00ff00";
        textEl.style.setProperty('--rot', 0);
        document.body.appendChild(textEl);

        setTimeout(() => {
            textEl.remove();
        }, 2000);

        setTimeout(() => {
            lootboxModal.classList.add('hidden');
        }, 1000);
    });
});
