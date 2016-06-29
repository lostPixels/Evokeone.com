$(document).ready(function(){

  var colors = [
    "#d63200",
    "#d952a0",
    "#dc6a00",
    "#fdf600",
    "#96f100",
    "#264fff",
    "#9bfcff",
    "#b364ff",
    "#ffffff"
  ];

  var fonts = [
    "Montserrat",
    "Arial Black",
    "Gadget",
    "Impact",
    "Charcoal",
    "Lucida Sans Unicode",
    "Verdana",
    "Courier New",
    "Lucida Console",
    "Georgia",
    "Palatino Linotype",
    "Book Antiqua",
    "Timew New Roman"
  ];

  function fade1(){
    $('#splash-text').fadeOut(1000, fade2);
  }

  function fade2(){
    var newColor = Math.floor((Math.random() * colors.length));
    var newFont = Math.floor((Math.random() * fonts.length));
    $('#splash-text').css('color', colors[newColor]);
    $('#splash-text').css('font-family', fonts[newFont]);
    $('#splash-text').fadeIn(1000, fade1);
  }

  fade1();

});
