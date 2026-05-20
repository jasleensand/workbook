// ── PROCESS CARD LIGHTBOX ────────────────────────────
const processLightbox = document.getElementById('processLightbox');
const lightboxProcessImg = document.getElementById('lightboxProcessImg');

document.querySelectorAll('.flip-card').forEach(card => {
  let mouseDownX = 0;
  let mouseDownY = 0;

  card.addEventListener('mousedown', (e) => {
    mouseDownX = e.clientX;
    mouseDownY = e.clientY;
  });

  card.addEventListener('mouseup', (e) => {
    const distX = Math.abs(e.clientX - mouseDownX);
    const distY = Math.abs(e.clientY - mouseDownY);

    if (distX < 5 && distY < 5) {
      // get the back card image since that has the content
      const backImg = card.querySelector('.flip-card-back img');
      if (backImg && processLightbox && lightboxProcessImg) {
        lightboxProcessImg.src = backImg.src;
        processLightbox.classList.add('active');
      }
    }
  });
});

if (processLightbox) {
  processLightbox.addEventListener('click', () => {
    processLightbox.classList.remove('active');
  });
}