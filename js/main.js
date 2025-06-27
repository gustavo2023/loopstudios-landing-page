document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".main-header__menu-toggle");
  const sidebarNav = document.querySelector(".sidebar-nav");
  const closeButton = document.querySelector(".sidebar-nav__close-button");

  if (!menuToggle || !sidebarNav || !closeButton) return;

  const focusableElements = sidebarNav.querySelectorAll(
    'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  const openMenu = () => {
    sidebarNav.classList.add("is-active");
    sidebarNav.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    firstFocusableElement.focus();
  };

  const closeMenu = () => {
    sidebarNav.classList.remove("is-active");
    sidebarNav.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && sidebarNav.classList.contains("is-active")) {
      closeMenu();
    }

    if (e.key === "Tab" && sidebarNav.classList.contains("is-active")) {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  menuToggle.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);
  document.addEventListener("keydown", handleKeyDown);
});
