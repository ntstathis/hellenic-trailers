// ============================================
// HELLENIC TRAILERS - Enquiry counting
// ============================================
//
// The site's measure of success is a handful of serious enquiries a year, and
// until now nothing counted them: a visitor who taps WhatsApp, the phone
// number or an email address leaves no trace in the analytics, because no page
// ever loads.
//
// This registers each of those taps as a virtual page view — /enquiry/whatsapp,
// /enquiry/phone, /enquiry/email — in Cloudflare Web Analytics, which watches
// History API changes. Checked against beacon.min.js (2026-09-04): it patches
// `history.pushState` and listens for `popstate`, and where the browser has the
// Navigation API it uses that instead. It does NOT patch `replaceState`, so the
// push below has to be a real pushState for Safari and Firefox to count it.
//
// Nothing here sets a cookie or stores an identifier, so no consent banner is
// required.
//
// **This file cannot break an enquiry.** It touches no link and cancels no
// click: every `<a>` keeps its own href and its own default behaviour, so if
// this script fails, is blocked, or is deleted outright, the visitor still
// reaches WhatsApp, the dialler or their mail client exactly as before. That is
// the whole reason the tracking is done this way round rather than by routing
// taps through a redirect page.

(function () {
  'use strict';

  if (!window.history || typeof window.history.pushState !== 'function') return;

  // href pattern -> the path the enquiry should appear under in the dashboard
  const CHANNELS = [
    { test: (h) => h.indexOf('wa.me') !== -1, path: '/enquiry/whatsapp' },
    { test: (h) => h.indexOf('tel:') === 0, path: '/enquiry/phone' },
    { test: (h) => h.indexOf('mailto:') === 0, path: '/enquiry/email' }
  ];

  // The address to come back to. Read once per click rather than kept in a
  // variable, so a restore can never write back a stale URL.
  let pending = null;

  function restore() {
    if (!pending) return;
    const url = pending;
    pending = null;
    try {
      // replaceState, not back(): back() fires `popstate`, which the beacon
      // watches, so the return trip would be counted as a second view of the
      // page and inflate the very numbers this file exists to produce.
      //
      // The cost of doing it this way is one spare history entry per tap —
      // holding the real address, so the page never changes, but the visitor's
      // first press of Back after tapping WhatsApp appears to do nothing and
      // the second one leaves. That is the trade: an accurate count against one
      // dead press. If the count ever turns out not to be worth it, deleting
      // the <script> tag removes both.
      window.history.replaceState(window.history.state, '', url);
    } catch (e) {
      // A failed restore would leave a /enquiry/... address in the bar, which
      // 404s if the visitor reloads. Going to it directly is the safe way out.
      window.location.replace(url);
    }
  }

  document.addEventListener('click', function (event) {
    // Let the browser have modified clicks (new tab, download, middle button)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;

    const href = link.getAttribute('href') || '';
    const channel = CHANNELS.filter(function (c) { return c.test(href); })[0];
    if (!channel) return;

    // One tap, one count: a second tap before the address has been put back
    // would push the virtual path on top of itself.
    if (pending) return;

    try {
      pending = window.location.pathname + window.location.search + window.location.hash;
      window.history.pushState(window.history.state, '', channel.path);
    } catch (e) {
      pending = null;
      return;
    }

    // The beacon reads the address at the moment of the push, so the wait only
    // has to outlast its own bookkeeping. A quarter of a second is invisible to
    // the visitor and long enough for that.
    window.setTimeout(restore, 250);
  }, false);

  // These links open WhatsApp, the dialler or a mail client rather than
  // navigating this page, so the timer above almost always gets to run. Almost:
  // if the page is put away or closed first, put the address back now, so the
  // visitor never returns to a /enquiry/... URL that would 404 on reload.
  window.addEventListener('pagehide', restore);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') restore();
  });
})();
