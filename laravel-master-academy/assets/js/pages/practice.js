$(function(){var L=window.LMA,E=L.utils.esc,mods,data,order=[],done=false;
function topic(){return $('#pr-topic').val()}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function mcq(){var st=L.storage.get('practice',{})[topic()];done=false;
  $('#pr-mcq-meta').text(st?'Best: '+st.best+'%, last: '+st.last+'%, attempts: '+st.attempts:'Abhi tak koi attempt nahi.');
  $('#pr-mcq').html(order.map(function(qi,n){var q=data.mcq[qi];return '<fieldset class="lma-q" data-q="'+qi+'"><legend>'+(n+1)+'. '+E(q.q)+'</legend>'+q.options.map(function(o,j){var id='p'+qi+'o'+j;return '<div class="form-check"><input class="form-check-input" type="radio" name="p'+qi+'" id="'+id+'" value="'+j+'"><label class="form-check-label" for="'+id+'">'+E(o)+'</label></div>'}).join('')+'<div class="fb" aria-live="polite"></div></fieldset>'}).join('')+'<button type="button" class="btn btn-accent" id="pr-submit">Submit quiz</button><p class="fw-semibold mt-3" id="pr-result" aria-live="polite"></p>')}
function fresh(){order=shuffle(data.mcq.map(function(_,i){return i}));mcq()}
function submit(){if(done)return;done=true;var ok=0,skip=0;
  $('#pr-mcq .lma-q').each(function(){var $q=$(this),q=data.mcq[$q.data('q')],s=$q.find('input:checked').val(),good=s!=null&&+s===q.answer;if(s==null)skip++;if(good)ok++;
    $q.find('input').prop('disabled',true);$q.find('.fb').attr('class','fb '+(good?'ok':'bad')).text((good?'Sahi. ':s==null?'Jawab nahi diya. ':'Galat. ')+'Sahi jawab: '+q.options[q.answer]+'. '+q.why)});
  var n=data.mcq.length,pct=Math.round(ok/n*100),all=L.storage.get('practice',{}),o=all[topic()]||{attempts:0,best:0};
  all[topic()]={best:Math.max(o.best,pct),last:pct,attempts:o.attempts+1,total:n,t:Date.now()};L.storage.set('practice',all);
  $('#pr-result').text('Score: '+ok+'/'+n+' ('+pct+'%)'+(skip?', '+skip+' unanswered':''));
  $('#pr-submit').text('Try again').attr('id','pr-again');$('#pr-mcq-meta').text('Best: '+all[topic()].best+'%, last: '+pct+'%, attempts: '+all[topic()].attempts)}
function assign(){var T=L.storage.get('tasks',{});
  $('#pr-assign').html(data.assignments.map(function(a,ai){var id=topic()+'-a'+ai,st=T[id]||[],n=st.filter(Boolean).length;
    return '<article class="lma-card mb-3" data-id="'+id+'" data-a="'+ai+'"><div class="d-flex justify-content-between gap-2"><h3 class="h5">'+E(a.title)+'</h3><span class="lma-pill lma-pill-muted">'+E(a.level)+'</span></div><p>'+E(a.brief)+'</p>'+
      a.tasks.map(function(t,i){return '<div class="form-check"><input class="form-check-input pr-task" type="checkbox" id="'+id+'-'+i+'" data-i="'+i+'"'+(st[i]?' checked':'')+'><label class="form-check-label" for="'+id+'-'+i+'">'+E(t).replace(/`([^`]+)`/g,'<code>$1</code>')+'</label></div>'}).join('')+
      '<p class="small mt-2 mb-2 pr-prog" aria-live="polite">'+n+'/'+a.tasks.length+' tasks done</p><button type="button" class="btn btn-sm btn-outline-secondary pr-sol" aria-expanded="false">Sample solution dekho</button><div class="pr-sol-body d-none mt-3"></div></article>'}).join(''))}
function iv(){var q=String($('#pr-iq').val()||'').trim().toLowerCase(),R=L.storage.get('revised',{}),t=topic();
  var rows=data.interview.map(function(x,i){return {x:x,i:i,id:t+'-i'+i}}).filter(function(r){return !q||(r.x.q+' '+r.x.a).toLowerCase().indexOf(q)>-1});
  $('#pr-iq-meta').text(data.interview.filter(function(_,i){return R[t+'-i'+i]}).length+'/'+data.interview.length+' revised');
  $('#pr-iv').html(rows.length?'<div class="accordion">'+rows.map(function(r){return '<div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#'+r.id+'" aria-expanded="false" aria-controls="'+r.id+'">'+E(r.x.q)+'</button></h3><div id="'+r.id+'" class="accordion-collapse collapse"><div class="accordion-body">'+E(r.x.a).replace(/`([^`]+)`/g,'<code>$1</code>')+'<div class="form-check mt-3"><input class="form-check-input pr-rev" type="checkbox" id="rv-'+r.id+'" data-id="'+r.id+'"'+(R[r.id]?' checked':'')+'><label class="form-check-label" for="rv-'+r.id+'">Revised</label></div></div></div></div>'}).join('')+'</div>':'<p class="lma-muted">Is keyword se koi question nahi mila.</p>')}
function load(){return L.data.get('data/practice/'+topic()+'.json').then(function(d){data=d;fresh();assign();iv()}).catch(function(e){$('#pr-mcq').html(L.data.errorHtml(e))})}
Promise.all([L.course.load(),L.data.get('data/practice/index.json')]).then(function(r){mods=r[0];
  $('#pr-topic').html(r[1].modules.map(function(id){var m=mods.filter(function(x){return x.id===id})[0];return '<option value="'+id+'">'+id.slice(1)+' '+E(m?m.title:id)+'</option>'}).join('')).on('change',load);
  L.ui.tabs('#pr-tabs');
  $('#pr-tabs').on('click','#pr-submit',submit).on('click','#pr-again',fresh)
   .on('change','.pr-task',function(){var $a=$(this).closest('article'),id=$a.data('id'),a=data.assignments[$a.data('a')],st=$a.find('.pr-task').map(function(){return this.checked}).get(),T=L.storage.get('tasks',{});T[id]=st;L.storage.set('tasks',T);$a.find('.pr-prog').text(st.filter(Boolean).length+'/'+a.tasks.length+' tasks done')})
   .on('click','.pr-sol',function(){var $a=$(this).closest('article'),$b=$a.find('.pr-sol-body'),a=data.assignments[$a.data('a')],open=$b.hasClass('d-none');
     if(open&&!$b.html()){$b.html('<p class="small">'+E(a.explain)+'</p>'+a.solution.map(function(c){return L.code.html(c,L.version.get())}).join(''));L.code.bind($b)}
     $b.toggleClass('d-none',!open);$(this).attr('aria-expanded',open).text(open?'Solution chhupao':'Sample solution dekho')})
   .on('input','#pr-iq',iv).on('change','.pr-rev',function(){var R=L.storage.get('revised',{}),id=$(this).data('id');if(this.checked)R[id]=Date.now();else delete R[id];L.storage.set('revised',R);var t=topic();$('#pr-iq-meta').text(data.interview.filter(function(_,i){return R[t+'-i'+i]}).length+'/'+data.interview.length+' revised')});
  return load()}).catch(function(e){$('#pr-mcq').html(L.data.errorHtml(e))});
});
