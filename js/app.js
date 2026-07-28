/* =====================================================
   APP.JS – GetGo Shipper Global State & Core Logic
   Auth guard, dark mode, i18n language, session, toast, map helpers
   ===================================================== */

const App = (() => {

  const SESSION_KEY = 'gg_session';
  const DARK_KEY    = 'gg_darkmode';
  const LANG_KEY    = 'gg_lang';
  const BOOKING_KEY = 'gg_booking';

  /* ── Session / Auth ──────────────────────────── */
  function isLoggedIn() {
    return !!localStorage.getItem(SESSION_KEY);
  }

  function getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
    catch { return null; }
  }

  function login(userData) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(BOOKING_KEY);
    window.location.href = 'login.html';
  }

  function requireAuth() {
    if (!isLoggedIn()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  }

  function requireGuest() {
    if (isLoggedIn()) {
      window.location.href = 'home.html';
      return false;
    }
    return true;
  }

  /* ── Dark Mode ───────────────────────────────── */
  function isDarkMode() {
    return localStorage.getItem(DARK_KEY) === 'true';
  }

  function applyDarkMode() {
    if (isDarkMode()) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  function setDarkMode(val) {
    localStorage.setItem(DARK_KEY, String(val));
    applyDarkMode();
  }

  function toggleDarkMode() {
    const newVal = !isDarkMode();
    setDarkMode(newVal);
    return newVal;
  }

  /* ── Language / i18n ─────────────────────────── */
  function getLang() {
    return localStorage.getItem(LANG_KEY) || 'en';
  }

  function setLang(langCode) {
    localStorage.setItem(LANG_KEY, langCode);
    applyTranslations();
  }

  function t(key) {
    const lang = getLang();
    const dict = MOCK.i18n[lang] || MOCK.i18n.en;
    return dict[key] || MOCK.i18n.en[key] || key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) el.placeholder = t(key);
    });
  }

  /* ── Booking State ───────────────────────────── */
  function saveBooking(data) {
    const existing = getBooking() || {};
    const updated = { ...existing, ...data };
    localStorage.setItem(BOOKING_KEY, JSON.stringify(updated));
    return updated;
  }

  function getBooking() {
    try { return JSON.parse(localStorage.getItem(BOOKING_KEY)); }
    catch { return null; }
  }

  function clearBooking() {
    localStorage.removeItem(BOOKING_KEY);
  }

  /* ── Toast Notifications ─────────────────────── */
  function showToast(message, type = 'default', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️', default: '📢' };
    const toast = document.createElement('div');
    toast.className = `toast ${type !== 'default' ? type : ''}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.default}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-hide');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /* ── Bottom Nav Active State ─────────────────── */
  function initBottomNav() {
    const page = window.location.pathname.split('/').pop() || 'home.html';
    const navMap = {
      'home.html':          '#nav-home',
      'my-bookings.html':   '#nav-bookings',
      'notifications.html': '#nav-notifs',
      'wallet.html':        '#nav-wallet',
      'profile.html':       '#nav-profile',
    };
    const activeSelector = navMap[page];
    if (activeSelector) {
      const el = document.querySelector(activeSelector);
      if (el) {
        el.classList.add('active');
        if (!el.querySelector('.nav-icon-bg')) {
          const bg = document.createElement('div');
          bg.className = 'nav-icon-bg';
          el.appendChild(bg);
        }
      }
    }
  }

  /* ── Notification Badge ──────────────────────── */
  function updateNotifBadge() {
    const unread = MOCK.notifications.filter(n => !n.read).length;
    const badge = document.querySelector('.nav-badge');
    if (badge) {
      badge.textContent = unread > 0 ? (unread > 9 ? '9+' : unread) : '';
      badge.style.display = unread > 0 ? 'flex' : 'none';
    }
  }

  /* ── Formatting Helpers ──────────────────────── */
  function formatCurrency(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function timeAgo(dateStr) {
    const now = new Date();
    const d   = new Date(dateStr);
    const secs = Math.floor((now - d) / 1000);
    if (secs < 60)   return `${secs}s ago`;
    if (secs < 3600) return `${Math.floor(secs/60)}m ago`;
    if (secs < 86400)return `${Math.floor(secs/3600)}h ago`;
    return `${Math.floor(secs/86400)}d ago`;
  }

  function getStatusColor(status) {
    const map = {
      'Completed':  'success',
      'In Transit': 'info',
      'Cancelled':  'error',
      'Active':     'primary',
      'Assigned':   'primary',
      'Arriving':   'warning',
      'Searching':  'neutral',
    };
    return map[status] || 'neutral';
  }

  /* ── Location Request ────────────────────────── */
  function requestLocation(onSuccess, onError) {
    if (!navigator.geolocation) {
      onError && onError('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        saveBooking({ userLat: latitude, userLng: longitude });
        onSuccess && onSuccess(latitude, longitude);
      },
      err => { onError && onError(err.message); },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }

  /* ── Init ────────────────────────────────────── */
  function init() {
    applyDarkMode();
    applyTranslations();
    initBottomNav();
    updateNotifBadge();
  }

  return {
    isLoggedIn, getSession, login, logout,
    requireAuth, requireGuest,
    isDarkMode, toggleDarkMode, setDarkMode, applyDarkMode,
    getLang, setLang, t, applyTranslations,
    saveBooking, getBooking, clearBooking,
    showToast,
    formatCurrency, formatDate, timeAgo, getStatusColor,
    requestLocation, init,
  };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
