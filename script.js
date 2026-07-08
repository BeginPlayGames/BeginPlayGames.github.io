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

    const cringePhrases = [
        "-1", "-1 лох", "Зачем?", "Остановись!", "Кринж...", 
        "Твоя стата падает", "Минус вайб", "Ты теряешь деньги",
        "А смысл?", "Деградация...", "Клик-клик, минус дошик",
        "Танцуй пока молодой", "Хватит это терпеть!", "Больно смотреть",
        "Ой всё", "И зачем мы тут?", "-1 IQ"
    ];

    const cringeColors = [
        "#ff0055", "#00ffcc", "#ffcc00", "#cc00ff", "#00ccff", "#ff3300", "#33ff00"
    ];

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
    // 20 АБСУРДНЫХ СОБЫТИЙ (С ВЕСАМИ)
    // ==========================================
    
    document.body.style.transition = "filter 0.5s, transform 1s, opacity 0.5s";
    clickArea.style.transition = "transform 0.3s, opacity 0.3s";
    header.style.transition = "transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)";

    const absurdActions = [
        // 1. Уворот от мышки (Часто!)
        { weight: 25, action: () => {
            const rx = (Math.random() - 0.5) * 500;
            const ry = (Math.random() - 0.5) * 500;
            clickArea.style.transform = `translate(${rx}px, ${ry}px)`;
            setTimeout(() => { clickArea.style.transform = "none"; }, 2000);
        }},
        // 2. Верблюд сжимается (Часто!)
        { weight: 20, action: () => {
            clickArea.style.transform = "scale(0.1)";
            setTimeout(() => { clickArea.style.transform = "none"; }, 2500);
        }},
        // 3. Верблюд становится огромным (Часто!)
        { weight: 20, action: () => {
            clickArea.style.transform = "scale(3)";
            setTimeout(() => { clickArea.style.transform = "none"; }, 2000);
        }},
        // 4. Экран крутится (Редко)
        { weight: 5, action: () => {
            document.body.style.transform = "rotate(180deg)";
            setTimeout(() => { document.body.style.transform = "none"; }, 3000);
        }},
        // 5. Внезапный штраф (Средне)
        { weight: 10, action: () => {
            alert("КРИТИЧЕСКАЯ ОШИБКА: Вы слишком много кликаете! Штраф: 50 монет.");
            balance -= 50;
            updateBalance();
        }},
        // 6. Верблюд сплющивается (вместо блюра)
        { weight: 8, action: () => {
            clickArea.style.transform = "scaleY(0.2) scaleX(2)";
            setTimeout(() => { clickArea.style.transform = "none"; }, 2500);
        }},
        // 7. Инверсия цветов
        { weight: 8, action: () => {
            document.body.style.filter = "invert(100%) hue-rotate(180deg)";
            setTimeout(() => { document.body.style.filter = "none"; }, 3500);
        }},
        // 8. Падение баланса вниз
        { weight: 5, action: () => {
            header.style.transform = "translateY(80vh) rotate(45deg) scale(0.5)";
            setTimeout(() => { header.style.transform = "none"; }, 4000);
        }},
        // 9. Скример-курсор
        { weight: 8, action: () => {
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
            setTimeout(() => { fakeCursor.style.transform = "translate(400px, -400px) rotate(180deg)"; }, 100);
            setTimeout(() => fakeCursor.remove(), 2000);
        }},
        // 10. Галлюцинация (+10 монет) - ОЧЕНЬ РЕДКО
        { weight: 2, action: () => {
            balance += 11;
            updateBalance();
            const text = document.createElement('div');
            text.innerText = "+10 ГАЛЛЮЦИНАЦИЯ!";
            text.classList.add('floating-text');
            text.style.color = "#00ff00";
            text.style.left = "50%";
            text.style.top = "50%";
            floatingTextsContainer.appendChild(text);
            setTimeout(() => text.remove(), 1500);
        }},
        // 11. Матрица (зеленый фильтр)
        { weight: 5, action: () => {
            document.body.style.filter = "hue-rotate(90deg) contrast(200%) sepia(100%)";
            setTimeout(() => { document.body.style.filter = "none"; }, 3000);
        }},
        // 12. Отзеркаливание сайта
        { weight: 5, action: () => {
            document.body.style.transform = "scaleX(-1)";
            setTimeout(() => { document.body.style.transform = "none"; }, 3000);
        }},
        // 13. Блэкаут (полная тьма)
        { weight: 5, action: () => {
            document.body.style.opacity = "0";
            setTimeout(() => { document.body.style.opacity = "1"; }, 1500);
        }},
        // 14. Фейковая реклама (текст)
        { weight: 8, action: () => {
            const ad = document.createElement('div');
            ad.innerText = "ПОДПИШИСЬ НА ПРЕМИУМ-ВЕРБЛЮДА ЗА $99.99/МЕС!";
            ad.style.position = "fixed";
            ad.style.top = "10%";
            ad.style.left = "0";
            ad.style.width = "100%";
            ad.style.backgroundColor = "yellow";
            ad.style.color = "red";
            ad.style.fontSize = "30px";
            ad.style.fontWeight = "900";
            ad.style.textAlign = "center";
            ad.style.padding = "20px";
            ad.style.zIndex = "9999";
            document.body.appendChild(ad);
            setTimeout(() => ad.remove(), 2500);
        }},
        // 15. Поломка баланса (странные символы)
        { weight: 8, action: () => {
            balanceEl.innerText = "$#@!%&";
            setTimeout(() => updateBalance(), 2000);
        }},
        // 16. Comic Sans (шрифт меняется)
        { weight: 5, action: () => {
            const oldFont = document.body.style.fontFamily;
            document.body.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
            setTimeout(() => { document.body.style.fontFamily = oldFont; }, 4000);
        }},
        // 17. Жесткий зум
        { weight: 5, action: () => {
            document.body.style.transform = "scale(2) translate(0%, 10%)";
            setTimeout(() => { document.body.style.transform = "none"; }, 2000);
        }},
        // 18. Верблюд крутится как спиннер
        { weight: 10, action: () => {
            clickArea.style.transition = "transform 2s cubic-bezier(0.25, 1, 0.5, 1)";
            clickArea.style.transform = "rotate(3600deg)";
            setTimeout(() => { 
                clickArea.style.transition = "transform 0.3s, opacity 0.3s"; 
                clickArea.style.transform = "none"; 
            }, 2500);
        }},
        // 19. Призрачный верблюд (почти невидимый)
        { weight: 15, action: () => {
            clickArea.style.opacity = "0.05";
            setTimeout(() => { clickArea.style.opacity = "1"; }, 3000);
        }},
        // 20. Верблюд-прыгун
        { weight: 10, action: () => {
            let jumps = 0;
            const interval = setInterval(() => {
                const rx = (Math.random() - 0.5) * 600;
                const ry = (Math.random() - 0.5) * 600;
                clickArea.style.transform = `translate(${rx}px, ${ry}px)`;
                jumps++;
                if(jumps > 5) {
                    clearInterval(interval);
                    clickArea.style.transform = "none";
                }
            }, 300);
        }}
    ];

    function triggerRandomAbsurdAction() {
        let totalWeight = absurdActions.reduce((sum, item) => sum + item.weight, 0);
        let r = Math.random() * totalWeight;
        for (let item of absurdActions) {
            r -= item.weight;
            if (r <= 0) {
                item.action();
                break;
            }
        }
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

        // 25% шанс на абсурдное действие при клике (стало чаще!)
        if (Math.random() < 0.25) {
            triggerRandomAbsurdAction();
        }

        if (clicks % clicksForLootbox === 0) {
            spawnLootbox();
        }
    });

    // Уворот при наведении (шанс 35% - стало гораздо чаще!)
    clickArea.addEventListener('mouseenter', () => {
        if (Math.random() < 0.35) {
            const rx = (Math.random() - 0.5) * 600;
            const ry = (Math.random() - 0.5) * 600;
            clickArea.style.transform = `translate(${rx}px, ${ry}px)`;
            setTimeout(() => { clickArea.style.transform = "none"; }, 1000);
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
