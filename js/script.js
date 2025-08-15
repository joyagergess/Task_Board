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
  tasks.forEach((task, index) => {
    const card = document.createElement("div");
    card.className = "task-card";

    const statusBar = document.createElement("div");
    statusBar.className = "task-status";
    statusBar.style.background = "orange";

    const taskText = document.createElement("p");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

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

    actions.append(editBtn, deleteBtn);
    card.append(statusBar, taskText, actions);
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
