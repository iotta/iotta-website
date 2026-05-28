// ============================================================
// iotta — main.js
// Scroll header, hamburger nav, scroll reveal, contact form
// ============================================================

// Called by components.js after header HTML is injected
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Called by components.js after header HTML is injected
function initHamburger() {
  const btn     = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!btn || !mobileNav) return;

  btn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal using Intersection Observer
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  targets.forEach(el => obs.observe(el));
}

// Contact form — Formspree async submission
function initContactForm() {
  const form    = document.getElementById('contact-form');
  if (!form) return;
  const success = document.getElementById('form-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Verzenden…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        form.style.display = 'none';
        if (success) {
          success.style.display = 'block';
          success.focus();
        }
      } else {
        const data = await res.json().catch(() => ({}));
        const msg  = data?.errors?.map(e => e.message).join(' ') || 'Er is iets misgegaan. Probeer het opnieuw.';
        alert(msg);
        btn.disabled = false;
        btn.textContent = 'Verzenden';
      }
    } catch {
      alert('Geen verbinding. Probeer het opnieuw of stuur een e-mail naar info@iotta.nl.');
      btn.disabled = false;
      btn.textContent = 'Verzenden';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initContactForm();
});
