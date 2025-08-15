const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const filterButtons = document.querySelectorAll(".filter-nav button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Show tasks
function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (currentFilter === "completed" && !task.completed) return;
    if (currentFilter === "pending" && task.completed) return;

    const card = document.createElement("div");
    card.className = "task-card";

    const statusBar = document.createElement("div");
    statusBar.className = "task-status";
    statusBar.style.background = task.completed ? "green" : "orange";

    const taskText = document.createElement("p");
    taskText.className = "task-text";
    taskText.textContent = task.text;
    if (task.completed) taskText.classList.add("completed");

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggle-btn";
    toggleBtn.textContent = task.completed ? "Undo" : "Done";
    toggleBtn.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      displayTasks();
    };

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const input = document.createElement("input");
      input.value = task.text;
      card.replaceChild(input, taskText);
      editBtn.style.display = "none";

      const saveBtn = document.createElement("button");
      saveBtn.className = "save-btn";
      saveBtn.textContent = "Save";
      saveBtn.onclick = () => {
        if (input.value.trim() === "") {
          errorMsg.textContent = "Task cannot be empty!";
          return;
        }
        task.text = input.value.trim();
        saveTasks();
        displayTasks();
      };
      actions.insertBefore(saveBtn, deleteBtn);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      displayTasks();
    };

    actions.append(toggleBtn, editBtn, deleteBtn);
    card.append(statusBar, taskText, actions);
    taskList.appendChild(card);
  });
}

// Add task
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

// Filter
filterButtons.forEach(btn => {
  btn.onclick = () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    displayTasks();
  };
});

displayTasks();
