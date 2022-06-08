// adds a new task item to screen when 'Add Task' button is pressed
function addTask(taskStr = undefined, completed = undefined) {

    // get tasks text from the input box on screen or from function argument if a value has been passed
    var taskInputText = ""
    if (taskStr == undefined) {
        taskInputText = document.getElementById("taskInput").value
    } else {
        taskInputText = taskStr
    }

    // check input box on screen wasn't empty
    if (taskInputText != "") {

        // create new label element to hold new task and add classes
        var newTaskLabel = document.createElement("label")
        newTaskLabel.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        // create div to hold the input element and place it inside the new label
        var newTaskDiv = document.createElement("div")
        newTaskDiv.classList.add("taskDiv")
        newTaskLabel.appendChild(newTaskDiv)

        // create checkbox element, add classes and append to div
        var newCheckBox = document.createElement("INPUT");
        newCheckBox.setAttribute("type", "checkbox");
        newCheckBox.classList.add("form-check-input", "me-2", "justify-content-between", "taskCheckBox")
        newCheckBox.addEventListener('click', function () { checkTask(this) }, false);
        newTaskDiv.appendChild(newCheckBox)

        // create a text node for new task string and append to div
        var textNode = document.createTextNode(taskInputText);
        newTaskDiv.appendChild(textNode)

        // check if this task has been completed to decided where to place in list, start or end
        if (completed == true) {
            newCheckBox.checked = true; // tick the box if completed
            addDeleteBtn(newTaskLabel)
            document.getElementById("taskList").appendChild(newTaskLabel)
        } else {
            document.getElementById("taskList").prepend(newTaskLabel)
        }

        // reset the task input box
        document.getElementById("taskInput").value = ""
    }
}

function addDeleteBtn(taskLabel) {
    // create the button and icon to add to the screen, adding relevant classes
    var newBtn = document.createElement("button");
    newBtn.classList.add("invisible")
    newBtn.addEventListener('click', function () { deleteTask(this) }, false);

    var newIcon = document.createElement("i");
    newIcon.classList.add("fas", "fa-trash", "visible");

    // add the button and icon to the screen
    taskLabel.appendChild(newBtn);
    newBtn.appendChild(newIcon);
}


// toggle visibility of delete button and change position of list item depending on completion status
function checkTask(element) {

    // get the parent label element of the checked item
    var checkedLabel = element.parentElement.parentElement;

    // check if the item has been checked or unchecked
    if (element.checked == true) {

        addDeleteBtn(checkedLabel)

        // move the item to the bottom of the list
        document.getElementById("taskList").appendChild(checkedLabel)

    } else {

        // remove the delete button from the screen
        checkedLabel.querySelector(".invisible").remove();
        // move the list item to top of the list
        document.getElementById("taskList").prepend(checkedLabel)
    }
}

// remove a task from the screen when a rubbish button is clicked
function deleteTask(element) {
    element.parentElement.remove()
}

// save the tasks currentley on screen and their status to local storage
function saveTasks() {
    localStorage.clear();

    // get lists of all the task divs and the checkboxes on screen
    var taskDivs = document.getElementsByClassName("taskDiv");
    var tasksCheckBoxes = document.getElementsByClassName("taskCheckBox");

    // save each task using the text content of div as the key with a value indicating the task status
    for (let i = 0; i < taskDivs.length; i++) {

        // prepend key with 'TASK_' to identify relevant local storage items on page loading
        var taskKey = "TASK_".concat(taskDivs[i].textContent)

        if (tasksCheckBoxes[i].checked == true) {
            localStorage.setItem(taskKey, "completed")
        } else {
            localStorage.setItem(taskKey, "uncompleted")
        }
    }
}

// on page load populate the list with items from local storage
function loadTasks() {

    for (let i = 0; i < localStorage.length; i++) {
        // check item key begins with 'TASK_'
        var storageKey = localStorage.key(i)
        if (localStorage.key(i).slice(0, 5) == "TASK_") {
            // if so check if completed and pass relevant values to addTask()
            if (localStorage.getItem(storageKey) == "completed") {
                addTask(localStorage.key(i).slice(5), true)
            } else {
                addTask(localStorage.key(i).slice(5))
            }
        }
    }
}

loadTasks()
