(function(){var L=window.LMA,cache={};
L.data={
  get:function(path){if(!cache[path]){cache[path]=fetch(path).then(function(r){if(!r.ok)throw new Error(path+' – HTTP '+r.status);return r.json()}).catch(function(e){delete cache[path];throw e})}return cache[path]},
  errorHtml:function(e){var f=location.protocol==='file:';
    return '<div class="lma-callout lma-callout-error" role="alert"><strong>Data load nahi hua.</strong> '+(f?'Site <code>file://</code> se khuli hai. Folder mein terminal kholo, <code>python -m http.server 8000</code> chalao, phir <code>http://localhost:8000</code> kholo.':L.utils.esc(e.message))+'</div>'}};})();
