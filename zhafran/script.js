/* ============================================
   MESSAGE ARRAYS – Edit these to change messages
   ============================================ */

const MESSAGES = {
  sad: [
    "I know today hit different. Just breathe first.",
    "It's okay if you cried. That doesn't make you weak.",
    "You don't have to be strong 24/7, stop forcing it.",
    "Bad days don't cancel who you are.",
    "Rest your heart a bit. No one's rushing you.",
    "You survived worse things quietly. You'll get through this too.",
    "Don't make permanent decisions from temporary pain.",
    "Even when you feel heavy, you're still enough."
  ],
  lost: [
    "Not knowing what you're doing doesn't mean you're failing.",
    "You're not behind. You're just moving at your own pace.",
    "It's okay to feel stuck. It's not the end.",
    "You don't need to have everything figured out tonight.",
    "Being confused just means you're thinking.",
    "Maybe this phase is building something you can't see yet.",
    "Slow progress is still progress.",
    "You're allowed to take a different path."
  ],
  doubt: [
    "You're way more capable than your overthinking says.",
    "Your fear talks louder than your potential. Don't believe it.",
    "You've handled harder things than this.",
    "Stop underestimating yourself. Seriously.",
    "You don't see your own growth because you're too close to it.",
    "It's normal to feel small sometimes. You're not.",
    "You're not 'too much'. You're just real.",
    "Trust yourself a little more."
  ],
  reminder: [
    "Peace > proving a point.",
    "You don't owe everyone an explanation.",
    "Protect your energy.",
    "You deserve softness too.",
    "Not everyone is meant to stay forever.",
    "It's okay to choose yourself.",
    "Outgrowing people doesn't make you evil.",
    "Some endings are quiet blessings."
  ]
};

/* ============================================
   TYPING EFFECT
   ============================================ */

function typeText(element, text, speed = 38) {
  return new Promise((resolve) => {
    element.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.textContent = '';
    element.appendChild(cursor);

    let i = 0;

    const interval = setInterval(() => {
      if (i < text.length) {
        const char = document.createTextNode(text[i]);
        element.insertBefore(char, cursor);
        i++;
      } else {
        clearInterval(interval);
        cursor.remove();
        resolve();
      }
    }, speed);
  });
}

/* ============================================
   MODAL LOGIC
   ============================================ */

const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modalMessage');
const modalClose = document.getElementById('modalClose');
const buttons = document.querySelectorAll('.btn');

function openModal(message) {
  modalMessage.innerHTML = '';
  modalOverlay.classList.add('is-open');
  modalOverlay.setAttribute('aria-hidden', 'false');

  // Use requestAnimationFrame to ensure modal is visible before typing
  requestAnimationFrame(() => {
    typeText(modalMessage, message, 35);
  });
}

function closeModal() {
  modalOverlay.classList.remove('is-open');
  modalOverlay.setAttribute('aria-hidden', 'true');
}

function getRandomMessage(category) {
  const messages = MESSAGES[category];
  if (!messages || messages.length === 0) return '';
  return messages[Math.floor(Math.random() * messages.length)];
}

/* ============================================
   INTRO PARTICLES
   ============================================ */

function createParticles() {
  const container = document.getElementById('introParticles');
  if (!container) return;

  const count = 25;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'intro-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 4 + 's';
    particle.style.animationDuration = 3 + Math.random() * 3 + 's';
    container.appendChild(particle);
  }
}

createParticles();

/* ============================================
   INTRO / ENTRY SCREEN
   ============================================ */

const intro = document.getElementById('intro');
const introBtn = document.getElementById('introBtn');
const mainMenu = document.getElementById('mainMenu');

function showMainMenu() {
  intro.classList.add('is-hidden');
  mainMenu.classList.add('is-visible');
  mainMenu.setAttribute('aria-hidden', 'false');
}

introBtn.addEventListener('click', showMainMenu);

intro.addEventListener('click', showMainMenu);

/* ============================================
   EVENT LISTENERS
   ============================================ */

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');
    const message = getRandomMessage(category);
    if (message) {
      openModal(message);
    }
  });
});

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
    closeModal();
  }
});
