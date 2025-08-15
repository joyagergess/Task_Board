const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = []; 

// Display tasks
function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    taskList.appendChild(li);
  });
}

// Add new task
addTaskBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push(text);
  taskInput.value = "";
  displayTasks();
};

displayTasks();
