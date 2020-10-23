function showform(){
    document.getElementById("quiztoggle").style.display="block";
  }
  function hideform(){
    document.getElementById("quiztoggle").style.display="none";
  }

function addMoreAns(){
  var text='<input id="text" type="number" name="answer" min="1" max="4" required="required"/>';
  $("#add_here").append(text);
}