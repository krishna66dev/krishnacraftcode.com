$(function(){var L=window.LMA,E=L.utils.esc,mods,site,chart=null;
function css(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()}
function versions(){var cur=L.version.get();return site.versions.map(function(v){var on=v.id===cur;
  return '<article class="lma-card lma-ver'+(on?' is-active':'')+'"><div class="d-flex justify-content-between align-items-start mb-2"><h3 class="h5 mb-0">'+E(v.label)+'</h3><span class="lma-pill lma-pill-'+v.tone+'">'+E(v.status)+'</span></div><p class="small mb-3">'+E(v.highlights)+'</p><dl class="lma-facts"><dt>PHP</dt><dd>'+E(v.php)+'</dd><dt>Released</dt><dd>'+E(v.released)+'</dd><dt>Bug fixes till</dt><dd>'+E(v.bugFixes)+'</dd><dt>Security till</dt><dd>'+E(v.security)+'</dd></dl><button type="button" class="btn btn-sm '+(on?'btn-accent':'btn-outline-secondary')+' lma-pick" data-v="'+v.id+'" aria-pressed="'+on+'">'+(on?'Selected':'Select Laravel '+v.id)+'</button></article>'}).join('')}
function draw(){var v=L.version.get(),es=L.course.entries(mods,v),all=L.course.entries(mods,null),done=es.filter(function(e){return e.done}).length,pct=es.length?Math.round(done/es.length*100):0,
  hist=L.storage.get('history',[]),byId={};es.forEach(function(e){byId[e.id]=e});
  var cur=hist.length?byId[hist[0].id]:null,nxt;
  if(cur&&!cur.done)nxt=cur;else{var i=cur?es.indexOf(cur):-1;nxt=es.slice(i+1).concat(es.slice(0,i+1)).filter(function(e){return !e.done})[0]}
  var started=mods.filter(function(m){return es.some(function(e){return e.mod===m&&e.done})}).length,marks=es.filter(function(e){return e.marked}).length;
  $('#d-continue').html(nxt?'<h2 class="h5 mb-1">'+(hist.length?'Wahin se shuru karo':'Pehla lesson shuru karo')+'</h2><p class="lma-muted small mb-3">'+E(nxt.mod.title)+'</p><p class="fw-semibold mb-3">'+E(nxt.title)+'</p><a class="btn btn-accent" href="lesson.html?l='+nxt.id+'">Lesson kholo</a>':'<h2 class="h5">Sab lessons complete</h2><p class="lma-muted mb-0">Laravel '+v+' ke available lessons ho gaye. Naye modules jald aa rahe hain.</p>');
  $('#d-stats').html([[done+'/'+es.length,'lessons completed'],[pct+'%','progress, Laravel '+v],[started,'modules started'],[marks,'bookmarks']].map(function(s){return '<div class="lma-stat"><div class="n">'+s[0]+'</div><div class="l">'+s[1]+'</div></div>'}).join(''));
  var ms=mods.filter(function(m){return es.some(function(e){return e.mod===m})});
  if(chart){chart.destroy();chart=null}
  if(ms.length&&window.Chart){var dn=ms.map(function(m){return es.filter(function(e){return e.mod===m&&e.done}).length}),tt=ms.map(function(m){return es.filter(function(e){return e.mod===m}).length});
    $('#d-chart').html('<div style="height:'+(ms.length*46+70)+'px"><canvas id="d-canvas" role="img" aria-label="'+E(ms.map(function(m,i){return m.title+': '+dn[i]+' of '+tt[i]+' lessons completed'}).join('. '))+'"></canvas></div>');
    var txt=css('--lma-muted'),grid=css('--lma-line');
    chart=new Chart($('#d-canvas')[0],{type:'bar',data:{labels:ms.map(function(m){return m.id.slice(1)+' '+m.title}),datasets:[{label:'Completed',data:dn,backgroundColor:css('--lma-accent')},{label:'Remaining',data:ms.map(function(m,i){return tt[i]-dn[i]}),backgroundColor:grid}]},
      options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,scales:{x:{stacked:true,ticks:{color:txt,precision:0},grid:{color:grid}},y:{stacked:true,ticks:{color:txt},grid:{display:false}}},plugins:{legend:{labels:{color:txt}}}}})}
  else $('#d-chart').html(ms.length?'<ul>'+ms.map(function(m){return '<li>'+E(m.title)+'</li>'}).join('')+'</ul>':'<p class="lma-muted">Is version ke liye abhi lessons nahi hain.</p>');
  var rec=hist.slice(0,5).map(function(h){return all.filter(function(e){return e.id===h.id})[0]?{e:all.filter(function(e){return e.id===h.id})[0],t:h.t}:null}).filter(Boolean);
  $('#d-recent').html(rec.length?rec.map(function(r){return '<li><a href="lesson.html?l='+r.e.id+'"><span>'+E(r.e.title)+'</span><span class="lma-muted small">'+new Date(r.t).toLocaleDateString()+'</span></a></li>'}).join(''):'<li class="lma-muted">Abhi koi lesson nahi khola. Course page se shuru karo.</li>');
  $('#lma-versions').html(versions())}
Promise.all([L.course.load(),L.data.get('data/site.json')]).then(function(r){mods=r[0];site=r[1];draw();
  $(document).on('click','.lma-pick',function(){L.version.set(String($(this).data('v')))}).on('lma:versionchange lma:themechange lma:progress',draw)})
 .catch(function(e){$('#d-continue').html(L.data.errorHtml(e))});
});
