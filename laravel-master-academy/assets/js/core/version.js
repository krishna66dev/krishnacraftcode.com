(function(){var L=window.LMA;
L.version={
  get:function(){var v=L.storage.get('version',L.config.defaultVersion);return L.config.versions.indexOf(v)>-1?v:L.config.defaultVersion},
  set:function(v){if(L.config.versions.indexOf(v)<0)return;L.storage.set('version',v);$(document).trigger('lma:versionchange',[v])}};})();
