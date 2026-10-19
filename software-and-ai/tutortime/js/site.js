/* ============================================================
   TUTORTIME — site.js
   Cookie consent + rotating bi-weekly deal banner
   ============================================================ */

/* ---- COOKIE CONSENT ---- */
(function () {
  var banner = document.getElementById('cookieBanner');
  if (!banner) return;
  try {
    if (!localStorage.getItem('tt_cookie_choice')) {
      banner.style.display = 'flex';
    }
  } catch (e) { /* storage blocked — leave hidden */ }

  var accept  = document.getElementById('cookieAccept');
  var decline = document.getElementById('cookieDecline');
  function choose(val) {
    try { localStorage.setItem('tt_cookie_choice', val); } catch (e) {}
    banner.style.display = 'none';
  }
  if (accept)  accept.addEventListener('click',  function () { choose('accepted'); });
  if (decline) decline.addEventListener('click', function () { choose('declined'); });
})();

/* ---- ROTATING BI-WEEKLY DEALS ---- */
(function () {
  var banner = document.getElementById('dealBanner');
  var textEl = document.getElementById('dealText');
  if (!banner || !textEl) return;

  /* PINNED DEAL: shows for everyone until the end date below,
     then bi-weekly rotation resumes automatically. */
  var PINNED_DEAL = {
    text: 'Back to School Special: Book 3 sessions, get the 4th one free ($75 value)',
    until: '2026-09-30T23:59:59'
  };
  if (PINNED_DEAL && Date.now() < new Date(PINNED_DEAL.until).getTime()) {
    textEl.textContent = PINNED_DEAL.text;
    banner.style.display = 'block';
    return;
  }

  /* Deals rotate every 14 days. Same deal shows for every visitor
     during a given 2-week window. */
  var DEALS = [
    'Book 3 sessions, get the 4th one free ($75 value)',
    'Buy 2 sessions, get 1 free for first-time students',
    'Refer a friend this week and you both get $20 off your next session',
    'Book a 4-session pack and lock in $65/hour (save $40)',
    'Free 30-minute score review with any session booked this week',
    'Sibling deal: enroll two students, second student gets 20% off',
  ];

  /* Days since fixed epoch, divided into 14-day windows */
  var EPOCH = new Date('2026-01-05T00:00:00Z').getTime(); /* a Monday */
  var days  = Math.floor((Date.now() - EPOCH) / 86400000);
  var windowIdx = Math.floor(days / 14);
  var deal = DEALS[((windowIdx % DEALS.length) + DEALS.length) % DEALS.length];

  textEl.textContent = deal;
  banner.style.display = 'block';
})();
