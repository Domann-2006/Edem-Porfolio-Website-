/* ============================================================
   SOLACE PAUL EDEN | script.js
   Premium Personal Brand Website
   Diction Coach | Public Speaker | MC | Etiquette Trainer
   ============================================================ */

/* ===================== DOM READY ===================== */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initTheme();
  initNav();
  initScrollReveal();
  initCounters();
  initBackToTop();
  initForms();
  initFooterYear();
  initChatbot();
});

/* ============================================================
   1. PRELOADER
   ============================================================ */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Wait for animation to finish (1.8s) then hide
  setTimeout(() => {
    preloader.classList.add('hidden');
    // Remove from DOM after transition
    setTimeout(() => {
      preloader.remove();
    }, 600);
  }, 2000);
}

/* ============================================================
   2. DARK / LIGHT THEME TOGGLE
   ============================================================ */
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const icon   = document.getElementById('theme-icon');
  const html   = document.documentElement;

  // Load saved preference
  const saved = localStorage.getItem('spe-theme') || 'light';
  applyTheme(saved);

  toggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('spe-theme', next);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

/* ============================================================
   3. STICKY NAVIGATION
   ============================================================ */
function initNav() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const links     = navLinks?.querySelectorAll('a') || [];

  /* ---- Sticky on scroll ---- */
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    updateActiveLink();
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile hamburger ---- */
  hamburger?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  /* ---- Close nav on link click (mobile) ---- */
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('open');
      hamburger?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Active link highlighting ---- */
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    let current = '';

    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= navH + 20) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
}

/* ============================================================
   4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ============================================================ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after reveal to save performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}

/* ============================================================
   5. ANIMATED COUNTERS
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10) || 0;
    const duration = 1800; // ms
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const ease     = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }
}

/* ============================================================
   6. BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   7. FORM VALIDATION & SUBMISSION
   ============================================================ */
function initForms() {
  handleForm('booking-form', 'booking-success');
  handleForm('quote-form',   'quote-success');
}

function handleForm(formId, successId) {
  const form    = document.getElementById(formId);
  const success = document.getElementById(successId);
  if (!form || !success) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all required fields
    let valid = true;
    const required = form.querySelectorAll('[required]');

    required.forEach(field => {
      const error = field.parentElement.querySelector('.field-error');
      const val   = field.value.trim();

      // Reset
      field.classList.remove('error');
      if (error) error.textContent = '';

      // Empty check
      if (!val) {
        field.classList.add('error');
        if (error) error.textContent = 'This field is required.';
        valid = false;
        return;
      }

      // Email check
      if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        field.classList.add('error');
        if (error) error.textContent = 'Please enter a valid email address.';
        valid = false;
        return;
      }

      // Phone check (basic)
      if (field.type === 'tel' && !/^[\d\s\+\-\(\)]{7,}$/.test(val)) {
        field.classList.add('error');
        if (error) error.textContent = 'Please enter a valid phone number.';
        valid = false;
        return;
      }

      // Date: must be at least 14 days in future
      if (field.type === 'date') {
        const today    = new Date();
        const selected = new Date(val);
        const diffDays = Math.ceil((selected - today) / (1000 * 60 * 60 * 24));
        if (diffDays < 14) {
          field.classList.add('error');
          if (error) error.textContent = 'Bookings require at least 2 weeks\' notice.';
          valid = false;
          return;
        }
      }
    });

    if (!valid) return;

    // Simulate submission (replace with actual fetch/API call)
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      form.style.display = 'none';
      success.style.display = 'block';
    }, 1400);
  });

  // Real-time field validation (on blur)
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('blur', () => {
      const error = field.parentElement.querySelector('.field-error');
      if (field.value.trim()) {
        field.classList.remove('error');
        if (error) error.textContent = '';
      }
    });
  });
}

/* ============================================================
   8. FOOTER YEAR
   ============================================================ */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   9. AI CHATBOT
   ============================================================ */

