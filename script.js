const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");

//Load all event

loadEventListeners();

//custom function : loadEventListeners

function loadEventListeners() {
  // Dom load Event
  document.addEventListener("DOMContentLoaded", getTasks);
  // add tasks event
  form.addEventListener("submit", addTask);
  // remove task
  taskList.addEventListener("click", removeTask);
  // clear task
  clearBtn.addEventListener("click", clearTask);

  // filter
  filter.addEventListener("keyup", filterTask);
}

// function addTask

function addTask(e) {
  if (taskInput.value === "") {
    alert("add a task");
  } else {
    // create li element

    const li = document.createElement("li");

    //add class

    li.className = "collection-item";

    //create text node appens to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create li element

    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content";
    //Add icon Html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    //add into local storage

    addTaskInLocalStorage(taskInput.value);
  }
  e.preventDefault();
}

// function  addTaskInLocalStorage
function addTaskInLocalStorage(newTask) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// function getTasks

function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // create li element
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    //create text node appens to li
    li.appendChild(document.createTextNode(task));
    // create li element
    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content";
    //Add icon Html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
  });
}

// function removeTask

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    console.log("clicked done");
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // remove from local storage
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  console.log("click event fired");
  e.preventDefault();
}

// function  removeFromLocalStorage
function removeFromLocalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// function clearTask

function clearTask() {
  //taskList.innerHTML = "";

  //faster way

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //clearFrom Local Storage
  clearFromLocalStorage();
}

// function filterTask
function filterTask(e) {
  var text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

//function clear from storage

function clearFromLocalStorage() {
  localStorage.clear();
}
