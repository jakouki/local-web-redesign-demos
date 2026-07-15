const menuToggle = document.querySelector('[data-menu-toggle]');
const servicesToggle = document.querySelector('[data-services-toggle]');
const servicesMenu = document.querySelector('[data-services-menu]');

function setMenu(open) {
  if (!servicesMenu) return;
  servicesMenu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open && window.innerWidth <= 760);
  if (menuToggle) menuToggle.setAttribute('aria-expanded', String(open));
  if (servicesToggle) servicesToggle.setAttribute('aria-expanded', String(open));
}

menuToggle?.addEventListener('click', () => setMenu(!servicesMenu.classList.contains('is-open')));
servicesToggle?.addEventListener('click', () => setMenu(!servicesMenu.classList.contains('is-open')));
servicesMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

const demoForm = document.querySelector('[data-demo-form]');
demoForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = demoForm.querySelector('[data-form-status]');
  status.textContent = 'デザイン確認用のため、この画面からは送信されません。実運用時に元サイトのCGIまたは新しい送信環境へ接続します。';
  status.focus();
});
