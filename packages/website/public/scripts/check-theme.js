/* eslint-env browser */
(function checkTheme() {
  const themes = ['light', 'dark'];
  const lsTheme = localStorage.getItem('theme');
  const activeTheme = themes.find((theme) => theme === lsTheme) || themes[0];

  document.body.dataset.theme = activeTheme;
})();
