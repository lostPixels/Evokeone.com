// swaps text in an element

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
