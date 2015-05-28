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
  handleKeyPress: function(key) {
    switch($(key).text()) {
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
        $('#preview').html() + $(key).text()
      );
    }
  }
};

$(document).ready(function() {
  $('.key').click(function(event){
    Calc.handleKeyPress(this);
  });
});