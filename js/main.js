(function () {
  'use strict';

  /* -------- Sticky header shadow/blur on scroll -------- */
  var header = document.getElementById('siteHeader');
  var toggleScrolled = function () {
    if (window.scrollY > 12) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  toggleScrolled();
  window.addEventListener('scroll', toggleScrolled, { passive: true });

  /* -------- Smooth-scroll for in-page anchor links only --------
     (scoped here rather than global `scroll-behavior: smooth` on
     <html>, which also smooths ordinary wheel/trackpad scrolling
     and can feel sluggish over a long page) */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href').slice(1);
      var target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      history.pushState(null, '', '#' + id);
    });
  });

  /* -------- Mobile menu -------- */
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileMenu.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* -------- Scroll reveal --------
     Falls back to revealing everything after a short delay in case
     IntersectionObserver never fires (throttled background tab,
     unsupported browser, etc.) — content should never get stuck
     invisible. */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            setTimeout(function () {
              el.classList.add('is-visible');
            }, (i % 3) * 90);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      io.disconnect();
    }, 2500);
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* -------- Footer year -------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------------------------------------------------
     Contact form
     -------------------------------------------------------------
     This prototype validates client-side and submits via fetch to
     a Formspree-style endpoint so the demo is fully functional
     without a backend.

     TO ACTIVATE EMAIL DELIVERY TO info@rightanglecfo.com:
       1. Create a free form at https://formspree.io (or any static
          form service) pointed at info@rightanglecfo.com.
       2. Replace FORM_ENDPOINT below with the endpoint it gives you.

     WHEN PORTING TO SQUARESPACE:
       Squarespace's native Form Block already handles email
       notifications — swap this <form> for a Squarespace Form Block
       and this script block becomes unnecessary for the contact form.
     ------------------------------------------------------------- */
  var FORM_ENDPOINT = 'https://formspree.io/f/xoeadrbg';

  var form = document.getElementById('contactForm');
  var statusEl = document.getElementById('formStatus');

  function setFieldError(field, hasError) {
    field.classList.toggle('has-error', hasError);
  }

  function validate() {
    var valid = true;
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var message = document.getElementById('message');

    var nameOk = name.value.trim().length > 0;
    setFieldError(name.closest('.field'), !nameOk);
    if (!nameOk) valid = false;

    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    setFieldError(email.closest('.field'), !emailOk);
    if (!emailOk) valid = false;

    var messageOk = message.value.trim().length > 0;
    setFieldError(message.closest('.field'), !messageOk);
    if (!messageOk) valid = false;

    return valid;
  }

  ['name', 'email', 'message'].forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener('input', function () {
      setFieldError(el.closest('.field'), false);
    });
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      statusEl.className = 'form-status';
      statusEl.textContent = '';

      if (!validate()) {
        statusEl.textContent = 'Please fix the highlighted fields.';
        statusEl.className = 'form-status is-error';
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      statusEl.textContent = 'Sending…';
      statusEl.className = 'form-status';

      var payload = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        company: document.getElementById('company').value.trim(),
        message: document.getElementById('message').value.trim(),
      };

      if (!FORM_ENDPOINT) {
        // No backend configured yet — fall back to a pre-filled mailto
        // so the message is never silently lost during development.
        var body =
          'Name: ' + payload.name + '\n' +
          'Company: ' + payload.company + '\n' +
          'Email: ' + payload.email + '\n\n' +
          payload.message;
        var mailto =
          'mailto:info@rightanglecfo.com?subject=' +
          encodeURIComponent('New inquiry from rightanglecfo.com') +
          '&body=' + encodeURIComponent(body);
        window.location.href = mailto;

        submitBtn.disabled = false;
        statusEl.textContent = 'Opening your email client to send this message…';
        statusEl.className = 'form-status is-success';
        return;
      }

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          submitBtn.disabled = false;
          if (res.ok) {
            form.reset();
            statusEl.textContent = 'Thanks — I\'ll be in touch shortly.';
            statusEl.className = 'form-status is-success';
          } else {
            statusEl.textContent = 'Something went wrong. Please email info@rightanglecfo.com directly.';
            statusEl.className = 'form-status is-error';
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          statusEl.textContent = 'Something went wrong. Please email info@rightanglecfo.com directly.';
          statusEl.className = 'form-status is-error';
        });
    });
  }
})();
