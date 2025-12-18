// Translations
const translations = {
    en: {
        heroTitle: "SILENT LIFE",
        heroSubtitle: "Survive the Occupation",
        buyText: "COMING SOON",
        aboutTitle: "ABOUT THE GAME",
        aboutText: "Silent Life is a hardcore survival simulation set in an occupied territory. No monsters, no radiation - just the harsh reality of living under occupation. Every decision matters. Every resource counts. Will you survive?",
        featuresTitle: "KEY FEATURES",
        feature1Title: "HARDCORE SURVIVAL",
        feature1Text: "Manage hunger, thirst, and health in a world where resources are scarce and danger lurks around every corner.",
        feature2Title: "STEALTH & TACTICS",
        feature2Text: "Avoid patrols, hide in shadows, and make strategic decisions to stay alive in occupied territory.",
        feature3Title: "RESOURCE MANAGEMENT",
        feature3Text: "Scavenge for supplies, craft tools, and make every item count in your struggle for survival.",
        feature4Title: "MORAL CHOICES",
        feature4Text: "Face difficult decisions that test your humanity. Will you help others or focus on your own survival?",
        galleryTitle: "SCREENSHOTS",
        minigameTitle: "SURVIVAL RUNNER",
        minigameInstructions: "Click or press SPACE to jump. Avoid obstacles and survive as long as you can!",
        trailerTitle: "GAMEPLAY TRAILER",
        contactTitle: "CONTACT",
        contactYoutube: "YouTube:",
        contactEmail: "Email:",
        contactPatreon: "Patreon:",
        footerCopyright: "© 2024 SILENT LIFE. All rights reserved."
    },
    ru: {
        heroTitle: "SILENT LIFE",
        heroSubtitle: "Выживи в Оккупации",
        buyText: "СКОРО В ПРОДАЖЕ",
        aboutTitle: "ОБ ИГРЕ",
        aboutText: "Silent Life — это хардкорный симулятор выживания на оккупированной территории. Никаких монстров, никакой радиации — только суровая реальность жизни под оккупацией. Каждое решение имеет значение. Каждый ресурс на счету. Сможешь ли ты выжить?",
        featuresTitle: "КЛЮЧЕВЫЕ ОСОБЕННОСТИ",
        feature1Title: "ХАРДКОРНОЕ ВЫЖИВАНИЕ",
        feature1Text: "Управляй голодом, жаждой и здоровьем в мире, где ресурсы скудны, а опасность подстерегает за каждым углом.",
        feature2Title: "СКРЫТНОСТЬ И ТАКТИКА",
        feature2Text: "Избегай патрулей, прячься в тенях и принимай стратегические решения, чтобы остаться в живых на оккупированной территории.",
        feature3Title: "УПРАВЛЕНИЕ РЕСУРСАМИ",
        feature3Text: "Ищи припасы, создавай инструменты и цени каждый предмет в своей борьбе за выживание.",
        feature4Title: "МОРАЛЬНЫЙ ВЫБОР",
        feature4Text: "Столкнись с трудными решениями, которые проверят твою человечность. Поможешь другим или сосредоточишься на собственном выживании?",
        galleryTitle: "СКРИНШОТЫ",
        minigameTitle: "РАННЕР ВЫЖИВАНИЯ",
        minigameInstructions: "Кликай или нажимай ПРОБЕЛ для прыжка. Избегай препятствий и выживай как можно дольше!",
        trailerTitle: "ИГРОВОЙ ТРЕЙЛЕР",
        contactTitle: "КОНТАКТЫ",
        contactYoutube: "YouTube:",
        contactEmail: "Email:",
        contactPatreon: "Patreon:",
        footerCopyright: "© 2024 SILENT LIFE. Все права защищены."
    },
    ua: {
        heroTitle: "SILENT LIFE",
        heroSubtitle: "Вижити в Окупації",
        buyText: "СКОРО У ПРОДАЖУ",
        aboutTitle: "ПРО ГРУ",
        aboutText: "Silent Life — це хардкорний симулятор виживання на окупованій території. Ніяких монстрів, ніякої радіації — лише сувора реальність життя під окупацією. Кожне рішення має значення. Кожен ресурс на рахунку. Чи зможеш ти вижити?",
        featuresTitle: "КЛЮЧОВІ ОСОБЛИВОСТІ",
        feature1Title: "ХАРДКОРНЕ ВИЖИВАННЯ",
        feature1Text: "Керуй голодом, спрагою та здоров'ям у світі, де ресурси обмежені, а небезпека чатує за кожним рогом.",
        feature2Title: "СКРИТНІСТЬ І ТАКТИКА",
        feature2Text: "Уникай патрулів, ховайся в тінях і приймай стратегічні рішення, щоб залишитися живим на окупованій території.",
        feature3Title: "УПРАВЛІННЯ РЕСУРСАМИ",
        feature3Text: "Шукай припаси, створюй інструменти та цінуй кожен предмет у своїй боротьбі за виживання.",
        feature4Title: "МОРАЛЬНИЙ ВИБІР",
        feature4Text: "Зіткнися зі складними рішеннями, які перевірять твою людяність. Допоможеш іншим чи зосередишся на власному виживанні?",
        galleryTitle: "СКРІНШОТИ",
        minigameTitle: "РАННЕР ВИЖИВАННЯ",
        minigameInstructions: "Клікай або натискай ПРОБІЛ для стрибка. Уникай перешкод і виживай якомога довше!",
        trailerTitle: "ІГРОВИЙ ТРЕЙЛЕР",
        contactTitle: "КОНТАКТИ",
        contactYoutube: "YouTube:",
        contactEmail: "Email:",
        contactPatreon: "Patreon:",
        footerCopyright: "© 2024 SILENT LIFE. Всі права захищені."
    }
};

