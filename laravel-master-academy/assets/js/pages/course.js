$(function(){var L=window.LMA,E=L.utils.esc,S={level:'',status:'',q:'',view:L.storage.get('courseView','modules')},mods,dt=null;
function rows(){var q=S.q.toLowerCase();return L.course.entries(mods,L.version.get()).filter(function(e){
  if(S.level&&e.mod.level!==S.level)return false;
  if(S.status==='completed'&&!e.done||S.status==='pending'&&e.done||S.status==='bookmarked'&&!e.marked)return false;
  return !q||(e.title+' '+e.mod.title).toLowerCase().indexOf(q)>-1})}
function modulesHtml(r){var all=L.course.entries(mods,L.version.get()),want=L.utils.param('m'),openId=want,first;
  if(!openId){mods.some(function(m){return r.some(function(e){return e.mod===m})&&(first=m.id)});openId=first}
  var h=mods.map(function(m){if(S.level&&m.level!==S.level)return '';
    var ls=r.filter(function(e){return e.mod===m}),mine=all.filter(function(e){return e.mod===m}),d=mine.filter(function(e){return e.done}).length,pct=mine.length?Math.round(d/mine.length*100):0;
    if(!ls.length&&(S.status||S.q||mine.length))return '';
    var on=m.id===openId&&ls.length>0,body=ls.length?'<div class="progress mb-3" role="progressbar" aria-label="Module progress" aria-valuenow="'+pct+'" aria-valuemin="0" aria-valuemax="100"><div class="progress-bar" style="width:'+pct+'%"></div></div><ul class="lma-llist">'+ls.map(function(e){
      return '<li><a class="lma-lrow" href="lesson.html?l='+e.id+'"><i class="bi bi-'+(e.done?'check-circle-fill':'circle')+'" aria-hidden="true"></i><span>'+E(e.title)+(e.done?'<span class="visually-hidden"> (completed)</span>':'')+'</span><span class="lma-muted small">'+e.minutes+' min</span>'+(e.marked?'<i class="bi bi-bookmark-fill" title="Bookmarked" aria-label="Bookmarked"></i>':'<i></i>')+'</a></li>'}).join('')+'</ul>':'<p class="lma-muted mb-0">Is module ke lessons jald aa rahe hain.</p>';
    return '<div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button'+(on?'':' collapsed')+'" type="button" data-bs-toggle="collapse" data-bs-target="#c-'+m.id+'" aria-expanded="'+on+'" aria-controls="c-'+m.id+'"><span class="lma-mod-num me-2">'+m.id.slice(1)+'</span><span class="me-auto fw-semibold">'+E(m.title)+'</span><span class="lma-pill lma-pill-muted mx-2">'+L.course.level[m.level]+'</span><span class="small lma-muted me-2">'+(mine.length?d+'/'+mine.length:'Soon')+'</span></button></h2><div id="c-'+m.id+'" class="accordion-collapse collapse'+(on?' show':'')+'"><div class="accordion-body">'+body+'</div></div></div>'}).join('');
  return h||'<p class="lma-muted">Is filter se koi lesson nahi mila. Filters badal ke dekho.</p>'}
function tableHtml(r){return r.map(function(e){return '<tr><td>'+e.mod.id.slice(1)+' '+E(e.mod.title)+'</td><td><a href="lesson.html?l='+e.id+'">'+E(e.title)+'</a></td><td>'+L.course.level[e.mod.level]+'</td><td data-order="'+e.minutes+'">'+e.minutes+' min</td><td>'+(e.done?'Completed':'Pending')+(e.marked?', Bookmarked':'')+'</td></tr>'}).join('')}
function draw(){var r=rows(),all=L.course.entries(mods,L.version.get()),d=all.filter(function(e){return e.done}).length,tbl=S.view==='table';
  $('#co-sub').text('Laravel '+L.version.get()+' ke liye '+all.length+' lessons, '+d+' completed. Baaki modules jald aa rahe hain.');
  $('#co-v-modules').attr('aria-pressed',!tbl).toggleClass('active',!tbl);$('#co-v-table').attr('aria-pressed',tbl).toggleClass('active',tbl);
  $('#co-modules').toggleClass('d-none',tbl).html(tbl?'':'<div class="accordion">'+modulesHtml(r)+'</div>');
  $('#co-table-wrap').toggleClass('d-none',!tbl);
  if(dt){dt.destroy();dt=null}
  if(tbl){$('#co-table tbody').html(tableHtml(r));if($.fn.DataTable)dt=$('#co-table').DataTable({pageLength:25,order:[],language:{search:'Search:',emptyTable:'Koi lesson nahi mila.'}})}}
L.course.load().then(function(m){mods=m;draw();
  $('#co-q').on('input',function(){S.q=String(this.value).trim();draw()});
  $('#co-level').on('change',function(){S.level=this.value;draw()});$('#co-status').on('change',function(){S.status=this.value;draw()});
  $('#co-v-modules').on('click',function(){S.view='modules';L.storage.set('courseView','modules');draw()});$('#co-v-table').on('click',function(){S.view='table';L.storage.set('courseView','table');draw()});
  $(document).on('lma:versionchange',draw);
}).catch(function(e){$('#co-modules').html(L.data.errorHtml(e))});
});