/* ---- KNOWLEDGE BASE ---- */
/*
 * Each entry has:
 *   keywords : array of strings/phrases to match against user input (lowercase)
 *   response : string response from the bot
 *
 * The matching logic checks if ANY keyword is found in the user message.
 * Entries are checked in order; the first match wins.
 * A default fallback is used when no match is found.
 */
const CHATBOT_KB = [
  /* ---- Services ---- */
  {
    keywords: ['service', 'offer', 'do you do', 'what do', 'help me with'],
    response:
      '👋 I offer a range of premium services:\n\n' +
      '🗣️ <strong>Diction Training</strong> – Children, adults, corporate (British Accent, Phonics, Phonetics)\n' +
      '📚 <strong>English Language Coaching</strong> – Phonics, Phonetics, Exam Prep (all levels)\n' +
      '🎤 <strong>Public Speaking</strong> – Keynotes, workshops, schools (500+ audiences)\n' +
      '🎭 <strong>MC Services</strong> – Awards, birthdays, valedictory services\n' +
      '💎 <strong>Etiquette Training</strong> – Schools, individuals, all etiquette types\n' +
      '📱 <strong>Social Media Coaching</strong> – Personal branding & content creation\n' +
      '🤝 <strong>Brand Collaborations</strong> – Partnerships & sponsorships\n\n' +
      'Which service interests you most?'
  },

  /* ---- Online classes ---- */
  {
    keywords: ['online', 'virtual', 'zoom', 'remote', 'online class', 'online session'],
    response:
      '✅ Yes! Online sessions are fully available for:\n\n' +
      '• Diction Training\n• English Language Coaching\n• Social Media Coaching\n• Etiquette Training\n\n' +
      'Sessions are conducted via Zoom, Google Meet, or your preferred platform. Flexible scheduling available. 📱'
  },

  /* ---- British Accent ---- */
  {
    keywords: ['british', 'accent', 'british accent', 'uk accent', 'received pronunciation'],
    response:
      '🇬🇧 Absolutely! British Accent training is one of the core specialities.\n\n' +
      'The training covers:\n• Received Pronunciation (RP)\n• Vowel & consonant sounds\n• Stress & intonation patterns\n• Rhythm and connected speech\n\n' +
      'Available online & in person, private or group. Duration is negotiable. Would you like to book a session?'
  },

  /* ---- Pricing ---- */
  {
    keywords: ['price', 'cost', 'fee', 'charge', 'how much', 'rate', 'pricing', 'quote'],
    response:
      '💰 Pricing varies based on:\n\n' +
      '• Service type\n• Session duration\n• Group or private\n• Online or in-person\n• Location (travel may apply)\n\n' +
      'To get an accurate quote tailored to your needs, please:\n' +
      '📧 Email: Crystarpaul@gmail.com\n' +
      '📱 WhatsApp: 07068788090\n' +
      'Or use the <strong>Request a Quote</strong> form on the website. I\'ll respond within 24–48 hours!'
  },

  /* ---- Booking ---- */
  {
    keywords: ['book', 'booking', 'schedule', 'appointment', 'reserve', 'how to book', 'how do i book'],
    response:
      '📅 Booking is simple! Here\'s how:\n\n' +
      '1️⃣ Fill out the <strong>Book a Session</strong> form on this website\n' +
      '2️⃣ Or WhatsApp directly: <strong>07068788090</strong>\n' +
      '3️⃣ Or email: <strong>Crystarpaul@gmail.com</strong>\n\n' +
      '⚠️ Important booking rules:\n' +
      '• Minimum <strong>2 weeks\' advance notice</strong>\n' +
      '• <strong>50% deposit</strong> required to confirm\n' +
      '• Available <strong>all 7 days</strong> of the week'
  },

  /* ---- Travel ---- */
  {
    keywords: ['travel', 'come to', 'location', 'visit', 'your city', 'available in', 'where are you'],
    response:
      '✈️ Yes! I am open to travel across Nigeria and internationally.\n\n' +
      'I\'ve worked in Lagos, Abuja, Port Harcourt, and beyond. Travel logistics and fees can be discussed during the quote process.\n\n' +
      'Just let me know your location and I\'ll make it happen! 🌍'
  },

  /* ---- Experience ---- */
  {
    keywords: ['experience', 'how long', 'years', 'background', 'career', 'track record'],
    response:
      '🏆 Here\'s the experience profile:\n\n' +
      '📖 <strong>20+ years</strong> of general teaching experience\n' +
      '🗣️ <strong>10+ years</strong> of professional diction training\n' +
      '🎭 <strong>5+ years</strong> as a Master of Ceremonies\n' +
      '👥 <strong>500+</strong> audience capacity for public speaking\n\n' +
      'Founder of <strong>Right Speech Concept</strong> — a premier platform transforming communication one voice at a time.'
  },

  /* ---- Public Speaking Topics ---- */
  {
    keywords: ['speak', 'topic', 'keynote', 'talk about', 'speaking topic', 'what do you speak on', 'public speaking'],
    response:
      '🎤 Public speaking topics include:\n\n' +
      '• <strong>Pros & Cons of Teaching</strong> – For educators & institutions\n' +
      '• <strong>The Power of Right Diction</strong> – Its impact on personal & professional life\n' +
      '• <strong>Helping Children with Reading Difficulties</strong> – Practical, parent & teacher-focused\n\n' +
      'Delivery is structured, lively, and audience-centred. Can speak to audiences of <strong>500+</strong>.\n' +
      'Available for schools, workshops, conferences & corporate events. 🎯'
  },

  /* ---- Phonetics / Phonics ---- */
  {
    keywords: ['phonetics', 'phonics', 'pronunciation', 'ipa', 'sounds', 'speech'],
    response:
      '🔤 Yes! Phonics and Phonetics training is available for:\n\n' +
      '• Children (early reading & literacy)\n• Adults (accent refinement)\n• Professionals & corporates\n• Exam preparation\n\n' +
      'The teaching approach is methodical yet engaging — combining IPA symbols, audio drills, and real-life application. Both online and in-person available!'
  },

  /* ---- Qualifications ---- */
  {
    keywords: ['qualification', 'certified', 'degree', 'trained', 'credential', 'nce', 'tefl', 'speech pathology'],
    response:
      '🎓 Qualifications include:\n\n' +
      '• Nigeria Certificate in Education (NCE)\n' +
      '• Diploma in Education\n' +
      '• Speech Pathology\n' +
      '• TEFL (Teaching English as a Foreign Language)\n' +
      '• Tech Tools Bootcamp\n' +
      '• 🏆 <strong>Certificate of Excellence</strong> — Favour Heights Academy\n\n' +
      'A fully qualified, multi-disciplinary communication specialist!'
  },

  /* ---- Clients / Worked with ---- */
  {
    keywords: ['client', 'worked with', 'who have you', 'school', 'company', 'organisation', 'organization', 'partner'],
    response:
      '🏢 Notable engagements include:\n\n' +
      '• <strong>GS Apex Stars School</strong>\n' +
      '• <strong>Right Speech Concept</strong> (Founded & led)\n' +
      '• <strong>Joe – Mighty Empire</strong>\n\n' +
      'Open to new partnerships, school engagements, corporate training, and brand collaborations. 🤝'
  },

  /* ---- Etiquette ---- */
  {
    keywords: ['etiquette', 'manners', 'dining', 'social grace', 'deportment', 'comportment'],
    response:
      '💎 Etiquette Training is available for:\n\n' +
      '• Schools (students and staff)\n• Individuals (personal development)\n• Corporate (business etiquette)\n\n' +
      'Topics covered include:\n' +
      '• Social & dining etiquette\n• Business & workplace etiquette\n• Personal grooming & presentation\n• Digital & communication etiquette\n\n' +
      'Duration is negotiable. Online and in-person sessions available!'
  },

  /* ---- Custom quote ---- */
  {
    keywords: ['custom', 'tailored', 'specific', 'special', 'bespoke', 'my own', 'custom quote'],
    response:
      '✨ Custom quotes are absolutely available!\n\n' +
      'Every client is unique, so I tailor packages to your specific needs, audience, duration, and goals.\n\n' +
      'To get a custom quote:\n' +
      '📋 Fill out the <strong>Request a Quote</strong> form on this site\n' +
      '📧 Or email: <strong>Crystarpaul@gmail.com</strong>\n' +
      '📱 Or WhatsApp: <strong>07068788090</strong>\n\n' +
      'I\'ll get back to you within 24–48 hours!'
  },

  /* ---- Advance notice ---- */
  {
    keywords: ['advance', 'notice', 'how far', 'when to book', 'last minute', 'deposit', 'payment'],
    response:
      '📌 Booking Policies:\n\n' +
      '⏰ <strong>2 Weeks Notice</strong> – All bookings require a minimum of 2 weeks\' advance notice.\n' +
      '💳 <strong>50% Deposit</strong> – A 50% deposit is required to confirm your booking.\n' +
      '📅 <strong>All Days Available</strong> – Available 7 days a week.\n' +
      '✈️ <strong>Travel</strong> – Open to travel within Nigeria and beyond.\n\n' +
      'Ready to book? Use the booking form or WhatsApp me at 07068788090!'
  },

  /* ---- MC / Host ---- */
  {
    keywords: ['mc', 'master of ceremonies', 'host', 'emcee', 'compere', 'anchor', 'event host'],
    response:
      '🎭 MC services are available for:\n\n' +
      '• Award Ceremonies\n• Birthday Celebrations\n• Valedictory Services\n• Corporate Events\n\n' +
      'With 5+ years of MC experience, I bring warmth, authority, elegance, and energy to every event.\n\n' +
      'Contact for availability and pricing: 07068788090 (WhatsApp) or Crystarpaul@gmail.com'
  },

  /* ---- Greetings ---- */
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greet'],
    response:
      '👋 Hello! Welcome to Solace Paul Edem\'s website.\n\n' +
      'I\'m here to help you learn about services, booking, pricing, and more.\n\n' +
      'What can I help you with today? You can ask about:\n' +
      '• Services & pricing\n• How to book\n• Qualifications\n• Public speaking topics\n• Online classes\n• And more!'
  },

  /* ---- Thank you ---- */
  {
    keywords: ['thank', 'thanks', 'appreciate', 'helpful', 'great'],
    response:
      '😊 You\'re very welcome! It\'s a pleasure to assist you.\n\n' +
      'Feel free to ask anything else, or go ahead and book a session — I\'d love to help you transform your voice! 🌟'
  }
];

