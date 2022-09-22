
var listElement = document.querySelector("#app ul");
var buttonElement = document.querySelector("#app button");
var speechButton = document.querySelector("#speech");

document  
  .querySelector("#speech")  
  .addEventListener("click", function () {  
   recognition.start();  
  });  



 var message = document.querySelector("#message");  
 var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;  
 var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;  
 var grammar = "#JSGF V1.0;";  
 var recognition = new SpeechRecognition();  
 var speechRecognitionList = new SpeechGrammarList();  
 speechRecognitionList.addFromString(grammar, 1);  
 recognition.grammars = speechRecognitionList;  
 recognition.lang = "en-US";  
 recognition.interimResults = false;  
 recognition.onresult = function (event) {  
  
  var command = event.results['0']['0']['transcript'];  
  var carray=command.split(" ");
  var len=carray.length;
  var lastWord=carray[len-1];
  if(lastWord==="add"||lastWord==="ad"){
    var cmd="";
    //console.log(carray);
    for(var i=0;i<len-1;i++){
      cmd += carray[i];
      cmd += " ";
    }
    console.log(cmd);
    message.value=cmd;
    addTodo();

  }else{
    message.value =  command;  
  }
    
 };  
 recognition.onspeechend = function () {  
  recognition.stop();  
 };  
 recognition.onerror = function (event) {  
  message.textContent = "Error occurred in recognition: " + event.error;  
 };  



var todos = JSON.parse(localStorage.getItem("list_todos")) || [];

function renderTodos() {
  listElement.innerHTML = "";

  for (todo of todos) {
    var todoElement = document.createElement("li");
    var todoText = document.createTextNode(todo);

    var linkElement = document.createElement("a");

    linkElement.setAttribute("href", "#");

    var pos = todos.indexOf(todo);
    linkElement.setAttribute("onclick", "deleteTodo(" + pos + ")");

    var linkText = document.createTextNode("done");

    linkElement.appendChild(linkText);

    todoElement.appendChild(todoText);
    todoElement.appendChild(linkElement);
    listElement.appendChild(todoElement);
  }
}

renderTodos();

function addTodo() {
  var todoText = message.value;

  todos.push(todoText);
  message.value = "";
  renderTodos();
  saveToStorage();
}
buttonElement.onclick = addTodo;


function deleteTodo(pos) {
  todos.splice(pos, 1);
  renderTodos();
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("list_todos", JSON.stringify(todos));
}
