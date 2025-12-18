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
    // Fallback if language not found
    if (!translations[lang]) {
        console.warn(`Language '${lang}' not found, defaulting to 'en'`);
        lang = 'en';
    }

    const t = translations[lang];

    // Helper to safely set text content
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = text;
        }
    };

    // Update all text elements safely
    setText('hero-title', t.heroTitle);
    setText('hero-subtitle', t.heroSubtitle);
    setText('buy-text', t.buyText);
    setText('about-title', t.aboutTitle);
    setText('about-text', t.aboutText);
    setText('features-title', t.featuresTitle);
    setText('feature1-title', t.feature1Title);
    setText('feature1-text', t.feature1Text);
    setText('feature2-title', t.feature2Title);
    setText('feature2-text', t.feature2Text);
    setText('feature3-title', t.feature3Title);
    setText('feature3-text', t.feature3Text);
    setText('feature4-title', t.feature4Title);
    setText('feature4-text', t.feature4Text);
    setText('gallery-title', t.galleryTitle);
    setText('trailer-title', t.trailerTitle);
    setText('contact-title', t.contactTitle);
    setText('contact-youtube', t.contactYoutube);
    setText('contact-email', t.contactEmail);
    setText('contact-patreon', t.contactPatreon);
    setText('footer-copyright', t.footerCopyright);

    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Save language preference
    try {
        localStorage.setItem('selectedLanguage', lang);
    } catch (e) {
        console.warn('Could not save language preference:', e);
    }
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

// Auth Modal Functions
function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchAuthTab(tabName) {
    // Update tabs
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));

    // Safety check for tab elements
    const selectedTab = document.getElementById(`tab-${tabName}`);
    if (selectedTab) selectedTab.classList.add('active');

    // Update forms
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));

    const selectedForm = document.getElementById(`${tabName}Form`);
    if (selectedForm) selectedForm.classList.add('active');
}

function handleLogin(e) {
    e.preventDefault();
    alert('ACCESS GRANTED. Welcome back, survivor.');
    closeAuthModal();
}

function handleSignup(e) {
    e.preventDefault();
    alert('REGISTRATION COMPLETE. Welcome to the resistance.');
    closeAuthModal();
}

// Make auth functions available globally
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthTab = switchAuthTab;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;

// Close modal on outside click (reusing existing listener logic if possible, or adding new)
window.addEventListener('click', (e) => {
    const authModal = document.getElementById('authModal');
    if (e.target === authModal) {
        closeAuthModal();
    }
});

// Close modal on Escape key (Enhanced existing listener)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal(); // Existing image modal
        closeAuthModal(); // New auth modal
    }
});

// Parallax Effect
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.getElementById('hero');
            if (hero) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
            ticking = false;
        });
        ticking = true;
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