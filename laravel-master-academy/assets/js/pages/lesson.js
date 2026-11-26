$(function(){var L=window.LMA,E=L.utils.esc,id=L.utils.param('l')||'m04-l01',$root=$('#lesson-root'),flat=[],lesson,obs;
function md(s){s=E(s).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
  return s.split(/\n\n/).map(function(p){return /^- /.test(p)?'<ul>'+p.split('\n').map(function(l){return '<li>'+l.replace(/^- /,'')+'</li>'}).join('')+'</ul>':'<p>'+p.replace(/\n/g,'<br>')+'</p>'}).join('')}
function ul(a){return '<ul>'+a.map(function(x){return '<li>'+md(x).replace(/^<p>|<\/p>$/g,'')+'</li>'}).join('')+'</ul>'}
function callout(c){return c?'<div class="lma-callout lma-callout-'+c.kind+'" role="note">'+md(c.text)+'</div>':''}
function build(v){var h='',L2=lesson;
  L2.sections.forEach(function(s){h+='<h2>'+E(s.heading)+'</h2>'+(s.body?md(s.body):'')+(s.code||[]).map(function(c){return L.code.html(c,v)}).join('')+(s.explain?ul(s.explain):'')+callout(s.callout)});
  var d=L2.versionDiff;if(d){h+='<h2>'+E(d.heading)+'</h2>'+md(d.intro)+'<table class="lma-ver-table"><caption class="visually-hidden">Version differences</caption><tbody>'+L.config.versions.map(function(x){return '<tr'+(x===v?' class="cur"':'')+'><th scope="row">Laravel '+x+'</th><td>'+md(d.items[x]).replace(/^<p>|<\/p>$/g,'')+'</td></tr>'}).join('')+'</tbody></table>'+(d.code||[]).map(function(c){return L.code.html(c,v)}).join('')}
  h+='<h2>Common errors</h2>'+L2.errors.map(function(e){return '<div class="lma-callout lma-callout-warn"><strong>'+E(e.error)+'</strong><br>Wajah: '+E(e.cause)+'<br>Fix: '+md(e.fix).replace(/^<p>|<\/p>$/g,'')+'</div>'}).join('');
  h+='<h2>Debugging</h2>'+md(L2.debug.body)+(L2.debug.code||[]).map(function(c){return L.code.html(c,v)}).join('');
  h+='<h2>Practical assignment</h2><p>'+md(L2.exercise.intro).replace(/^<p>|<\/p>$/g,'')+'</p>'+L2.exercise.tasks.map(function(t,i){return '<div class="form-check"><input class="form-check-input" type="checkbox" id="t'+i+'"><label class="form-check-label" for="t'+i+'">'+E(t)+'</label></div>'}).join('');
  h+='<h2>Quiz</h2>'+L.quiz.html(L2.quiz);
  h+='<h2>Interview questions</h2><div class="accordion" id="lma-iq">'+L2.interview.map(function(q,i){return '<div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#iq'+i+'" aria-expanded="false" aria-controls="iq'+i+'">'+E(q.q)+'</button></h3><div id="iq'+i+'" class="accordion-collapse collapse" data-bs-parent="#lma-iq"><div class="accordion-body">'+md(q.a)+'</div></div></div>'}).join('')+'</div>';
  h+='<h2>Summary</h2>'+ul(L2.summary);return h}
function pn(i){var p=flat[i-1],n=flat[i+1],f=function(x,c,l){return x?'<a class="'+c+'" href="lesson.html?l='+x.id+'"><small>'+l+'</small>'+E(x.title)+'</a>':'<span class="'+c+'"><small>'+l+'</small>Koi nahi</span>'};return '<nav class="lma-pn" aria-label="Lesson navigation">'+f(p,'pv','Previous lesson')+f(n,'nx','Next lesson')+'</nav>'}
function paint(){var d=L.progress.done(id),m=L.progress.marked(id);$('.lma-done-btn').toggleClass('on',d).html('<i class="bi bi-'+(d?'check-circle-fill':'circle')+'"></i> '+(d?'Completed':'Mark complete')).attr('aria-pressed',d);
  $('#lma-bm-btn').toggleClass('on',m).html('<i class="bi bi-bookmark'+(m?'-fill':'')+'"></i> '+(m?'Bookmarked':'Bookmark')).attr('aria-pressed',m)}
function toc(){var $n=$('<ol></ol>');$('#lesson-body h2').each(function(i){this.id='s'+i;$n.append('<li><a href="#s'+i+'">'+$(this).text()+'</a></li>')});$('#lma-toc-list').html($n);
  if(obs)obs.disconnect();if(!window.IntersectionObserver)return;obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){$('#lma-toc-list a').removeClass('active').filter('[href="#'+e.target.id+'"]').addClass('active')}})},{rootMargin:'-80px 0px -70% 0px'});$('#lesson-body h2').each(function(){obs.observe(this)})}
