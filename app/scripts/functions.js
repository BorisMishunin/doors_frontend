$(document).ready(function(){
  $('.bxslider').bxSlider({
  auto: true,
  autoControls: true
  });
    
  $('[data-toggle="offcanvas"]').click(function () {
    alert('ddd');
    $('.row-offcanvas').toggleClass('active')
  });
    
});