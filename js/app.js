Calc = {
  constants: {
    ac: "AC",
    del: "DEL",
    eql: "EQL",
    plus: "PLUS",
    minus: "MINUS",
    division: "DIVISION",
    multiply: "MULTIPLY",
    dot: "DOT"
  },
  lastKeyWasOperation: false,
  lastKeyWasDot: false,
  clearDisplay: function() {
    $('#preview').html("");
    $('#result').html("0");    
  },
  deleteCharFromPreview: function() {
    var preview = $('#preview').html();
    $('#preview').html(preview.slice(0, preview.length-1));
  },
  calculateResult: function() {
    var result = eval($('#preview').html()) + '';
    $('#result').html(result);
    $('#preview').html(result);
  },
  handleInput: function(val) {
    if (val == 'X') {
      val = '*';
    }

    switch(val) {
    case Calc.constants.ac:
      Calc.clearDisplay();
      break;
    case Calc.constants.del:
      Calc.deleteCharFromPreview();
      break;
    case '=':
      Calc.calculateResult();
      break;
    default:
      if(val == '.' && Calc.lastKeyWasDot) {
        // Nothing to do. Ignore the current dot
      } else {
        if((['+', '-', '*', '/'].indexOf(val) != -1) && Calc.lastKeyWasOperation) {
          Calc.deleteCharFromPreview();
        }
        $('#preview').html(
          $('#preview').html() + val
        );
      }
    }

    if (val == '.') {
      Calc.lastKeyWasDot = true;
    } else {
      Calc.lastKeyWasDot = false;
    }

    if (['+', '-', '*', '/'].indexOf(val) == -1) {
      Calc.lastKeyWasOperation = false;
    } else {
      Calc.lastKeyWasOperation = true;
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
      var eleId;
      switch(val) {
      case '+':
        eleId = '#key-' + Calc.constants.plus;
        break;
      case '.':
        eleId = '#key-' + Calc.constants.dot;
        break;
      case '-':
        eleId = '#key-' + Calc.constants.minus;
        break;
      case '/':
        eleId = '#key-' + Calc.constants.division;
        break;
      case '*':
        eleId = '#key-' + Calc.constants.multiply;
        break;
      case '=':
        eleId = '#key-' + Calc.constants.eql;
        break;
      default:
        eleId = '#key-' + val;
      }
      $(eleId).addClass('active');
      setTimeout(function(){ $(eleId).removeClass('active'); }, 200);
    }
  },
  watchKeyPress: function() {
    var keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/'];
    for(var i = 0; i < keys.length; i++) {
      $(document).bind('keyup', keys[i], Calc.handleInputFunctionWrapper(keys[i]));
    }
    $(document).bind('keyup', "esc", Calc.handleInputFunctionWrapper("AC"));
    $(document).bind('keyup', "backspace", Calc.handleInputFunctionWrapper("DEL"));
    $(document).bind('keyup', "return", Calc.handleInputFunctionWrapper("="));
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