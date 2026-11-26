(function(){var L=window.LMA,ns=L.config.ns,ok=false,mem={};
try{localStorage.setItem(ns+'t','1');localStorage.removeItem(ns+'t');ok=true}catch(e){}
L.storage={ok:ok,
  get:function(k,d){try{var r=ok?localStorage.getItem(ns+k):mem[k];return r==null?d:JSON.parse(r)}catch(e){return d}},
  set:function(k,v){try{var s=JSON.stringify(v);if(ok)localStorage.setItem(ns+k,s);else mem[k]=s;return true}catch(e){return false}},
  remove:function(k){try{if(ok)localStorage.removeItem(ns+k);else delete mem[k]}catch(e){}}};
var KEYS=['completed','bookmarks','notes','history','quiz','practice','tasks','revised','version','theme','courseView'],PROG=KEYS.slice(0,8);
L.storage.keys=KEYS;L.storage.progressKeys=PROG;
L.storage.snapshot=function(){var o={};KEYS.forEach(function(k){var v=L.storage.get(k,undefined);if(v!==undefined)o[k]=v});return o};
L.storage.restore=function(data){Object.keys(data||{}).forEach(function(k){if(KEYS.indexOf(k)>-1)L.storage.set(k,data[k])})};
L.storage.reset=function(keys){(keys||PROG).forEach(function(k){L.storage.remove(k)})};
if(L.storage.get('schema')==null)L.storage.set('schema',L.config.schema);})();
