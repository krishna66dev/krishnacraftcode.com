(function(){var L=window.LMA;
L.theme={
  get:function(){var t=L.storage.get('theme',null);if(t==='light'||t==='dark')return t;return window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'},
  apply:function(t){document.documentElement.setAttribute('data-bs-theme',t)},
  set:function(t){L.storage.set('theme',t);this.apply(t);$(document).trigger('lma:themechange',[t])},
  toggle:function(){this.set(this.get()==='dark'?'light':'dark')},
  init:function(){this.apply(this.get())}};})();
