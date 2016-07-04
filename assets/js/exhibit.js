  $(document).ready(function(){
    $('#newsToggle').click(function(evt){
      evt.preventDefault();
      swaptext();
      $('#exhibition-description').animate({
        opacity: "toggle",
        height: "toggle"
      },500);
    });

    function swaptext(){
      $('#newsToggle').toggleText('Show News Release', 'Hide News Release');
    }

  });
