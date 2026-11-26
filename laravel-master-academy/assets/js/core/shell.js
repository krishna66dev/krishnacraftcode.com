$(function(){var L=window.LMA,page=$('body').data('page');
  L.theme.init();L.header.bind();L.sidebar.bind();
  if(window.toastr)toastr.options={positionClass:'toast-bottom-right',timeOut:2500,closeButton:true};
  var $main=$('#lma-main').detach(),$layout=$('<div class="lma-layout"></div>');
  $('body').prepend('<a class="skip-link" href="#lma-main">Content par jao</a>'+L.header.render(page)).append($layout);
  $layout.append('<div class="lma-side-slot"></div>').append($main);
  L.data.get('data/modules.json').then(function(d){$layout.children('.lma-side-slot').replaceWith(L.sidebar.render(page,d.modules));$(document).trigger('lma:ready',[d])})
   .catch(function(e){$layout.children('.lma-side-slot').replaceWith('<aside class="lma-side-wrap p-3">'+L.data.errorHtml(e)+'</aside>')});
});
