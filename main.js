// ── BITE STATE ──────────────────────────────────
// tracks how many bites each macaroon has had
const biteState = {
  pink:   0,
  purple: 0,
  blue:   0,
  yellow: 0
};

// ── CLICK HANDLERS ──────────────────────────────
document.querySelectorAll('.macaroon-item').forEach(item => {
  item.addEventListener('click', () => {
    const id   = item.dataset.id;
    const page = item.dataset.page;
    handleBite(id, page);
  });
});

// ── HANDLE BITE ─────────────────────────────────
function handleBite(id, page) {
  const current = biteState[id];
  if (current >= 5) return;

  // 1. play munch sound
  playMunch();

  // 2. advance bite state
  biteState[id] = current + 1;

    // 3. swap image
  const img = document.getElementById(id);
  if (biteState[id] === 5) {
    img.src = `images/macaroons/${id}${biteState[id]}.png`;
    setTimeout(() => {
      img.style.opacity = '0';
      img.style.transform = 'scale(0.5)';
      img.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    }, 500);
  } else {
    img.src = `images/macaroons/${id}${biteState[id]}.png`;
  }

  // 4. fill progress dot
  // dots only go 0-3 (4 dots for 5 clicks, last click redirects)
  if (current < 4) {
    const dot = document.getElementById(`${id}-d${current}`);
    if (dot) dot.classList.add('filled');
  }

  // 5. toast messages
  const messages = [
    'Mmm… first bite!',
    'Getting there…',
    'Almost gone!',
    'One more bite…',
    `Off to ${page.replace('.html', '')}!`
  ];
  showToast(messages[current]);

     // 6. on 5th bite — fade out then redirect
  if (biteState[id] === 5) {
    setTimeout(() => {
      const veil = document.getElementById('transition-veil');
      veil.classList.add('active');
      setTimeout(() => {
        window.location.href = page;
      }, 600);
    }, 2200);
  }
}
// ── AUDIO ────────────────────────────────────────
function playMunch() {
  const audio = document.getElementById('munch-audio');
  if (!audio) return;
  
  if (window.munchTimeout) {
    clearTimeout(window.munchTimeout);
  }
  
  audio.pause();
  audio.currentTime = 2;
  audio.play().catch(() => {});
  
  window.munchTimeout = setTimeout(() => {
    audio.pause();
    audio.currentTime = 2;
  }, 1000);
}

// ── UNLOCK AUDIO ON PAGE LOAD ────────────────────
window.addEventListener('load', () => {
  const audio = document.getElementById('munch-audio');
  if (audio) {
    audio.volume = 0;
    audio.currentTime = 2;
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 2;
      audio.volume = 1;
    }).catch(() => {});
  }
});

// ── TOAST ────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = msg;

  const x = 10 + Math.random() * 70;
  const y = 10 + Math.random() * 70;
  const angle = (Math.random() - 0.5) * 30;

  toast.style.cssText = `
    position: fixed;
    left: ${x}%;
    top: ${y}%;
    transform: translate(-50%, -50%) scale(0.8) rotate(${angle}deg);
    background: #3B2A1A;
    color: #FAF5EC;
    padding: 0.5rem 1.4rem;
    border-radius: 40px;
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    pointer-events: none;
    z-index: 200;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = `translate(-50%, -50%) scale(1) rotate(${angle}deg)`;
    });
  });

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = `translate(-50%, -50%) scale(0.8) rotate(${angle}deg)`;
    setTimeout(() => toast.remove(), 300);
  }, 1800);
}

  // animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });

  // animate out and remove
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, -50%) scale(0.8)';
    setTimeout(() => toast.remove(), 300);
  }, 1800);
