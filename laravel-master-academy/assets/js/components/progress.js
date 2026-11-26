(function(){var L=window.LMA;
function map(k){return L.storage.get(k,{})}
function tog(k,id){var m=map(k);if(m[id])delete m[id];else m[id]=Date.now();L.storage.set(k,m);$(document).trigger('lma:progress');return !!m[id]}
L.progress={
  done:function(id){return !!map('completed')[id]},toggleDone:function(id){return tog('completed',id)},
  marked:function(id){return !!map('bookmarks')[id]},toggleMark:function(id){return tog('bookmarks',id)},
  note:function(id){return map('notes')[id]||''},
  setNote:function(id,t){var m=map('notes');if(t)m[id]=t;else delete m[id];L.storage.set('notes',m)},
  visit:function(id){var h=L.storage.get('history',[]).filter(function(x){return x.id!==id});h.unshift({id:id,t:Date.now()});L.storage.set('history',h.slice(0,50))},
  quiz:function(id,s,t){var q=map('quiz');q[id]={score:s,total:t,t:Date.now()};L.storage.set('quiz',q)}};})();
