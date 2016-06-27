var captcha;

function captchaReady(){
  captcha = grecaptcha.render('captcha', {
    'sitekey' : '6LeUhiMTAAAAAILXLm5zWrjfub5cLXlQgA_8QzKE',
    'theme' : 'dark',
  });
}

$(document).ready(function(){

  $('#show-add-memory').on('click', function(event){
    event.preventDefault();
    $('#memories-form-wrap').show();
    $(event.target).hide();
  });

  $('#add-memory').on('click', function(event){
    event.preventDefault();

    var payload = {
      response: grecaptcha.getResponse(),
      date: Date.now()
    }

    var valid = true;

    $('#memories-form input[type=text], textarea')
      .filter(function(i,e){
        return(this.name !== "g-recaptcha-response")
      })
      .each(function(){
        if(!$(this)[0].checkValidity()){
          valid = false;
          $(this).addClass('invalid');
        }else{
          $(this).removeClass('invalid');
        }
        payload[this.name] = this.value;
    });

    if(valid){
      $('#memories-form :input').prop('disabled', true);
      $.ajax({
        url: 'memories',
        data: payload,
        type: "POST",
        dataType : "json"
      })
      .done(function(json){
        console.log(json);
      })
      .fail(function(xhr, status, errorThrown){
        alert("SOMETHING FUCKED UP");
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
      });
    }


    // TODO: add AJAX code to verify captcha
    // and then to add memory to list
    // and then to post to server
  });

});
