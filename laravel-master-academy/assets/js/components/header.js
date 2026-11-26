(function(){var L=window.LMA;
function items(){var cur=L.version.get();return L.config.versions.slice().reverse().map(function(v){var on=v===cur;
  return '<li><button type="button" class="dropdown-item lma-ver-item'+(on?' active':'')+'" data-v="'+v+'"'+(on?' aria-current="true"':'')+'>Laravel '+v+' <small class="opacity-75">· '+L.config.versionMeta[v]+'</small></button></li>'}).join('')}
function paintTheme(){var d=L.theme.get()==='dark';$('#lma-theme-btn').html('<i class="bi bi-'+(d?'sun':'moon-stars')+'"></i>').attr('aria-label',d?'Switch to light theme':'Switch to dark theme')}
L.header={
  render:function(page){
    var nav=L.config.pages.map(function(p){var a=p.id===page;return '<li class="nav-item"><a class="nav-link'+(a?' active':'')+'" href="'+p.href+'"'+(a?' aria-current="page"':'')+'>'+p.label+'</a></li>'}).join('');
    return '<header class="lma-header">'+
      '<button class="lma-icon-btn d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#lma-sidebar" aria-controls="lma-sidebar" aria-label="Open course menu"><i class="bi bi-list"></i></button>'+
      '<a class="lma-brand" href="index.html"><span class="lma-mark" aria-hidden="true">L</span><span class="lma-brand-text">Laravel Master Academy</span></a>'+
      '<ul class="nav lma-nav d-none d-lg-flex ms-3">'+nav+'</ul>'+
      '<div class="ms-auto d-flex align-items-center gap-2">'+
        '<button class="lma-icon-btn" id="lma-search-btn" type="button" aria-label="Search (Ctrl+K)" title="Search (Ctrl+K)"><i class="bi bi-search"></i></button>'+
        '<div class="dropdown"><button class="btn btn-sm lma-ver-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="lma-ver-label">Laravel '+L.version.get()+'</button><ul class="dropdown-menu dropdown-menu-end" id="lma-ver-menu">'+items()+'</ul></div>'+
        '<button class="lma-icon-btn" id="lma-theme-btn" type="button"></button></div></header>'},
  bind:function(){
    paintTheme();
    $(document).on('click','#lma-theme-btn',function(){L.theme.toggle()});
    $(document).on('lma:themechange',paintTheme);
    $(document).on('click','.lma-ver-item',function(){L.version.set(String($(this).data('v')))});
    $(document).on('lma:versionchange',function(e,v){
      $('#lma-ver-label').text('Laravel '+v);$('#lma-ver-menu').html(items());
      if(window.toastr)toastr.info('Ab Laravel '+v+' ka content dikhega.')});}};})();
