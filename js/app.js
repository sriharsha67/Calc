function handleKeyPress(key){
  if (["AC","DEL","="].indexOf($(key).text()) == -1) {
    $('#preview').html(
      $('#preview').html() + $(key).text()
      );
  } else {
    console.log($(key).text());
  }
}

$(document).ready(function(){
  $('.key').click(function(event){
    handleKeyPress(this);
  });
});