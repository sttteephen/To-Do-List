var taskCount = 1;

// adds a new task div when + button is pressed
function addTask() {
    taskCount++;
    
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
    
    // create new checkbox, add it to the class, give it an id
    var newCheck = document.createElement("INPUT");
    newCheck.setAttribute("type", "checkbox");
    newCheck.classList.add("checkbox");
    newCheck.setAttribute("id", `check${taskCount}`);
    // add function call to new checkbox
    newCheck.addEventListener('click', function() {checkTask(this)}, false);
    newTaskDiv.appendChild(newCheck);
}

// move task to different section when it is checked off
function checkTask(element) {
    // get the task number from the checkboxes id
    var taskNo = element.id;
    console.log(taskNo);
    taskNo = taskNo.charAt(taskNo.length - 1);

    // access the relevant task div using the task number
    var taskDiv = document.getElementById("taskdiv" + taskNo);

    var newParent;
    
    // decide where to move task div based on state of checkbox
    if(document.getElementById(`check${taskNo}`).checked == true) {
        newParent = document.getElementById("completedSection");
    } else {
        newParent = document.getElementById("tasksSection");
    }
    newParent.appendChild(taskDiv);
}