function draw(){var v=L.version.get(),i=flat.findIndex(function(x){return x.id===id}),mod=flat[i].mod,ok=lesson.versions.indexOf(v)>-1;
  $root.html('<div class="lma-lesson"><article class="lma-article"><p class="lma-meta">Module '+mod.id.slice(1)+' · Lesson '+id.split('-l')[1]+' · '+E(mod.title)+'</p><h1>'+E(lesson.title)+'</h1><p class="lma-meta">Estimated learning time: '+lesson.minutes+' minutes · Laravel '+v+'</p>'+
    '<div class="lma-actions"><button type="button" class="btn btn-sm btn-outline-secondary lma-done-btn"></button><button type="button" class="btn btn-sm btn-outline-secondary" id="lma-bm-btn"></button><button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="offcanvas" data-bs-target="#lma-notes"><i class="bi bi-journal-text"></i> Notes</button></div>'+
    (ok?'':'<div class="lma-callout lma-callout-version">Yeh lesson Laravel '+v+' ke liye nahi hai. Versions: '+lesson.versions.join(', ')+'.</div>')+
    '<div id="lesson-body"><h2>Learning objectives</h2>'+ul(lesson.objectives)+'<h2>Prerequisites</h2>'+ul(lesson.prerequisites)+build(v)+'<p class="mt-4"><button type="button" class="btn btn-accent lma-done-btn"></button></p></div>'+pn(i)+'</article><aside class="lma-toc d-none d-xl-block" aria-label="Is page par"><h2 class="h6">Is page par</h2><div id="lma-toc-list"></div></aside></div>');
  document.title=lesson.title+' · Laravel Master Academy';L.code.bind($root);L.quiz.bind($root,id,lesson.quiz);toc();paint()}
Promise.all([L.data.get('data/modules.json'),L.data.get('data/lessons/'+id+'.json')]).then(function(r){
  r[0].modules.forEach(function(m){m.lessons.forEach(function(l){flat.push({id:l.id,title:l.title,mod:m})})});lesson=r[1];
  if(!flat.some(function(x){return x.id===id}))throw new Error('Lesson '+id+' course list mein nahi hai');
  L.progress.visit(id);draw();$('#lma-note-text').val(L.progress.note(id));
  $(document).on('lma:versionchange',draw);
  $root.on('click','.lma-done-btn',function(){var d=L.progress.toggleDone(id);paint();window.toastr&&toastr.success(d?'Lesson complete mark ho gaya.':'Lesson incomplete kar diya.')})
       .on('click','#lma-bm-btn',function(){L.progress.toggleMark(id);paint()});
  var tm;$('#lma-note-text').on('input',function(){var t=this.value;clearTimeout(tm);$('#lma-note-status').text('Save ho raha hai…');tm=setTimeout(function(){L.progress.setNote(id,t);$('#lma-note-status').text('Saved.')},400)});
}).catch(function(e){$root.html('<div class="lma-empty"><h1 class="h3">Lesson nahi mila</h1>'+L.data.errorHtml(e)+'<a class="btn btn-outline-secondary" href="index.html">Dashboard par wapas</a></div>')});
});
