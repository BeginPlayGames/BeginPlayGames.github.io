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

    // Функция обновления фона
    function changeBackground() {
        currentGifIndex = (currentGifIndex + 1) % animalGifs.length;
        backgroundContainer.style.backgroundImage = `url('${animalGifs[currentGifIndex]}')`;
    }

    // Инициализация первого фона и смена каждые 6 секунд
    backgroundContainer.style.backgroundImage = `url('${animalGifs[0]}')`;
    setInterval(changeBackground, 6000);

    // Функция обновления баланса на экране
    function updateBalance() {
        balanceEl.innerText = balance;
    }

    // Функция создания вылетающего текста
    function createFloatingText(x, y) {
        const textEl = document.createElement('div');
        textEl.classList.add('floating-text');
        
        // Случайный текст, цвет и поворот
        const phrase = cringePhrases[Math.floor(Math.random() * cringePhrases.length)];
        const color = cringeColors[Math.floor(Math.random() * cringeColors.length)];
        const rot = Math.floor(Math.random() * 80) - 40; // от -40 до 40 градусов
        
        textEl.innerText = phrase;
        textEl.style.left = `${x}px`;
        textEl.style.top = `${y}px`;
        textEl.style.color = color;
        textEl.style.setProperty('--rot', rot);
        
        floatingTextsContainer.appendChild(textEl);

        // Удаление элемента после завершения анимации
        setTimeout(() => {
            textEl.remove();
        }, 1500);
    }

    // Обработка клика по главной картинке
    clickArea.addEventListener('click', (e) => {
        balance -= 1;
        clicks += 1;
        updateBalance();

        // Позиция для вылетающего текста
        const x = e.clientX || window.innerWidth / 2;
        const y = e.clientY || window.innerHeight / 2;
        createFloatingText(x, y);

        // Проверка на лутбокс
        if (clicks % clicksForLootbox === 0) {
            spawnLootbox();
        }
    });

    // Функция появления лутбокса
    function spawnLootbox() {
        lootboxModal.classList.remove('hidden');
        lootboxItem.innerText = "📦";
        lootboxItem.classList.add('shake-animation');
    }

    // Функция салюта из верблюдов
    function createCamelFireworks(x, y) {
        for (let i = 0; i < 25; i++) {
            const camel = document.createElement('img');
            camel.src = 'assets/Verb.png';
            camel.classList.add('camel-particle');
            
            // Вычисляем случайное направление
            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * 400; // от 150 до 550 пикселей
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

    // Обработка клика по лутбоксу
    lootboxItem.addEventListener('click', (e) => {
        // Случайная награда от 10 до 100
        const reward = Math.floor(Math.random() * 91) + 10;
        balance += reward;
        updateBalance();

        // Запускаем салют из верблюдов
        const rect = lootboxItem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        createCamelFireworks(centerX, centerY);

        // Меняем иконку и останавливаем тряску
        lootboxItem.classList.remove('shake-animation');
        lootboxItem.innerText = "💰";

        // Показываем сколько получили
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

        // Скрываем лутбокс через небольшую паузу
        setTimeout(() => {
            lootboxModal.classList.add('hidden');
        }, 1000);
    });
});
