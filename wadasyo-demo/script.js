const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

function setMenu(open) {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', String(open));
  mobileMenu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
}

menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
