const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");

if (menu && menuToggle) {
  const closeMenu = ({ restoreFocus = false } = {}) => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "メニューを開く");
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    if (restoreFocus) menuToggle.focus();
  };

  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    menuToggle.setAttribute("aria-label", open ? "メニューを開く" : "メニューを閉じる");
    menu.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  menu.addEventListener("click", (event) => {
    if (event.target === menu) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu({ restoreFocus: true });
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
}
const updateHeader = () => {
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 20);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const form = document.querySelector("[data-demo-form]");
const formStatus = document.querySelector("[data-form-status]");

if (form && formStatus) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent =
      "こちらはデザインサンプルのため、送信は行われません。正式公開時に既存の確認・送信機能へ接続します。";
    formStatus.focus?.();
  });
}
