const button = document.querySelector('.menu-button');
const nav = document.querySelector('.global-nav');

button?.addEventListener('click', () => {
  const isOpen = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!isOpen));
  button.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
  nav?.classList.toggle('open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    button?.setAttribute('aria-expanded', 'false');
    button?.setAttribute('aria-label', 'メニューを開く');
  });
});