// Set Language Function
function setLanguage(lang) {
    const t = translations[lang];
    
    // Update all text elements
    document.getElementById('hero-title').textContent = t.heroTitle;
    document.getElementById('hero-subtitle').textContent = t.heroSubtitle;
    document.getElementById('buy-text').textContent = t.buyText;
    document.getElementById('about-title').textContent = t.aboutTitle;
    document.getElementById('about-text').textContent = t.aboutText;
    document.getElementById('features-title').textContent = t.featuresTitle;
    document.getElementById('feature1-title').textContent = t.feature1Title;
    document.getElementById('feature1-text').textContent = t.feature1Text;
    document.getElementById('feature2-title').textContent = t.feature2Title;
    document.getElementById('feature2-text').textContent = t.feature2Text;
    document.getElementById('feature3-title').textContent = t.feature3Title;
    document.getElementById('feature3-text').textContent = t.feature3Text;
    document.getElementById('feature4-title').textContent = t.feature4Title;
    document.getElementById('feature4-text').textContent = t.feature4Text;
    document.getElementById('gallery-title').textContent = t.galleryTitle;
    document.getElementById('minigame-title').textContent = t.minigameTitle;
    document.getElementById('minigame-instructions').textContent = t.minigameInstructions;
    document.getElementById('trailer-title').textContent = t.trailerTitle;
    document.getElementById('contact-title').textContent = t.contactTitle;
    document.getElementById('contact-youtube').textContent = t.contactYoutube;
    document.getElementById('contact-email').textContent = t.contactEmail;
    document.getElementById('contact-patreon').textContent = t.contactPatreon;
    document.getElementById('footer-copyright').textContent = t.footerCopyright;
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Save language preference
    localStorage.setItem('selectedLanguage', lang);
}

// Make setLanguage available globally
window.setLanguage = setLanguage;

// Modal Functions
function openModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    modalImg.src = src;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Make modal functions available globally
window.openModal = openModal;
window.closeModal = closeModal;

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Load saved language or default to English
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLang);
    
    // Setup language button click handlers
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
    
    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Animate gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('SILENT LIFE - Survive the Occupation');