// ============================================================
// iotta — components.js
// Fetch and inject shared header/footer into every page.
// Resolves base URL from this script's own src attribute.
// ============================================================

const BASE = (() => {
  const s = document.querySelector('script[src*="components.js"]');
  if (s) return s.src.replace(/js\/components\.js.*$/, '');
  return './';
})();

async function loadComponent(placeholderId, filePath) {
  const el = document.getElementById(placeholderId);
  if (!el) return;
  try {
    const res = await fetch(BASE + filePath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    // Replace the placeholder div with the actual component HTML
    el.insertAdjacentHTML('afterend', await res.text());
    el.remove();

    if (placeholderId === 'header-placeholder') {
      highlightActiveNav();
      if (typeof initHamburger     === 'function') initHamburger();
      if (typeof initScrollHeader  === 'function') initScrollHeader();
    }
  } catch (err) {
    console.warn(`[iotta] Component "${filePath}" kon niet geladen worden:`, err.message);
  }
}

function highlightActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

loadComponent('header-placeholder', 'components/header.html');
loadComponent('footer-placeholder', 'components/footer.html');
