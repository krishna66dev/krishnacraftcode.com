(function(){var L=window.LMA,E=L.utils.esc;
var MODE={php:'text/x-php',html:'htmlmixed',blade:'htmlmixed',js:'javascript',javascript:'javascript',sql:'text/x-sql',bash:'shell',json:'application/json',css:'css'};
function copy(text){var ok=function(){window.toastr&&toastr.success('Code copy ho gaya.')},bad=function(){window.toastr&&toastr.error('Copy nahi hua. Code select karke Ctrl+C dabao.')};
  if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(text).then(ok,bad);
  else{var t=$('<textarea>').val(text).css({position:'fixed',opacity:0}).appendTo('body');t[0].select();try{document.execCommand('copy')?ok():bad()}catch(e){bad()}t.remove()}}
L.code={
  mode:function(l){return MODE[l]||'text/plain'},
  pick:function(c,v){return (c.variants&&c.variants[v])||c.code},
  html:function(c,v){var code=L.code.pick(c,v),lang=c.lang||'php',ed=!!c.editable;
    return '<figure class="lma-code'+(ed?' lma-editable':'')+'" data-lang="'+lang+'"><div class="lma-code-head"><span>'+E(c.file||lang)+(ed?' · editable, yahan run nahi hota':'')+'</span><span class="d-flex gap-1">'+(ed?'<button type="button" class="btn btn-outline-light lma-reset">Reset</button>':'')+'<button type="button" class="btn btn-outline-light lma-copy"><i class="bi bi-clipboard"></i> Copy</button></span></div>'+
      (ed?'<textarea class="lma-cm-src">'+E(code)+'</textarea>':'<pre><code class="language-'+lang+'">'+E(code)+'</code></pre>')+'</figure>'},
  bind:function(root){var $r=$(root);
    if(window.Prism)Prism.highlightAllUnder($r[0]);
    $r.find('.lma-editable').each(function(){var $f=$(this),ta=$f.find('textarea')[0],orig=ta.value;
      if(window.CodeMirror){var cm=CodeMirror.fromTextArea(ta,{mode:L.code.mode($f.data('lang')),theme:'material-darker',lineNumbers:true,viewportMargin:Infinity,indentUnit:4});$f.data('cm',cm)}
      $f.data('orig',orig)});
    $r.off('click.code').on('click.code','.lma-copy',function(){var $f=$(this).closest('.lma-code'),cm=$f.data('cm');copy(cm?cm.getValue():$f.find('code').text())})
      .on('click.code','.lma-reset',function(){var $f=$(this).closest('.lma-code'),cm=$f.data('cm');if(cm)cm.setValue($f.data('orig'))})}};})();
