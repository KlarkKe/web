var button = document.getElementById("enter");
var deleteBtns = document.getElementsByClassName("clear");

var input = document.getElementById("userinput");
var ul = document.querySelector("ul");


function inputLength() {
    return input.value.length; 
}

function createListElement (){
    var li = document.createElement("li");
    var btn = document.createElement("button");
    li.appendChild(document.createTextNode(input.value));
    btn.appendChild(document.createTextNode("Delete"));
    btn.classList.add("clear");
    ul.appendChild(li);
    li.appendChild(btn).addEventListener("click", addClearItem);
    input.value = "";
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
	}
}

function addClearItem(task){
    task.target.parentElement.remove()
}

for (const item of deleteBtns) {
    item.addEventListener("click", addClearItem);
}

button.addEventListener("click", addListAfterClick)
input.addEventListener("keydown", addListAfterKeypress)
ul.addEventListener("click", addDoneAfterClick)