/* ---- DEFAULT FALLBACK ---- */
const CHATBOT_FALLBACK =
  '🤔 I\'m not quite sure I understood that, but I\'m here to help!\n\n' +
  'You can ask me about:\n' +
  '• Services & pricing\n• How to book a session\n• Online classes\n• Qualifications\n• British accent training\n• Public speaking topics\n\n' +
  'Or contact directly:\n📱 WhatsApp: 07068788090\n📧 Email: Crystarpaul@gmail.com';

/* ---- CHATBOT LOGIC ---- */
function initChatbot() {
  const toggleBtn  = document.getElementById('chatbot-toggle');
  const window_    = document.getElementById('chatbot-window');
  const closeBtn   = document.getElementById('chat-close-btn');
  const form       = document.getElementById('chat-form');
  const input      = document.getElementById('chat-input');
  const messages   = document.getElementById('chat-messages');
  const quickBtns  = document.querySelectorAll('.quick-btn');
  const openIcon   = document.getElementById('chat-icon-open');
  const closeIcon  = document.getElementById('chat-icon-close');
  const notif      = document.querySelector('.chat-notif');

  let isOpen = false;

  /* ---- Open / Close ---- */
  function openChat() {
    isOpen = true;
    window_.style.display = 'flex';
    window_.style.flexDirection = 'column';
    toggleBtn.setAttribute('aria-expanded', 'true');
    openIcon.style.display  = 'none';
    closeIcon.style.display = 'block';
    if (notif) notif.style.display = 'none';

    // Send welcome message on first open
    if (messages.children.length === 0) {
      setTimeout(() => {
        addBotMessage(
          '👋 Hi there! I\'m Solace\'s AI assistant.\n\n' +
          'I can answer questions about services, booking, pricing, qualifications, and more.\n\n' +
          'What would you like to know?'
        );
      }, 300);
    }

    // Scroll to bottom
    scrollMessages();
    input.focus();
  }

  function closeChat() {
    isOpen = false;
    window_.style.display = 'none';
    toggleBtn.setAttribute('aria-expanded', 'false');
    openIcon.style.display  = 'block';
    closeIcon.style.display = 'none';
  }

  toggleBtn?.addEventListener('click', () => {
    isOpen ? closeChat() : openChat();
  });

  closeBtn?.addEventListener('click', closeChat);

  /* ---- Form submit ---- */
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = '';
    input.focus();

    // Show typing indicator, then respond
    const typingEl = addTypingIndicator();
    setTimeout(() => {
      typingEl.remove();
      const response = getChatbotResponse(text);
      addBotMessage(response);
    }, 900);
  });

  /* ---- Quick buttons ---- */
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.dataset.query;
      if (!query) return;

      if (!isOpen) openChat();

      addUserMessage(query);
      const typingEl = addTypingIndicator();
      setTimeout(() => {
        typingEl.remove();
        const response = getChatbotResponse(query);
        addBotMessage(response);
      }, 700);
    });
  });

  /* ---- Add messages to DOM ---- */
  function addUserMessage(text) {
    const el = document.createElement('div');
    el.className = 'chat-msg user';
    el.textContent = text;
    messages.appendChild(el);
    scrollMessages();
  }

  function addBotMessage(text) {
    const el = document.createElement('div');
    el.className = 'chat-msg bot';
    // Allow basic HTML formatting in bot messages
    el.innerHTML = text.replace(/\n/g, '<br>');
    messages.appendChild(el);
    scrollMessages();
  }

  function addTypingIndicator() {
    const el = document.createElement('div');
    el.className = 'typing-indicator';
    el.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    messages.appendChild(el);
    scrollMessages();
    return el;
  }

  function scrollMessages() {
    requestAnimationFrame(() => {
      messages.scrollTop = messages.scrollHeight;
    });
  }

  /* ---- Response matching engine ---- */
  function getChatbotResponse(userInput) {
    const lower = userInput.toLowerCase().trim();

    // Check each KB entry for a keyword match
    for (const entry of CHATBOT_KB) {
      for (const kw of entry.keywords) {
        if (lower.includes(kw.toLowerCase())) {
          return entry.response;
        }
      }
    }

    // No match found → fallback
    return CHATBOT_FALLBACK;
  }
}

