// adds a new task element to screen when 'Add Task' button is pressed
function addTask() {

    // get current text from task input box
    var taskInputText = document.getElementById("taskInput").value

    if (taskInputText != "") {

        // create new label element to hold new task and add classes
        var newTaskLabel = document.createElement("label")
        newTaskLabel.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        // create div to hold the input element and place it inside the new label
        var newTaskDiv = document.createElement("div")
        newTaskLabel.appendChild(newTaskDiv)

        // create checkbox element, add classes and append to div
        var newCheckBox = document.createElement("INPUT");
        newCheckBox.setAttribute("type", "checkbox");
        newCheckBox.classList.add("form-check-input", "me-2", "justify-content-between")
        newCheckBox.addEventListener('click', function () { checkTask(this) }, false);
        newTaskDiv.appendChild(newCheckBox)

        // create a text node for new task string and append to div
        var textNode = document.createTextNode(taskInputText);
        newTaskDiv.appendChild(textNode)

        // add the new label with holds the checkbox and task string to the list
        document.getElementById("taskList").prepend(newTaskLabel)

        // reset the task input box
        document.getElementById("taskInput").value = ""
    }
    /*
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
    newText.value = taskInputText
    newTaskDiv.appendChild(newText);

    // create new button, add text, add it to the class and give it an id
    var newCross = document.createElement("button");
    newCross.innerHTML = "&#10005;";
    newCross.classList.add("cross");
    newCross.setAttribute("id", `cross${taskCount}`);
    newCross.addEventListener('click', function () { deleteTask(this) }, false);
    newTaskDiv.appendChild(newCross);


    // create new checkbox, add it to the class, give it an id
    var newCheck = document.createElement("INPUT");
    newCheck.setAttribute("type", "checkbox");
    newCheck.classList.add("checkbox");
    newCheck.setAttribute("id", `check${taskCount}`);
    // add function call to new checkbox
    newCheck.addEventListener('click', function () { checkTask(this) }, false);
    newTaskDiv.appendChild(newCheck);

    taskCount++;
    */
}


// toggle visibility of delete button and change position of list item depending on status of check box
function checkTask(element) {

    // get the parent label element of the checked item
    var checkedLabel = element.parentElement.parentElement;

    // check if the item has been checked or unchecked
    if (element.checked == true) {

        // create the button and icon to add to the screen, adding relevant classes
        var newBtn = document.createElement("button");
        newBtn.classList.add("invisible")
        newBtn.addEventListener('click', function () { deleteTask(this) }, false);

        var newIcon = document.createElement("i");
        newIcon.classList.add("fas", "fa-trash", "visible");

        // add the button and icon to the screen
        checkedLabel.appendChild(newBtn);
        newBtn.appendChild(newIcon);

        // move the item to the bottom of the list
        document.getElementById("taskList").appendChild(checkedLabel)

    } else {

        // remove the delete button from the screen
        checkedLabel.querySelector(".invisible").remove();
        // move the list item to top of the list
        document.getElementById("taskList").prepend(checkedLabel)
    }

    /*
    // get the task number from the checkboxes id
    var taskNo = element.id;
    taskNo = taskNo.substr(5);
 
    // access the relevant task div and cross button using the task number
    var taskDiv = document.getElementById("taskdiv" + taskNo);
    var crossBtn = document.getElementById("cross" + taskNo);
 
    var newParent;
 
    // decide where to move task div and change visibiliy of cross button based on state of checkbox 
    if (document.getElementById(`check${taskNo}`).checked == true) {
        newParent = document.getElementById("completedSection");
        crossBtn.style.visibility = "visible";
    } else {
        newParent = document.getElementById("tasksSection");
        crossBtn.style.visibility = "hidden";
    }
    newParent.appendChild(taskDiv);
    */
}


function deleteTask(element) {
    console.log(element)
    element.parentElement.remove()
    /*
    var taskNo = element.id;
    taskNo = taskNo.substr(5);

    // get the relevant task div using the task number and remove from screen
    var taskDiv = document.getElementById("taskdiv" + taskNo);
    taskDiv.remove();
    */
}


function saveTasks() {
    localStorage.clear();

    var tasks = document.getElementsByClassName("task");

    for (let i = 0; i < tasks.length; i++) {
        var taskDiv = tasks[i];
        var taskIdNo = taskDiv.id.substr(7);

        var taskText = document.getElementById("task" + taskIdNo);
        var taskCheck = document.getElementById("check" + taskIdNo);

        if (taskCheck.checked == true) {
            localStorage.setItem(taskText.value, "completed")
        } else {
            localStorage.setItem(taskText.value, "uncompleted")
        }
    }
}


var taskCount = 0;

for (let i = 0; i < localStorage.length; i++) {
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
