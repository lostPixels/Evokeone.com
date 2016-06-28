$(document).ready(function(){
  $(document).keydown(function(event){
    switch(event.which){
      case 37:  // left
        document.getElementById('prevlink').click();
        break;
      case 39:  // right
        document.getElementById('nextlink').click();
        break;
      default:
        return;
    }
    event.preventDefault();
  });
});
