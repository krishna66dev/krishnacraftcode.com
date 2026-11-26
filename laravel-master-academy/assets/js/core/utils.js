(function(){var L=window.LMA;
L.utils={esc:function(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})},
  param:function(k){return new URLSearchParams(location.search).get(k)}};})();
