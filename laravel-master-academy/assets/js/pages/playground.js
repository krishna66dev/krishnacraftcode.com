$(function(){var L=window.LMA,S={php:"<?php\n\nRoute::get('/hello', function () {\n    return 'Namaste, Laravel!';\n});\n",html:"<h1>{{ $title }}</h1>\n@foreach ($items as $item)\n    <p>{{ $item }}</p>\n@endforeach\n",js:"const items = ['Route', 'Controller', 'View'];\nitems.forEach(i => console.log(i));\n",sql:"SELECT id, name\nFROM users\nWHERE active = 1\nORDER BY created_at DESC;\n",bash:"php artisan route:list\nphp artisan serve\n"},cm,cm2;
function load(l){var s=S[l];$('#pg-orig').val(s);if(cm){cm.setOption('mode',L.code.mode(l));cm.setValue(s);if(cm2){cm2.setOption('mode',L.code.mode(l));cm2.setValue(s)}}else $('#pg-code').val(s)}
function mk(el,ro){return window.CodeMirror?CodeMirror.fromTextArea(el,{mode:L.code.mode($('#pg-lang').val()),theme:'material-darker',lineNumbers:true,viewportMargin:Infinity,readOnly:ro}):null}
cm=mk($('#pg-code')[0],false);load('php');
$('#pg-lang').on('change',function(){load(this.value)});
$('#pg-reset').on('click',function(){var s=S[$('#pg-lang').val()];cm?cm.setValue(s):$('#pg-code').val(s)});
$('#pg-copy').on('click',function(){var t=cm?cm.getValue():$('#pg-code').val();navigator.clipboard?navigator.clipboard.writeText(t).then(function(){toastr.success('Code copy ho gaya.')}):toastr.error('Copy support nahi hai.')});
$('#pg-compare').on('click',function(){var on=$('#pg-orig-wrap').toggleClass('d-none').is(':visible');$('.lma-pg-panes').toggleClass('two',on);$(this).attr('aria-pressed',on);if(on&&!cm2){cm2=mk($('#pg-orig')[0],'nocursor')}if(cm2){cm2.setValue(S[$('#pg-lang').val()]);cm2.refresh()}if(cm)cm.refresh()});
});
