// PabloHoney Bikes - shared nav script
(function(){
  var burger=document.getElementById('burger'),
      drawer=document.getElementById('drawer'),
      scrim=document.getElementById('scrim');
  if(burger){burger.addEventListener('click',function(){drawer.classList.add('show');scrim.classList.add('show');});}
  if(scrim){scrim.addEventListener('click',function(){drawer.classList.remove('show');scrim.classList.remove('show');});}
  if(drawer){
    drawer.querySelectorAll('.item > .top').forEach(function(btn){
      btn.addEventListener('click',function(){btn.parentElement.classList.toggle('open');});
    });
  }
})();
