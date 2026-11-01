// Cloudflare Web Analytics: cookieless page counts. Privacy pages do not load this file.
// Visit any page with ?notrack to stop counting this browser, ?notrack=off to count it again.
(function () {
  var off = false, a = null;
  try {
    a = new URLSearchParams(location.search).get('notrack');
    if (a === 'off') localStorage.removeItem('bysteed-notrack');
    else if (a !== null) localStorage.setItem('bysteed-notrack', '1');
    off = !!localStorage.getItem('bysteed-notrack');
  } catch (e) {}
  if (a !== null) console.info('bysteed.com analytics ' + (off ? 'off' : 'on') + ' in this browser');
  if (off) return;
  var s = document.createElement('script');
  s.defer = true;
  s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  s.setAttribute('data-cf-beacon', '{"token": "52d6c50e1b614c1a8279e18aa827fe75"}');
  document.head.appendChild(s);
})();
