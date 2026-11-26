(function(){var L=window.LMA,E=L.utils.esc,idx=null,res=[],act=0;
function load(){return idx?Promise.resolve(idx):L.data.get('data/search-index.json').then(function(d){return idx=d.items})}
function score(it,toks){var t=it.t.toLowerCase(),s=0;
  for(var i=0;i<toks.length;i++){var k=toks[i];if(t.indexOf(k)===0)s+=4;else if(t.indexOf(' '+k)>-1)s+=3;else if(t.indexOf(k)>-1)s+=2;else if(it.q.indexOf(k)>-1)s+=1;else return 0}
  return s+(it.k==='lesson'?.5:0)}
function ensure(){if($('#lma-search').length)return;
  $('body').append('<div class="modal fade" id="lma-search" tabindex="-1" aria-labelledby="lma-search-h" aria-hidden="true"><div class="modal-dialog modal-lg modal-dialog-scrollable"><div class="modal-content">'+
   '<div class="modal-header gap-2"><h2 class="visually-hidden" id="lma-search-h">Search</h2><i class="bi bi-search" aria-hidden="true"></i><input id="lma-search-input" class="form-control border-0 shadow-none" type="search" placeholder="Module ya lesson dhundo…" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="lma-search-list" aria-autocomplete="list"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>'+
   '<div class="modal-body p-0"><ul id="lma-search-list" class="lma-results" role="listbox" aria-label="Search results"></ul><p id="lma-search-msg" class="p-3 mb-0 lma-muted" aria-live="polite"></p></div>'+
   '<div class="modal-footer small lma-muted justify-content-start">Up/Down se chuno, Enter se kholo, Esc se band karo.</div></div></div></div>');
  $('#lma-search').on('shown.bs.modal',function(){$('#lma-search-input').trigger('focus').select()});
  $('#lma-search-input').on('input',function(){run(this.value)}).on('keydown',function(e){
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(res.length){act=(act+(e.key==='ArrowDown'?1:res.length-1))%res.length;mark()}}
    else if(e.key==='Enter'&&res[act]){e.preventDefault();location.href=res[act].u}});
  $('#lma-search-msg').text('Kam se kam ek shabd likho, jaise routing ya eloquent.')}
function mark(){$('#lma-search-list a').removeClass('active').attr('aria-selected','false').eq(act).addClass('active').attr('aria-selected','true');
  $('#lma-search-input').attr('aria-activedescendant','sr'+act);var a=$('#lma-search-list a')[act];if(a&&a.scrollIntoView)a.scrollIntoView({block:'nearest'})}
function run(q){var toks=q.toLowerCase().split(/\s+/).filter(Boolean),$l=$('#lma-search-list'),$m=$('#lma-search-msg');
  if(!toks.length){res=[];$l.empty();$m.text('Kam se kam ek shabd likho, jaise routing ya eloquent.');return}
  load().then(function(items){
    res=items.map(function(it){return {it:it,s:score(it,toks)}}).filter(function(x){return x.s>0}).sort(function(a,b){return b.s-a.s}).slice(0,10).map(function(x){return x.it});act=0;
    $l.html(res.map(function(r,i){return '<li role="presentation"><a id="sr'+i+'" role="option" class="lma-res" href="'+r.u+'"><span class="lma-res-t">'+E(r.t)+'</span><span class="lma-res-m">'+(r.k==='lesson'?'Lesson · '+E(r.m):'Module')+'</span></a></li>'}).join(''));
    $m.text(res.length?res.length+' result mile.':'Kuch nahi mila. Doosra keyword try karo.');if(res.length)mark()
  }).catch(function(e){$m.html(L.data.errorHtml(e))})}
L.search={open:function(){ensure();var el=document.getElementById('lma-search');
  if(window.bootstrap)bootstrap.Modal.getOrCreateInstance(el).show();else $(el).addClass('show').trigger('shown.bs.modal')}};
$(document).on('click','#lma-search-btn',function(){L.search.open()}).on('keydown',function(e){
  var t=e.target,typing=/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||t.isContentEditable;
  if((e.ctrlKey||e.metaKey)&&String(e.key).toLowerCase()==='k'){e.preventDefault();L.search.open()}
  else if(e.key==='/'&&!typing&&!e.ctrlKey&&!e.metaKey){e.preventDefault();L.search.open()}});})();
