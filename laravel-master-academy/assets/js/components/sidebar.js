(function(){var L=window.LMA,esc=L.utils.esc,MODS=[];
function list(){var done=L.storage.get('completed',{}),cl=L.utils.param('l'),act=L.utils.param('m')||(cl||'').split('-')[0];
  return MODS.map(function(m){var d=Object.keys(done).filter(function(k){return k.indexOf(m.id+'-')===0}).length,t=m.lessons.length,href=t?'lesson.html?l='+m.lessons[0].id:'course.html?m='+m.id;
    var sub=(m.id===act&&t)?'<ul class="lma-lessons">'+m.lessons.map(function(l){return '<li><a href="lesson.html?l='+l.id+'"'+(l.id===cl?' class="active" aria-current="page"':'')+'><i class="bi bi-'+(done[l.id]?'check-circle-fill':'circle')+'"></i><span>'+esc(l.title)+'</span></a></li>'}).join('')+'</ul>':'';
    return '<li class="lma-mod" data-t="'+esc(m.title.toLowerCase())+'"><a class="lma-mod-link'+(m.id===act?' active':'')+'" href="'+href+'"><span class="lma-mod-num">'+m.id.slice(1)+'</span><span>'+esc(m.title)+'</span><span class="lma-mod-meta">'+(t?d+'/'+t:'Soon')+'</span></a>'+sub+'</li>'}).join('')}
function filter(){var q=String($('#lma-mod-filter').val()||'').trim().toLowerCase(),n=0;
  $('#lma-mods .lma-mod').each(function(){var s=!q||$(this).data('t').indexOf(q)>-1;$(this).toggle(s);if(s)n++});$('#lma-mod-none').toggleClass('d-none',n>0)}
L.sidebar={
  render:function(page,mods){MODS=mods;
    var nav=L.config.pages.map(function(p){return '<a href="'+p.href+'"'+(p.id===page?' class="active" aria-current="page"':'')+'>'+p.label+'</a>'}).join('');
    return '<aside class="lma-side-wrap" aria-label="Course navigation"><div class="offcanvas-lg offcanvas-start lma-side" tabindex="-1" id="lma-sidebar" aria-labelledby="lma-side-title">'+
      '<div class="offcanvas-header d-lg-none"><h2 class="offcanvas-title h6" id="lma-side-title">Course modules</h2><button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#lma-sidebar" aria-label="Close"></button></div>'+
      '<div class="offcanvas-body lma-side-body"><nav class="lma-side-nav d-lg-none mb-3" aria-label="Pages">'+nav+'</nav>'+
      '<h2 class="lma-side-h d-none d-lg-block">Course modules</h2>'+
      '<label class="visually-hidden" for="lma-mod-filter">Filter modules</label><input id="lma-mod-filter" class="form-control form-control-sm" type="search" placeholder="Module dhundo…" autocomplete="off">'+
      '<ol class="lma-mods" id="lma-mods">'+list()+'</ol><p class="lma-muted small mt-3 d-none" id="lma-mod-none">Is naam ka koi module nahi mila.</p></div></div></aside>'},
  bind:function(){$(document).on('input','#lma-mod-filter',filter).on('lma:progress',function(){if(MODS.length){$('#lma-mods').html(list());filter()}})}};})();
