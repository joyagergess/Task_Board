const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "task-card";

    const statusBar = document.createElement("div");
    statusBar.className = "task-status";
    statusBar.style.background = "orange";

    const taskText = document.createElement("p");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    card.append(statusBar, taskText);
    taskList.appendChild(card);
  });
}

addTaskBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (!text) {
    errorMsg.textContent = "Please enter a task.";
    return;
  }
  errorMsg.textContent = "";
  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveTasks();
  displayTasks();
};

displayTasks();
