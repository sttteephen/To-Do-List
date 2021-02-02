var taskCount = 1;

function addTask() {

    var tasksSection = document.getElementById("tasksSection");

    var newTaskDiv = document.createElement("div");
    newTaskDiv.classList.add("task");
    tasksSection.appendChild(newTaskDiv);


    var newText = document.createElement("INPUT");
    newText.setAttribute("type", "text");
    newText.classList.add("taskbox");
    newTaskDiv.appendChild(newText);
    
    var newCheck = document.createElement("INPUT");
    newCheck.setAttribute("type", "checkbox");
    newCheck.classList.add("checkbox");
    newTaskDiv.appendChild(newCheck);
}

function checkTask(element) {

    var taskNo = element.id;
    taskNo = taskNo.charAt(taskNo.length - 1);

    var taskDiv = document.getElementById("taskdiv" + taskNo);

    var newParent;
    
    if(document.getElementById("check" + taskNo).checked == true) {
        newParent = document.getElementById("completedSection");
    } else {
        newParent = document.getElementById("tasksSection");
    }
    newParent.appendChild(taskDiv);
}