var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var li = document.querySelector("li");


function inputLength() {
    return input.value.length; 
}

function createListElement (){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value = "";
}

function createDeleteButton(){
    var btn = document.createElement("button");
    
}

function addListAfterClick(){
    if(inputLength() != 0) {
        createListElement();
    }
}

function addListAfterKeypress(event){
    if(inputLength() != 0 && event.key === "Enter") {
        createListElement();
    }    
}

function addDoneAfterClick(task) {
    
	if (task.target.tagName === "LI"){
		task.target.classList.toggle("done");

        var btn = document.createElement("button");
        btn.appendChild(document.createTextNode("Delete"))
        task.target.appendChild(btn)
	}
}

button.addEventListener("click", addListAfterClick)
input.addEventListener("keydown", addListAfterKeypress)
ul.addEventListener("click", addDoneAfterClick)