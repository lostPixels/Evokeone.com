if( document.querySelector('.section-wrap.home') ) {
    var randomBG = 'background-'+(Math.ceil( Math.random() * 6));
    document.querySelector('.introduction').classList.add(randomBG);
}

$(document).ready(function(){
  jQuery.fn.extend({
    toggleText : function (a, b){
      var that = this;
      if(that.text() == a){
        that.text(b);
      }else{
        that.text(a);
      }
      return this;
    }
  });
});