/* ============================================================
   UTILITY: Smooth scroll for anchor links (older browsers fallback)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
    ) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================================
   GALLERY: Simple lightbox on image click
   ============================================================ */
(function initGalleryLightbox() {
  const items = document.querySelectorAll('.gallery-item img');
  if (!items.length) return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.cssText =
    'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;' +
    'align-items:center;justify-content:center;cursor:zoom-out;animation:fadeInOverlay 0.2s ease;';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Image lightbox');
  overlay.setAttribute('aria-modal', 'true');

  const img = document.createElement('img');
  img.style.cssText =
    'max-width:90vw;max-height:90vh;border-radius:8px;box-shadow:0 20px 80px rgba(0,0,0,0.8);';
  img.setAttribute('alt', 'Gallery image enlarged view');

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.setAttribute('aria-label', 'Close lightbox');
  closeBtn.style.cssText =
    'position:absolute;top:20px;right:28px;background:rgba(201,168,76,0.9);border:none;' +
    'color:#0A0A0F;font-size:1.8rem;width:44px;height:44px;border-radius:50%;cursor:pointer;' +
    'display:flex;align-items:center;justify-content:center;font-weight:700;';

  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  // Open on image click
  items.forEach(item => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => {
      img.src = item.src;
      img.alt = item.alt;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // Close
  function closeLightbox() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });
  closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display === 'flex') closeLightbox();
  });
})();
