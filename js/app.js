Calc = {
  clear: function() {
    $('#preview').html("");
    $('#result').html("0");    
  },
  deleteCharFromPreview: function() {
    var preview = $('#preview').html();
    $('#preview').html(preview.slice(0, preview.length-1));
  },
  calculateResult: function() {
    $('#result').html(eval($('#preview').html()));
  },
  handleInput: function(val) {
    switch(val) {
    case "AC":
      Calc.clear();
      break;
    case "DEL":
      Calc.deleteCharFromPreview();
      break;
    case "=":
      Calc.calculateResult();
      break;
    default:
      $('#preview').html(
        $('#preview').html() + val
      );
    }
  },
  watchKeyClick: function() {
    $('.key').click(function(event){
      Calc.handleInput($(this).text());
    });
  },
  handleInputFunctionWrapper: function(val) {
    return function() {
      Calc.handleInput(val);
    }
  },
  watchKeyPress: function() {
    var keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/'];
    for(var i = 0; i < keys.length; i++) {
      $(document).bind('keyup', keys[i], Calc.handleInputFunctionWrapper(keys[i]));
    }
  }//,
  // watchKeyPress: function() {
  //   var keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/'];
  //   for(var i = 0; i < keys.length; i++) {
  //     $(document).bind('keyup', keys[i], function() {
  //       Calc.handleInput(keys[i]);
  //     });
  //   }
  // }
};

$(document).ready(function() {
  Calc.watchKeyClick();
  Calc.watchKeyPress();
});