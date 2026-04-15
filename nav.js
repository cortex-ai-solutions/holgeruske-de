// nav.js – Hamburger-Menü für holgeruske.de
(function () {
  var btn = document.getElementById('hamburger');
  var nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
})();

// Lightbox – Bilder im Inhaltsbereich per Klick vergrößern
(function () {
  // Overlay einmalig erzeugen
  var overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  var closeBtn = document.createElement('span');
  closeBtn.id = 'lightbox-close';
  closeBtn.innerHTML = '&times;';
  var img = document.createElement('img');
  overlay.appendChild(closeBtn);
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  function open(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('open');
    img.src = '';
    document.body.style.overflow = '';
  }

  // Alle Bilder im Inhaltsbereich anklickbar machen
  document.addEventListener('DOMContentLoaded', function () {
    var content = document.querySelector('.page-content');
    if (!content) return;
    content.querySelectorAll('img').forEach(function (el) {
      // Buchcover in .book-intro-cover nicht vergrößern (zu klein, kein Mehrwert)
      if (el.closest('.book-intro-cover')) return;
      el.classList.add('zoomable');
      el.addEventListener('click', function () { open(el.src, el.alt); });
    });
  });

  overlay.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
