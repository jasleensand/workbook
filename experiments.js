// ── EXPERIMENTS PAGE — MACAROON PAGE TURNER ─────────

const pages = [
  'images/content/experiments/pageone.png',
  'images/content/experiments/pagetwo.png',
  'images/content/experiments/pagethree.png'
];

let currentPage = 0;
let biteCount = 0;
let isAnimating = false;

const pageImg      = document.getElementById('pageImg');
const pageCounter  = document.getElementById('pageCounter');
const flipAudio    = document.getElementById('flip-audio');
const macaroon     = document.getElementById('pageMacaroon');

// ── UNLOCK AUDIO ─────────────────────────────────────
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

// ── MACAROON CLICK ───────────────────────────────────
if (macaroon) {
  macaroon.addEventListener('click', () => {
    if (isAnimating) return;

    playFlip();
    biteCount++;

    // advance page
    currentPage = (currentPage + 1) % pages.length;
    pageImg.src = pages[currentPage];
    pageCounter.textContent = `${currentPage + 1} / ${pages.length}`;

    // swap macaroon bite image
    if (biteCount <= 5) {
      macaroon.src = `images/macaroons/purple${biteCount}.png`;
    }

    // on 5th bite — reset macaroon after short delay
    if (biteCount === 5) {
      isAnimating = true;
      setTimeout(() => {
        // fade out
        macaroon.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        macaroon.style.opacity = '0';
        macaroon.style.transform = 'scale(0.5)';

        setTimeout(() => {
         // reset to whole at a slightly different position
          biteCount = 0;
          macaroon.src = 'images/macaroons/purple0.png';

          const positions = [
            { top: '50%', right: '15%' },
            { top: '42%', right: '19%' },
            { top: '55%', right: '6%' },
            { top: '20%', right: '10%' },
          ];
          const randomPos = positions[Math.floor(Math.random() * positions.length)];
          macaroon.style.top = randomPos.top;
          macaroon.style.right = randomPos.right;

          // pop back in
          macaroon.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
          macaroon.style.opacity = '1';
          macaroon.style.transform = 'scale(1)';

          isAnimating = false;
        }, 500);
      }, 400);
    }
  });
}



// ── CLICK PAGE TO ENLARGE ────────────────────────────
const lightbox = document.getElementById('pageLightbox');
const lightboxImg = document.getElementById('lightboxImg');

pageImg.addEventListener('click', () => {
  lightboxImg.src = pageImg.src;
  lightbox.classList.add('active');
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

// ── AUDIO ─────────────────────────────────────────────
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