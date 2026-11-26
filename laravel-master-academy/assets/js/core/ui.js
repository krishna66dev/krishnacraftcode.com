(function(){var L=window.LMA;
L.ui={
  confirm:function(o){if(window.Swal)return Swal.fire({title:o.title,text:o.text||'',icon:'warning',showCancelButton:true,confirmButtonText:o.ok||'Haan, karo',cancelButtonText:'Cancel',confirmButtonColor:'#E5372C'}).then(function(r){return r.isConfirmed});
    return Promise.resolve(window.confirm(o.title+(o.text?'\n'+o.text:'')))},
  download:function(name,text){var a=document.createElement('a'),u=URL.createObjectURL(new Blob([text],{type:'application/json'}));a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},1000)},
  date:function(t){try{return new Date(t).toLocaleString([],{dateStyle:'medium',timeStyle:'short'})}catch(e){return ''}},
  tabs:function(root){var $r=$(root),$t=$r.find('[role=tab]');
    function sel(n){$t.each(function(){var on=$(this).data('tab')===n;$(this).attr({'aria-selected':on,tabindex:on?0:-1}).toggleClass('active',on)});$r.find('[data-panel]').each(function(){$(this).toggleClass('d-none',$(this).data('panel')!==n)})}
    $t.on('click',function(){sel($(this).data('tab'))}).on('keydown',function(e){var i=$t.index(this),k=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(k){var n=$t.eq((i+k+$t.length)%$t.length);n.trigger('focus').trigger('click')}});
    sel($t.first().data('tab'));return sel}};})();
