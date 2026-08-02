// ============================================================
//  main.js  -  site behavior for iamgudfred.github.io
//  - year stamp
//  - mobile menu toggle
//  - scroll-reveal animations
//  - email obfuscation (bot-resistant mailto)
//  - Google Analytics event tracking (form, social, project links)
// ============================================================
document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', function () {

  // ---- Year stamp ----
  var yr = document.getElementById('yr');
  if (yr) { yr.textContent = new Date().getFullYear(); }

  // ---- Email obfuscation ----
  // Assemble the address from parts so scrapers never see a clean string.
  // Real visitors get a working click-to-email link and can see/copy it.
  (function () {
    var user = 'gprebbiemensah';
    var domain = 'gmail' + '.' + 'com';
    var addr = user + '\u0040' + domain; // \u0040 is "@"
    var link = document.getElementById('emailLink');
    var text = document.getElementById('emailText');
    if (link) { link.href = 'mailto:' + addr; }
    if (text) { text.textContent = addr; }
  })();

  // ---- Mobile menu toggle ----
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // ---- Scroll-reveal animations ----
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // ---- Analytics: contact form submission ----
  var contactForm = document.querySelector('form');
  if (contactForm && typeof gtag === 'function') {
    contactForm.addEventListener('submit', function () {
      gtag('event', 'form_submission', {
        event_category: 'Contact Form',
        event_label: 'Message Sent'
      });
    });
  }

  // ---- Analytics: social link clicks ----
  if (typeof gtag === 'function') {
    document.querySelectorAll('.social-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        var label = link.getAttribute('aria-label') || 'Social';
        gtag('event', 'social_click', {
          event_category: 'Social Media',
          event_label: label
        });
      });
    });

    // ---- Analytics: project link clicks (work cards) ----
    document.querySelectorAll('.work-card .work-link').forEach(function (link) {
      link.addEventListener('click', function () {
        var card = link.closest('.work-card');
        var h3 = card ? card.querySelector('h3') : null;
        gtag('event', 'project_link_click', {
          event_category: 'Portfolio',
          event_label: h3 ? h3.textContent.trim() : 'Project'
        });
      });
    });
  }

});
});
