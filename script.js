// adds a new task div when + button is pressed
function addTask() {
    
    // create new div, add it to the class and give it an id
    var newTaskDiv = document.createElement("div");
    newTaskDiv.classList.add("task");
    newTaskDiv.setAttribute("id", `taskdiv${taskCount}`);
    // get tasks section from page and append new task div
    var tasksSection = document.getElementById("tasksSection");
    tasksSection.appendChild(newTaskDiv);

    // create new text input, add it to the class and give it an id
    var newText = document.createElement("INPUT");
    newText.setAttribute("type", "text");
    newText.classList.add("taskbox");
    newText.setAttribute("id", `task${taskCount}`);
    newTaskDiv.appendChild(newText);
    
    // create new button, add text, add it to the class and give it an id
    var newCross = document.createElement("button"); 
    newCross.innerHTML = "&#10005;";
    newCross.classList.add("cross");
    newCross.setAttribute("id", `cross${taskCount}`);
    newCross.addEventListener('click', function() {deleteTask(this)}, false);
    newTaskDiv.appendChild(newCross);


    // create new checkbox, add it to the class, give it an id
    var newCheck = document.createElement("INPUT");
    newCheck.setAttribute("type", "checkbox");
    newCheck.classList.add("checkbox");
    newCheck.setAttribute("id", `check${taskCount}`);
    // add function call to new checkbox
    newCheck.addEventListener('click', function() {checkTask(this)}, false);
    newTaskDiv.appendChild(newCheck);

    taskCount++;
}


// moves task to different section when it is checked off
function checkTask(element) {
    // get the task number from the checkboxes id
    var taskNo = element.id;
    taskNo = taskNo.substr(5);

    // access the relevant task div and cross button using the task number
    var taskDiv = document.getElementById("taskdiv" + taskNo);
    var crossBtn = document.getElementById("cross" + taskNo);

    var newParent;
    
    // decide where to move task div and change visibiliy of cross button based on state of checkbox 
    if(document.getElementById(`check${taskNo}`).checked == true) {
        newParent = document.getElementById("completedSection");
        crossBtn.style.visibility = "visible";
    } else {
        newParent = document.getElementById("tasksSection");
        crossBtn.style.visibility = "hidden";
    }
    newParent.appendChild(taskDiv);
}


function deleteTask(element) {
    var taskNo = element.id;
    taskNo = taskNo.substr(5);

    // get the relevant task div using the task number and remove from screen
    var taskDiv = document.getElementById("taskdiv" + taskNo);
    taskDiv.remove();
}


function saveTasks() {
    localStorage.clear();

    var tasks = document.getElementsByClassName("task");

    for(let i = 0; i < tasks.length; i++) {
        var taskDiv = tasks[i];
        var taskIdNo = taskDiv.id.substr(7);

        var taskText = document.getElementById("task" + taskIdNo);
        var taskCheck = document.getElementById("check" + taskIdNo);  

        if(taskCheck.checked == true) {
            localStorage.setItem(taskText.value, "completed")
        } else {
            localStorage.setItem(taskText.value, "uncompleted")
        }
    }
}


var taskCount = 0;

for (let i=0; i < localStorage.length; i++) {
    addTask();

    var taskText = document.getElementById(`task${i}`);
    var storageKey = localStorage.key(i);
    taskText.value = storageKey;

    if (localStorage.getItem(storageKey) == "completed") {
        var taskCheck = document.getElementById(`check${i}`);
        taskCheck.checked = true;
        checkTask(taskCheck);
    }
}
