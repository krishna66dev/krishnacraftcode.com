$(function(){var L=window.LMA,E=L.utils.esc,mods,by={},FILE='laravel-master-academy';
function info(id){return by[id]||{title:id,mod:{title:'Lesson list mein nahi hai'}}}
function obj(x){return x&&typeof x==='object'&&!Array.isArray(x)}
function clean(d){var o={},k;if(!obj(d))return null;
  ['completed','bookmarks','revised'].forEach(function(k){if(obj(d[k])){o[k]={};Object.keys(d[k]).forEach(function(i){if(typeof d[k][i]==='number')o[k][i]=d[k][i]})}});
  if(obj(d.notes)){o.notes={};Object.keys(d.notes).forEach(function(i){if(typeof d.notes[i]==='string')o.notes[i]=d.notes[i]})}
  if(Array.isArray(d.history))o.history=d.history.filter(function(h){return h&&typeof h.id==='string'&&typeof h.t==='number'}).slice(0,50);
  ['quiz','practice','tasks'].forEach(function(k){if(obj(d[k]))o[k]=d[k]});
  if(L.config.versions.indexOf(d.version)>-1)o.version=d.version;if(d.theme==='light'||d.theme==='dark')o.theme=d.theme;if(d.courseView==='modules'||d.courseView==='table')o.courseView=d.courseView;
  return o}
L.backup={build:function(){return {app:FILE,schema:L.config.schema,exported:new Date().toISOString(),data:L.storage.snapshot()}},
  apply:function(o){var c=o&&o.app===FILE?clean(o.data):null;if(!c||!Object.keys(c).length)return Promise.reject(new Error('Yeh file Laravel Master Academy ka progress backup nahi lagti.'));
    return L.ui.confirm({title:'Current progress replace karein?',text:'Import ke baad purana progress, notes aur bookmarks is backup se badal jayenge.',ok:'Haan, import karo'}).then(function(ok){if(!ok)return false;
      L.storage.reset(L.storage.keys);L.storage.restore(c);L.theme.init();$(document).trigger('lma:versionchange',[L.version.get()]).trigger('lma:progress');return true})}};
function row(e,right){return '<li class="lma-ml-row"><a href="lesson.html?l='+E(e.id)+'"><span>'+E(e.title)+'</span><small class="lma-muted">'+E(e.mod.title)+'</small></a>'+right+'</li>'}
function btn(c,id,icon,label){return '<button type="button" class="btn btn-sm btn-outline-secondary '+c+'" data-id="'+E(id)+'" aria-label="'+E(label)+'"><i class="bi bi-'+icon+'"></i></button>'}
function empty(t,link){return '<p class="lma-muted">'+t+(link?' <a href="course.html">Course dekho</a>':'')+'</p>'}
function render(){var bm=L.storage.get('bookmarks',{}),dn=L.storage.get('completed',{}),nt=L.storage.get('notes',{}),hi=L.storage.get('history',[]),qz=L.storage.get('quiz',{}),pr=L.storage.get('practice',{});
  function ids(m){return Object.keys(m).sort(function(a,b){return m[b]-m[a]})}
  var b=ids(bm),d=ids(dn),n=Object.keys(nt);
  $('#cnt-bm').text(b.length);$('#cnt-dn').text(d.length);$('#cnt-nt').text(n.length);$('#cnt-hi').text(hi.length);
  $('#ml-bm').html(b.length?'<ul class="lma-ml">'+b.map(function(i){var e=info(i);return row({id:i,title:e.title,mod:e.mod},btn('ml-unbm',i,'bookmark-x','Remove bookmark: '+e.title))}).join('')+'</ul>':empty('Koi bookmark nahi. Lesson page par Bookmark dabao.',true));
  $('#ml-dn').html(d.length?'<ul class="lma-ml">'+d.map(function(i){var e=info(i);return row({id:i,title:e.title,mod:e.mod},'<small class="lma-muted">'+L.ui.date(dn[i])+'</small>'+btn('ml-undo',i,'arrow-counterclockwise','Mark incomplete: '+e.title))}).join('')+'</ul>':empty('Abhi koi lesson complete nahi hua.',true));
  $('#ml-nt').html(n.length?n.map(function(i){var e=info(i);return '<article class="lma-card mb-3"><div class="d-flex justify-content-between align-items-center mb-2"><a href="lesson.html?l='+E(i)+'" class="fw-semibold">'+E(e.title)+'</a>'+btn('ml-delnote',i,'trash','Delete note: '+e.title)+'</div><label class="visually-hidden" for="n-'+E(i)+'">Note for '+E(e.title)+'</label><textarea class="form-control ml-note" id="n-'+E(i)+'" data-id="'+E(i)+'" rows="4">'+E(nt[i])+'</textarea></article>'}).join(''):empty('Koi note nahi. Lesson page par Notes khol ke likho.',true));
  $('#ml-hi').html(hi.length?'<ul class="lma-ml">'+hi.map(function(h){var e=info(h.id);return row({id:h.id,title:e.title,mod:e.mod},'<small class="lma-muted">'+L.ui.date(h.t)+'</small>')}).join('')+'</ul><button type="button" class="btn btn-sm btn-outline-secondary mt-3" id="ml-clearhist">Clear history</button>':empty('History khali hai.'));
  var qk=Object.keys(qz),pk=Object.keys(pr);
  $('#ml-sc').html(qk.length||pk.length?'<table class="table"><thead><tr><th>Quiz</th><th>Score</th><th>Date</th></tr></thead><tbody>'+qk.map(function(i){return '<tr><td>'+E(info(i).title)+'</td><td>'+qz[i].score+'/'+qz[i].total+'</td><td>'+L.ui.date(qz[i].t)+'</td></tr>'}).join('')+pk.map(function(i){var m=mods.filter(function(x){return x.id===i})[0];return '<tr><td>Practice: '+E(m?m.title:i)+'</td><td>best '+pr[i].best+'%, last '+pr[i].last+'% ('+pr[i].attempts+' attempts)</td><td>'+L.ui.date(pr[i].t)+'</td></tr>'}).join('')+'</tbody></table>':empty('Abhi koi quiz score nahi.'))}
L.course.load().then(function(m){mods=m;L.course.entries(m,null).forEach(function(e){by[e.id]=e});render();L.ui.tabs('#ml-tabs');
  $(document).on('lma:progress',render);
  $('#ml-tabs').on('click','.ml-unbm',function(){L.progress.toggleMark($(this).data('id'))})
   .on('click','.ml-undo',function(){L.progress.toggleDone($(this).data('id'))})
   .on('click','.ml-delnote',function(){var id=$(this).data('id');L.ui.confirm({title:'Yeh note delete karein?'}).then(function(ok){if(ok){L.progress.setNote(id,'');render()}})})
   .on('input','.ml-note',function(){L.progress.setNote($(this).data('id'),this.value)})
   .on('click','#ml-clearhist',function(){L.ui.confirm({title:'History clear karein?'}).then(function(ok){if(ok){L.storage.set('history',[]);render()}})})
   .on('click','#ml-export',function(){L.ui.download(FILE+'-progress-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(L.backup.build(),null,2));window.toastr&&toastr.success('Backup download ho gaya.')})
   .on('change','#ml-import',function(){var f=this.files[0],inp=this;if(!f)return;var r=new FileReader();
     r.onload=function(){var o;try{o=JSON.parse(r.result)}catch(e){window.toastr&&toastr.error('File valid JSON nahi hai.');inp.value='';return}
       L.backup.apply(o).then(function(ok){if(ok){render();window.toastr&&toastr.success('Progress import ho gaya.')}}).catch(function(e){window.toastr&&toastr.error(e.message)});inp.value=''};r.readAsText(f)})
   .on('click','#ml-reset',function(){L.ui.confirm({title:'Saara progress reset karein?',text:'Completed lessons, bookmarks, notes, history aur scores delete honge. Pehle backup export kar lo.',ok:'Haan, reset karo'}).then(function(ok){if(ok){L.storage.reset();render();$(document).trigger('lma:progress');window.toastr&&toastr.info('Progress reset ho gaya.')}})})
}).catch(function(e){$('#ml-bm').html(L.data.errorHtml(e))});
});
