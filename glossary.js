const colors = ['#ecb4b4', '#9cbfd5', '#f8bb75', '#cebbec'];

document.querySelectorAll('.glossary-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const random = colors[Math.floor(Math.random() * colors.length)];
    card.style.setProperty('--accent', random);
  });
});