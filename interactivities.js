// ── DRAG TO SORT RECIPE CARDS ──────────────────────
const cards = document.querySelectorAll('.recipe-card');

cards.forEach(card => {
  card.addEventListener('mousedown', startDrag);
  card.addEventListener('touchstart', startDrag, { passive: true });
});

let activeCard = null;
let startX, startY, startLeft, startTop;

function startDrag(e) {
  activeCard = e.currentTarget;

  // bring to front
  document.querySelectorAll('.recipe-card').forEach(c => {
    c.style.zIndex = 2;
  });
  activeCard.style.zIndex = 100;
  activeCard.classList.add('dragging');

  const touch = e.touches ? e.touches[0] : e;
  startX = touch.clientX;
  startY = touch.clientY;

  const rect = activeCard.getBoundingClientRect();
  startLeft = rect.left;
  startTop  = rect.top;

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag, { passive: true });
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);
}

function onDrag(e) {
  if (!activeCard) return;
  const touch = e.touches ? e.touches[0] : e;

  const dx = touch.clientX - startX;
  const dy = touch.clientY - startY;

  // get current CSS transform values
  const rot = getComputedStyle(activeCard).getPropertyValue('--rot') || '0deg';

  activeCard.style.transform = `
    translate(
      calc(var(--tx) + ${dx}px),
      calc(var(--ty) + ${dy}px)
    ) rotate(${rot})
  `;
}

function stopDrag() {
  if (!activeCard) return;
  activeCard.classList.remove('dragging');

  // update --tx and --ty to new position so it stays put
  const currentTransform = activeCard.style.transform;
  const match = currentTransform.match(/translate\(\s*calc\(var\(--tx\)\s*\+\s*([-\d.]+)px\),\s*calc\(var\(--ty\)\s*\+\s*([-\d.]+)px\)/);

  if (match) {
    const oldTx = parseFloat(getComputedStyle(activeCard).getPropertyValue('--tx')) || 0;
    const oldTy = parseFloat(getComputedStyle(activeCard).getPropertyValue('--ty')) || 0;
    const newTx = oldTx + parseFloat(match[1]);
    const newTy = oldTy + parseFloat(match[2]);

    activeCard.style.setProperty('--tx', `${newTx}px`);
    activeCard.style.setProperty('--ty', `${newTy}px`);
    activeCard.style.transform = `translate(var(--tx), var(--ty)) rotate(var(--rot))`;
  }

  activeCard = null;

  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchend', stopDrag);
}