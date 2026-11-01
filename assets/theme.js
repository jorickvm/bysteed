// Light and dark for bysteed.com. Load it in <head> without defer, so the theme is set before the first paint.
// It always sets <html data-theme="light|dark">, and the stylesheets key their dark colours on that attribute.
// A choice is kept for the whole site; choosing what the system already shows goes back to following the system.
// The switch is one button that names the other theme, both words in the markup and CSS showing the right one:
//   <button type="button" class="theme-toggle" data-theme-toggle><span class="light-only">Dark</span><span class="dark-only">Light</span></button>
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
  function current() { return forced || chosen || system(); }
  function apply() { root.dataset.theme = current(); }

  function toggle() {
    var theme = current() === 'dark' ? 'light' : 'dark';
    forced = null;
    chosen = theme === system() ? null : theme;
    try {
      if (chosen) localStorage.setItem(KEY, chosen);
      else localStorage.removeItem(KEY);
    } catch (e) {}
    apply();
  }

  apply();
  media.addEventListener('change', apply);
  document.addEventListener('click', function (event) {
    if (event.target.closest && event.target.closest('[data-theme-toggle]')) toggle();
  });
})();
