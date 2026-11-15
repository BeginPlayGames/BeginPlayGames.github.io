(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const languageSelect = document.querySelector("#languageSelect");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const lightboxCaption = lightbox?.querySelector("p");
  const progress = document.querySelector(".reel-progress span");
  const compareFrame = document.querySelector(".compare-frame");
  const compareRange = document.querySelector(".compare-range");

  const bindings = [
    ["pageTitle","title","text"],["metaDescription",'meta[name="description"]',"content"],
    ["brandTitle",".brand b","text"],["brandSubtitle",".brand small","text"],["brandAria",".brand","aria"],["skipStory",".skip-link","text"],["navAria",".main-nav","aria"],
    ["navStory",".main-nav a:nth-child(1)","text"],["navMechanic",".main-nav a:nth-child(2)","text"],
    ["navJournal",".main-nav a:nth-child(3)","text"],["navGlass",".main-nav a:nth-child(4)","text"],
    ["navPlay",".nav-cta","firstText"],["menuOpen",".menu-toggle","aria"],
    ["languageLabel",".language-picker .sr-only","text"],["languageAria","#languageSelect","aria"],
    ["heroKicker",".hero-copy .eyebrow","lastText"],["heroHeading",".hero h1","html"],["heroDeck",".hero-deck","text"],
    ["heroFollow",".hero-actions .button","firstText"],["heroHow",".hero-actions .text-link","firstText"],
    ["heroEngine",".hero-meta span:nth-child(1)","text"],["heroGenre",".hero-meta span:nth-child(3)","text"],["heroAlt",".hero-art","alt"],
    ["heroFrame",".hero-caption span:nth-child(1)","text"],["heroTheme",".hero-caption span:nth-child(2)","text"],
    ["pitchKicker",".intro .section-kicker span:nth-child(1)","text"],["pitchIndex",".intro .section-kicker span:nth-child(2)","text"],
    ["pitchEyebrow",".intro-grid .eyebrow","text"],["pitchHeading",".intro-grid h2","html"],
    ["pitchCopy1",".intro-text p:nth-child(1)","text"],["pitchCopy2",".intro-text p:nth-child(2)","text"],
    ["storyWarmAlt",".story-frame:nth-child(1) img","alt"],["storyCutAlt",".story-frame:nth-child(2) img","alt"],["storyApartAlt",".story-frame:nth-child(3) img","alt"],["storyOldLabel",".story-frame:nth-child(1) figcaption span","text"],["storyOldCaption",".story-frame:nth-child(1) figcaption b","text"],
    ["storyCutLabel",".story-frame:nth-child(2) figcaption span","text"],["storyCutCaption",".story-frame:nth-child(2) figcaption b","text"],
    ["storyApartLabel",".story-frame:nth-child(3) figcaption span","text"],["storyApartCaption",".story-frame:nth-child(3) figcaption b","text"],
    ["mechKicker",".mechanic-section .section-kicker span:nth-child(1)","text"],["mechIndex",".mechanic-section .section-kicker span:nth-child(2)","text"],
    ["mechEyebrow",".mechanic-heading .eyebrow","text"],["mechHeading",".mechanic-heading h2","html"],["mechLead",".mechanic-lead","text"],
    ["step1Label",".step-card:nth-child(1) .step-label","text"],["step1Title",".step-card:nth-child(1) h3","text"],["step1Copy",".step-card:nth-child(1)>p:last-child","text"],
    ["step2Label",".step-card:nth-child(3) .step-label","text"],["step2Title",".step-card:nth-child(3) h3","text"],["step2Copy",".step-card:nth-child(3)>p:last-child","text"],
    ["step3Label",".step-card:nth-child(5) .step-label","text"],["step3Title",".step-card:nth-child(5) h3","text"],["step3Copy",".step-card:nth-child(5)>p:last-child","text"],
    ["designNote",".mechanic-note p","html"],
    ["journalKicker",".journal .section-kicker span:nth-child(1)","text"],["journalIndex",".journal .section-kicker span:nth-child(2)","text"],
    ["journalEyebrow",".journal-title .eyebrow","text"],["journalHeading",".journal-title h2","html"],["journalIntro",".journal-intro","text"],
    ["date12",".timeline-entry:nth-child(1) .timeline-date span","text"],["entry1Tag",".timeline-entry:nth-child(1) .timeline-tag","text"],
    ["entry1Title",".timeline-entry:nth-child(1) h3","text"],["entry1Copy",".timeline-entry:nth-child(1) .timeline-content>p:not(.timeline-tag)","text"],
    ["chip11",".timeline-entry:nth-child(1) .mini-chips span:nth-child(1)","text"],["chip12",".timeline-entry:nth-child(1) .mini-chips span:nth-child(2)","text"],["chip13",".timeline-entry:nth-child(1) .mini-chips span:nth-child(3)","text"],
    ["date13a",".timeline-entry:nth-child(2) .timeline-date span","text"],["entry2Tag",".timeline-entry:nth-child(2) .timeline-tag","text"],
    ["entry2Title",".timeline-entry:nth-child(2) h3","text"],["entry2Copy",".timeline-entry:nth-child(2) .timeline-content>p:not(.timeline-tag)","text"],
    ["quote",".pull-quote span","text"],["quoteSource",".pull-quote small","text"],["entry2Evidence",".evidence-line","html"],
    ["date13b",".timeline-entry:nth-child(3) .timeline-date span","text"],["entry3Tag",".timeline-entry:nth-child(3) .timeline-tag","text"],
    ["entry3Title",".timeline-entry:nth-child(3) h3","text"],["entry3Copy",".timeline-entry:nth-child(3) .timeline-content>p:not(.timeline-tag)","text"],
    ["chip31",".timeline-entry:nth-child(3) .mini-chips span:nth-child(1)","text"],["chip32",".timeline-entry:nth-child(3) .mini-chips span:nth-child(2)","text"],["chip33",".timeline-entry:nth-child(3) .mini-chips span:nth-child(3)","text"],
    ["date14",".timeline-entry:nth-child(4) .timeline-date span","text"],["entry4Tag",".timeline-entry:nth-child(4) .timeline-tag","text"],
    ["entry4Title",".timeline-entry:nth-child(4) h3","text"],["entry4Copy",".timeline-entry:nth-child(4) .timeline-content>p:not(.timeline-tag)","text"],
    ["chip41",".timeline-entry:nth-child(4) .mini-chips span:nth-child(1)","text"],["chip42",".timeline-entry:nth-child(4) .mini-chips span:nth-child(2)","text"],["chip43",".timeline-entry:nth-child(4) .mini-chips span:nth-child(3)","text"],
    ["galleryKicker",".evidence-section .section-kicker span:nth-child(1)","text"],["galleryCount",".evidence-section .section-kicker span:nth-child(2)","text"],
    ["galleryEyebrow",".evidence-heading .eyebrow","text"],["galleryHeading",".evidence-heading h2","html"],["galleryDesc",".evidence-heading>p","text"],
    ["shot1Aria",".shot:nth-child(1) .shot-open","aria"],["shot1Alt",".shot:nth-child(1) img","alt"],["shot1Label",".shot:nth-child(1) figcaption span","text"],["shot1Caption",".shot:nth-child(1) figcaption b","text"],
    ["shot2Aria",".shot:nth-child(2) .shot-open","aria"],["shot2Alt",".shot:nth-child(2) img","alt"],["shot2Label",".shot:nth-child(2) figcaption span","text"],["shot2Caption",".shot:nth-child(2) figcaption b","text"],
    ["shot3Aria",".shot:nth-child(3) .shot-open","aria"],["shot3Alt",".shot:nth-child(3) img","alt"],["shot3Label",".shot:nth-child(3) figcaption span","text"],["shot3Caption",".shot:nth-child(3) figcaption b","text"],
    ["shot4Aria",".shot:nth-child(4) .shot-open","aria"],["shot4Alt",".shot:nth-child(4) img","alt"],["shot4Label",".shot:nth-child(4) figcaption span","text"],["shot4Caption",".shot:nth-child(4) figcaption b","text"],
    ["shot5Aria",".shot:nth-child(5) .shot-open","aria"],["shot5Alt",".shot:nth-child(5) img","alt"],["shot5Label",".shot:nth-child(5) figcaption span","text"],["shot5Caption",".shot:nth-child(5) figcaption b","text"],
    ["compareKicker",'[data-i18n="compareKicker"]',"text"],["compareDrag",'[data-i18n="compareDrag"]',"text"],
    ["compareEyebrow",'[data-i18n="compareEyebrow"]',"text"],["compareHeading",'[data-i18n-html="compareHeading"]',"html"],
    ["compareBody",'[data-i18n="compareBody"]',"text"],["compareHint",'[data-i18n="compareHint"]',"text"],
    ["compareBefore",'[data-i18n="compareBefore"]',"text"],["compareAfter",'[data-i18n="compareAfter"]',"text"],
    ["compareRange",'[data-i18n-aria="compareRange"]',"aria"],
    ["compareBeforeAlt",'[data-i18n-alt="compareBeforeAlt"]',"alt"],["compareAfterAlt",'[data-i18n-alt="compareAfterAlt"]',"alt"],
    ["glassKicker",".glass-box .section-kicker span:nth-child(1)","text"],["glassIndex",".glass-box .section-kicker span:nth-child(2)","text"],
    ["glassEyebrow",".glass-heading .eyebrow","text"],["glassHeading",".glass-heading h2","html"],["glassLead",".glass-lead","text"],
    ["glass1Index",".glass-card:nth-child(1) .glass-index","text"],["glass1Title",".glass-card:nth-child(1) h3","text"],["glass1Copy",".glass-card:nth-child(1) p","text"],["glass1Stamp",".glass-card:nth-child(1) .glass-stamp","text"],
    ["glass2Index",".glass-card:nth-child(2) .glass-index","text"],["glass2Title",".glass-card:nth-child(2) h3","text"],["glass2Copy",".glass-card:nth-child(2) p","text"],["glass2Stamp",".glass-card:nth-child(2) .glass-stamp","text"],
    ["glass3Index",".glass-card:nth-child(3) .glass-index","text"],["glass3Title",".glass-card:nth-child(3) h3","text"],["glass3Copy",".glass-card:nth-child(3) p","text"],["glass3Stamp",".glass-card:nth-child(3) .glass-stamp","text"],
    ["glass4Index",".glass-card:nth-child(4) .glass-index","text"],["glass4Title",".glass-card:nth-child(4) h3","text"],["glass4Copy",".glass-card:nth-child(4) p","text"],["glass4Stamp",".glass-card:nth-child(4) .glass-stamp","text"],
    ["glassFootnote",".glass-footnote p","html"],["closingKicker",".closing-content .eyebrow","text"],
    ["closingHeading",".closing-content h2","html"],["closingCopy",".closing-content>p:not(.eyebrow)","text"],
    ["closingButton",".closing-content>.button","firstText"],["jamLink",".jam-link","text"],
    ["footerBrand",".footer-brand","text"],["footerStrap",".site-footer>span","text"],["footerTop",".back-top","text"],["lightboxClose",".lightbox-close","aria"],["lightboxAria",".lightbox","aria"]
  ];

  const original = new Map();
  for (const [key, selector, mode] of bindings) {
    const element = document.querySelector(selector);
    if (!element) continue;
    const value = mode === "html" ? element.innerHTML :
      mode === "content" ? element.getAttribute("content") :
      mode === "alt" ? element.getAttribute("alt") :
      mode === "aria" ? element.getAttribute("aria-label") :
      mode === "firstText" ? Array.from(element.childNodes).find((node) => node.nodeType === 3)?.nodeValue :
      mode === "lastText" ? Array.from(element.childNodes).filter((node) => node.nodeType === 3).at(-1)?.nodeValue :
      element.textContent;
    original.set(key, { element, mode, value });
  }

  function writeBinding(key, value) {
    const item = original.get(key);
    if (!item) return;
    const { element, mode } = item;
    if (mode === "html") element.innerHTML = value;
    else if (mode === "content") element.setAttribute("content", value);
    else if (mode === "alt") element.setAttribute("alt", value);
    else if (mode === "aria") element.setAttribute("aria-label", value);
    else if (mode === "firstText" || mode === "lastText") {
      const nodes = Array.from(element.childNodes).filter((node) => node.nodeType === 3);
      const target = mode === "firstText" ? nodes[0] : nodes.at(-1);
      if (target) target.nodeValue = value;
    } else element.textContent = value;
  }

  const keyedOriginal = new WeakMap();
  const keyedElements = [
    ...document.querySelectorAll("[data-i18n]"),
    ...document.querySelectorAll("[data-i18n-html]"),
    ...document.querySelectorAll("[data-i18n-alt]"),
    ...document.querySelectorAll("[data-i18n-aria]")
  ];
  keyedElements.forEach((element) => {
    const kind = element.hasAttribute("data-i18n-html") ? "html" :
      element.hasAttribute("data-i18n-alt") ? "alt" :
      element.hasAttribute("data-i18n-aria") ? "aria" : "text";
    const value = kind === "html" ? element.innerHTML :
      kind === "alt" ? element.getAttribute("alt") :
      kind === "aria" ? element.getAttribute("aria-label") : element.textContent;
    keyedOriginal.set(element, { kind, value });
  });
  function applyLocale(locale) {
    const dictionary = window.LLTranslations?.[locale] || {};
    for (const [key] of bindings) writeBinding(key, dictionary[key] ?? original.get(key)?.value ?? "");
    for (const element of document.querySelectorAll("[data-i18n]")) {
      const key = element.dataset.i18n;
      const saved = keyedOriginal.get(element); if (dictionary[key] !== undefined) element.textContent = dictionary[key]; else if (saved) element.textContent = saved.value;
    }
    for (const element of document.querySelectorAll("[data-i18n-html]")) {
      const key = element.dataset.i18nHtml;
      const saved = keyedOriginal.get(element); if (dictionary[key] !== undefined) element.innerHTML = dictionary[key]; else if (saved) element.innerHTML = saved.value;
    }
    for (const element of document.querySelectorAll("[data-i18n-alt]")) {
      const key = element.dataset.i18nAlt;
      const saved = keyedOriginal.get(element); if (dictionary[key] !== undefined) element.alt = dictionary[key]; else if (saved) element.alt = saved.value;
    }
    for (const element of document.querySelectorAll("[data-i18n-aria]")) {
      const key = element.dataset.i18nAria;
      const saved = keyedOriginal.get(element); if (dictionary[key] !== undefined) element.setAttribute("aria-label", dictionary[key]); else if (saved) element.setAttribute("aria-label", saved.value);
    }
    document.documentElement.lang = locale;
    if (languageSelect) languageSelect.value = locale;
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", document.querySelector('meta[name="description"]')?.content || "");
    const menuIsOpen = menuButton?.getAttribute("aria-expanded") === "true";
    if (menuButton) menuButton.setAttribute("aria-label", dictionary[menuIsOpen ? "menuClose" : "menuOpen"] || (menuIsOpen ? "Close navigation" : "Open navigation"));
    try { localStorage.setItem("last-lantern-language", locale); } catch (_) {}
  }

  languageSelect?.addEventListener("change", () => applyLocale(languageSelect.value));
  const preferredLocale = (() => {
    try { return localStorage.getItem("last-lantern-language") || "en"; } catch (_) { return "en"; }
  })();
  applyLocale(["en", "ru", "es", "fr"].includes(preferredLocale) ? preferredLocale : "en");

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? (window.LLTranslations?.[languageSelect?.value]?.menuClose || "Close navigation") : (window.LLTranslations?.[languageSelect?.value]?.menuOpen || "Open navigation"));
    nav?.classList.toggle("is-open", open);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open"); menuButton?.setAttribute("aria-label", window.LLTranslations?.[languageSelect?.value]?.menuOpen || "Open navigation");
  }));

  document.querySelectorAll(".shot-open").forEach((button) => button.addEventListener("click", () => {
    const image = button.querySelector("img");
    if (!image || !lightbox || !lightboxImage) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = button.nextElementSibling?.textContent.trim() || image.alt;
    lightbox.showModal();
  }));
  lightbox?.querySelector(".lightbox-close")?.addEventListener("click", () => lightbox.close());
  lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });

  compareRange?.addEventListener("input", () => compareFrame?.style.setProperty("--compare", compareRange.value + "%"));

  const revealTargets = document.querySelectorAll(".intro-grid, .story-frame, .step-card, .timeline-entry, .shot, .glass-card, .glass-footnote, .compare-copy, .compare-frame");
  revealTargets.forEach((element) => {
    const siblings = Array.from(element.parentElement?.children || []);
    element.style.setProperty("--reveal-delay", Math.min(siblings.indexOf(element), 4) * 75 + "ms");
    element.classList.add("reveal");
  });
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); currentObserver.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealTargets.forEach((element) => observer.observe(element));
  } else revealTargets.forEach((element) => element.classList.add("is-visible"));

  let scrollFrame = false;
  function updateProgress() {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty("--page-progress", range > 0 ? String(window.scrollY / range) : "0");
    scrollFrame = false;
  }
  window.addEventListener("scroll", () => {
    if (!scrollFrame) { requestAnimationFrame(updateProgress); scrollFrame = true; }
  }, { passive: true });
  updateProgress();
})();




