(function(){var L=window.LMA,E=L.utils.esc;
L.quiz={
  html:function(qs){return qs.map(function(q,i){return '<fieldset class="lma-q" data-i="'+i+'"><legend>'+(i+1)+'. '+E(q.q)+'</legend>'+q.options.map(function(o,j){var id='q'+i+'o'+j;return '<div class="form-check"><input class="form-check-input" type="radio" name="q'+i+'" id="'+id+'" value="'+j+'"><label class="form-check-label" for="'+id+'">'+E(o)+'</label></div>'}).join('')+'<button type="button" class="btn btn-sm btn-outline-secondary mt-2 lma-q-check">Check answer</button><div class="fb" aria-live="polite"></div></fieldset>'}).join('')+'<p class="fw-semibold" id="lma-q-score" aria-live="polite"></p>'},
  bind:function(root,id,qs){var res={};
    $(root).on('click','.lma-q-check',function(){var $q=$(this).closest('.lma-q'),i=+$q.data('i'),sel=$q.find('input:checked').val(),$fb=$q.find('.fb');
      if(sel==null){$fb.attr('class','fb bad').text('Pehle ek option chuno.');return}
      var ok=+sel===qs[i].answer;res[i]=ok;$fb.attr('class','fb '+(ok?'ok':'bad')).text((ok?'Sahi jawab. ':'Galat. ')+qs[i].why);
      var n=Object.keys(res).length;if(n===qs.length){var s=Object.keys(res).filter(function(k){return res[k]}).length;$('#lma-q-score').text('Score: '+s+'/'+qs.length);L.progress.quiz(id,s,qs.length)}})}};})();
