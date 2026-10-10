// Light and dark for bysteed.com. Load it in <head> without defer, so the theme is set before the first paint.
// It always sets <html data-theme="light|dark">, and the stylesheets key their dark colours on that attribute.
// A choice is kept for the whole site; choosing what the system already shows goes back to following the system.
// Switch buttons anywhere on the page: <button type="button" data-theme-choice="light|dark">.
// ?theme=light or ?theme=dark in the address shows that page in that theme without saving it.
(function () {
  var KEY = 'bysteed-theme';
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  var chosen = null;
  var forced = null;
  try {
    chosen = localStorage.getItem(KEY);
    if (chosen !== 'light' && chosen !== 'dark') chosen = null;
  } catch (e) {}
  try {
    forced = new URLSearchParams(location.search).get('theme');
    if (forced !== 'light' && forced !== 'dark') forced = null;
  } catch (e) {}

  function system() { return media.matches ? 'dark' : 'light'; }

  function apply() {
    var theme = forced || chosen || system();
    root.dataset.theme = theme;
    var buttons = document.querySelectorAll('[data-theme-choice]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].dataset.themeChoice === theme));
    }
  }

  function choose(theme) {
    forced = null;
    chosen = theme === system() ? null : theme;
    try {
      if (chosen) localStorage.setItem(KEY, chosen);
      else localStorage.removeItem(KEY);
    } catch (e) {}
    apply();
  }

  apply();
  document.addEventListener('DOMContentLoaded', apply);
  media.addEventListener('change', apply);
  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('[data-theme-choice]');
    if (button) choose(button.dataset.themeChoice);
  });
})();
