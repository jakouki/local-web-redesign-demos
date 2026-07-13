const stylesheet = document.createElement("link");
stylesheet.rel = "stylesheet";
stylesheet.href = "./mobile-menu.css";
document.head.append(stylesheet);

const header = document.querySelector(".site-header");
const menu = document.querySelector(".desktop-nav");
const menuToggle = document.createElement("button");

if (header && menu) {
  menu.id = "kyokuo-navigation";
  menu.dataset.mobileMenu = "";
  menuToggle.className = "mobile-menu-toggle";
  menuToggle.type = "button";
  menuToggle.setAttribute("aria-controls", menu.id);
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "メニューを開く");
  menuToggle.dataset.mobileMenuToggle = "";
  menuToggle.innerHTML = "<span></span><span></span><span></span><b>MENU</b>";
  header.insertBefore(menuToggle, menu);
}

if (header && menu) {
  const closeMenu = ({ restoreFocus = false } = {}) => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "メニューを開く");
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    if (restoreFocus) menuToggle.focus();
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "メニューを開く" : "メニューを閉じる");
    menu.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
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
    if (window.innerWidth > 680) closeMenu();
  });
}
