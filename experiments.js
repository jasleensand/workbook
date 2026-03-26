// ── BOOK PAGE FLIP ──────────────────────────────────

const pages = [
  'images/content/experiments/pageone.png',
  'images/content/experiments/pagetwo.png',
  'images/content/experiments/pagethree.png'
];

let currentPage = 0;
let isScrolling = false;

const pageImg     = document.getElementById('pageImg');
const nextBtn     = document.getElementById('nextBtn');
const pageCounter = document.getElementById('pageCounter');
const flipAudio   = document.getElementById('flip-audio');

// unlock audio on first interaction
window.addEventListener('load', () => {
  if (flipAudio) {
    flipAudio.volume = 0;
    flipAudio.play().then(() => {
      flipAudio.pause();
      flipAudio.currentTime = 0;
      flipAudio.volume = 1;
    }).catch(() => {});
  }
});

// ── SCROLL TO CHANGE PAGE ────────────────────────────
window.addEventListener('wheel', (e) => {
  if (isScrolling) return;
  isScrolling = true;

  if (e.deltaY > 0) {
    // scroll down — next page
    currentPage = (currentPage + 1) % pages.length;
  } else {
    // scroll up — previous page
    currentPage = (currentPage - 1 + pages.length) % pages.length;
  }

  changePage();

  setTimeout(() => { isScrolling = false; }, 600);
});

// ── TOUCH SWIPE ──────────────────────────────────────
let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchend', (e) => {
  const diff = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(diff) < 40) return; // ignore tiny swipes

  if (diff > 0) {
    // swipe up — next page
    currentPage = (currentPage + 1) % pages.length;
  } else {
    // swipe down — previous page
    currentPage = (currentPage - 1 + pages.length) % pages.length;
  }

  changePage();
});

// ── ARROW CLICK STILL WORKS TOO ──────────────────────
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentPage = (currentPage + 1) % pages.length;
    changePage();
  });
}

// ── CHANGE PAGE ──────────────────────────────────────
function changePage() {
  playFlip();
  pageImg.src = pages[currentPage];
  pageCounter.textContent = `${currentPage + 1} / ${pages.length}`;
}

// ── AUDIO ────────────────────────────────────────────
function playFlip() {
  if (flipAudio) {
    flipAudio.currentTime = 0;
    flipAudio.play().catch(() => {});
    setTimeout(() => {
      flipAudio.pause();
      flipAudio.currentTime = 0;
    }, 1000);
  }
}