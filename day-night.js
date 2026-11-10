(() => {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const key = 'portfolio-color-mode';
  let preference = null;

  function readPreference() {
    try {
      const saved = localStorage.getItem(key);
      preference = saved === 'dark' || saved === 'light' ? saved : null;
    } catch {
      // A blocked store still permits switching for the current document.
    }
  }

  function refreshSwitches() {
    document.querySelectorAll('day-night-switch').forEach(control => control.sync());
  }

  function apply() {
    const mode = preference || (media.matches ? 'dark' : 'light');
    root.dataset.theme = mode;
    const chrome = document.querySelector('meta[name="theme-color"]');
    if (chrome) chrome.content = mode === 'dark' ? '#10131c' : '#1c0998';
    refreshSwitches();
  }

  // The day/night landscape is drawn in the switch itself; it needs no image request.
  class DayNightSwitch extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({mode: 'open'});
      shadow.innerHTML = `
        <button type="button" role="switch" part="button">
          <svg part="sky" viewBox="0 0 76 34" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="sun" x2=".7" y2="1" gradientUnits="objectBoundingBox">
                <stop stop-color="#ffe87c"/><stop offset=".7" stop-color="#f6c83b"/><stop offset="1" stop-color="#dba624"/>
              </linearGradient>
              <linearGradient id="moon" x2=".75" y2="1" gradientUnits="objectBoundingBox">
                <stop stop-color="#f5f4ef"/><stop offset=".62" stop-color="#c6c9d4"/><stop offset="1" stop-color="#999fac"/>
              </linearGradient>
            </defs>
            <g part="stars" fill="#fffafa">
              <path d="m12 6 .8 2.3 2.4.8-2.4.8L12 12l-.8-2.1-2.4-.8 2.4-.8zM29 16l.8 2.7 2.6.8-2.6.8L29 24l-.8-2.7-2.6-.8 2.6-.8zM36 5l.5 1.7 1.8.5-1.8.5L36 9.5l-.5-1.8-1.8-.5 1.8-.5z"/>
              <circle cx="7" cy="20" r=".8"/><circle cx="18" cy="25" r=".75"/><circle cx="22" cy="6.5" r=".65"/>
              <circle cx="21" cy="15" r="1"/><circle cx="37" cy="27" r=".7"/><circle cx="42" cy="13" r=".85"/>
            </g>
            <g part="orb">
              <g fill="#fff" opacity=".095"><circle cx="17" cy="17" r="37"/><circle cx="17" cy="17" r="29"/><circle cx="17" cy="17" r="21"/></g>
              <circle cx="17" cy="18.4" r="13.45" fill="#101b31" opacity=".4"/>
              <circle cx="17" cy="17" r="13.3" fill="url(#sun)"/>
              <g part="moon">
                <circle cx="17" cy="17" r="13.3" fill="url(#moon)"/>
                <g fill="#939aa9" stroke="#c7ccd4" stroke-width=".75">
                  <circle cx="13" cy="19" r="4"/><circle cx="20.4" cy="11.3" r="2.7"/><circle cx="22" cy="21.8" r="1.8"/>
                </g>
              </g>
              <path d="M5.1 14a12.3 12.3 0 0 1 14-9" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.1" opacity=".66"/>
            </g>
            <path part="cloud-back" fill="#a5c8e5" d="M0 30q5-4 10 0 4-7 11-4 5-8 14-4 3-8 13-6 3-7 11-5 2-8 11-7 1-5 7-6v39H0z"/>
            <path part="cloud-middle" fill="#d1e4f4" d="M0 34q7-5 13-2 7-6 13-4 4-6 12-4 4-6 13-5 4-7 12-5 2-7 10-6l5-1v28H0z"/>
            <path part="cloud-front" fill="#f8fcff" d="M0 36q8-4 16-1 6-6 13-3 5-5 12-3 5-7 13-5 5-6 12-4 2-7 12-8v25H0z"/>
          </svg>
        </button>`;
      this.button = shadow.querySelector('button');
      this.button.addEventListener('click', () => {
        preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem(key, preference); } catch { /* Use the in-memory choice. */ }
        apply();
      });
    }

    connectedCallback() { this.sync(); }

    sync() {
      const dark = root.dataset.theme === 'dark';
      const fa = root.lang === 'fa';
      this.button.setAttribute('aria-label', fa ? 'حالت تاریک' : 'Dark mode');
      this.button.setAttribute('aria-checked', String(dark));
      this.button.title = fa
        ? (dark ? 'تغییر به تم روشن' : 'تغییر به تم تیره')
        : (dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  readPreference();
  customElements.define('day-night-switch', DayNightSwitch);
  apply();
  new MutationObserver(refreshSwitches).observe(root, {attributes: true, attributeFilter: ['lang']});
  media.addEventListener('change', () => { if (preference === null) apply(); });
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) { readPreference(); apply(); }
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) { readPreference(); apply(); }
  });
})();
