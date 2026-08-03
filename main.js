document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {

  var yr = document.getElementById('yr');
  if (yr) { yr.textContent = new Date().getFullYear(); }

  var user = 'gprebbiemensah';
  var domain = 'gmail' + '.' + 'com';
  var addr = user + '\u0040' + domain;
  var link = document.getElementById('emailLink');
  var text = document.getElementById('emailText');
  var circle = document.getElementById('emailCircle');
  if (link) { link.href = 'mailto:' + addr; }
  if (text) { text.textContent = addr; }
  if (circle) { circle.href = 'mailto:' + addr; }

  var portrait = document.querySelector('.hero-portrait img');
  if (portrait) {
    portrait.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    portrait.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }

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

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

});
