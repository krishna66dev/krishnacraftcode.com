(function(){var L=window.LMA;
L.course={
  level:{beginner:'Beginner',intermediate:'Intermediate',advanced:'Advanced',expert:'Expert'},
  load:function(){return L.data.get('data/modules.json').then(function(d){return d.modules})},
  entries:function(mods,v){var done=L.storage.get('completed',{}),bm=L.storage.get('bookmarks',{}),out=[];
    mods.forEach(function(m){m.lessons.forEach(function(l){if(!v||l.versions.indexOf(v)>-1)out.push({id:l.id,title:l.title,minutes:l.minutes,mod:m,done:!!done[l.id],marked:!!bm[l.id]})})});return out}};})();
