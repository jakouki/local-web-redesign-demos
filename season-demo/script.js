const accessStorageKey = 'season-demo-access-v1';
const accessPasswordHash = '92931c39de023a2c4d98a5a043732fe0e9cf455ecb84580098f4e2d10b61d785';

function getSavedAccess() {
  try {
    return sessionStorage.getItem(accessStorageKey);
  } catch {
    return null;
  }
}

function saveAccess() {
  try {
    sessionStorage.setItem(accessStorageKey, accessPasswordHash);
  } catch {
    // Storage may be unavailable in a privacy-restricted browser.
  }
}

async function hashPassword(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function unlockSite(gate) {
  document.body.classList.remove('password-locked');
  gate?.remove();
}

function showPasswordGate() {
  const gate = document.createElement('div');
  gate.className = 'password-gate';
  gate.setAttribute('role', 'dialog');
  gate.setAttribute('aria-modal', 'true');
  gate.setAttribute('aria-labelledby', 'password-gate-title');
  gate.innerHTML = `
    <div class="password-gate-card">
      <div class="password-gate-mark" aria-hidden="true"><span>S</span></div>
      <p class="password-gate-label">PRIVATE DESIGN PROPOSAL</p>
      <h1 id="password-gate-title">閲覧用パスワード</h1>
      <p class="password-gate-copy">このウェブサイトは限定公開です。<br>パスワードを入力してご覧ください。</p>
      <form class="password-gate-form">
        <label for="site-password">パスワード</label>
        <div class="password-gate-field">
          <input id="site-password" name="password" type="password" autocomplete="current-password" required />
          <button type="submit">サイトを見る <span aria-hidden="true">→</span></button>
        </div>
        <p class="password-gate-error" role="alert" aria-live="polite"></p>
      </form>
    </div>`;
  document.body.append(gate);

  const form = gate.querySelector('form');
  const input = gate.querySelector('input');
  const button = gate.querySelector('button');
  const error = gate.querySelector('.password-gate-error');
  input.focus();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    button.disabled = true;
    error.textContent = '';
    const submittedHash = await hashPassword(input.value.trim());
    if (submittedHash === accessPasswordHash) {
      saveAccess();
      unlockSite(gate);
      document.querySelector('main')?.focus({ preventScroll: true });
      return;
    }
    input.value = '';
    input.setAttribute('aria-invalid', 'true');
    error.textContent = 'パスワードが正しくありません。';
    button.disabled = false;
    input.focus();
  });
}

if (getSavedAccess() === accessPasswordHash) {
  unlockSite();
} else {
  showPasswordGate();
}

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
