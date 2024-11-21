// Select elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const newTask = { id: Date.now(), text: taskText, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  showNotification("Task added successfully!", "success");
  taskInput.value = "";
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className =
      "flex justify-between items-center bg-gray-200 p-2 rounded shadow";

    taskItem.innerHTML = `
      <span class="${
        task.completed ? "line-through text-gray-500" : ""
      } cursor-pointer flex-1" onclick="toggleTask(${task.id})">
        ${task.text}
      </span>
      <button class="text-green-500  mx-2" onclick="showUpdateModal(${
        task.id
      }, '${task.text}')">Edit</button>
      <button class="text-red-500" onclick="showDeleteModal(${
        task.id
      })">Delete</button>
    `;

    taskList.appendChild(taskItem);
  });
}

// Toggle task completion
function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

// Show Update Modal
function showUpdateModal(id, currentText) {
  updateInput.value = currentText;
  currentTaskId = id;
  updateModal.classList.remove("hidden");
}

// Confirm Update
confirmUpdateBtn.addEventListener("click", () => {
  const newText = updateInput.value.trim();
  if (newText) {
    tasks = tasks.map((task) =>
      task.id === currentTaskId ? { ...task, text: newText } : task
    );
    saveTasks();
    renderTasks();
    showNotification("Task updated successfully!", "success");
  }
  updateModal.classList.add("hidden");
});

// Cancel Update
cancelUpdateBtn.addEventListener("click", () => {
  updateModal.classList.add("hidden");
});

// Show Delete Modal
function showDeleteModal(id) {
  taskToDelete = id;
  deleteModal.classList.remove("hidden");
}

// Confirm Delete
confirmDeleteBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => task.id !== taskToDelete);
  saveTasks();
  renderTasks();
  showNotification("Task deleted successfully!", "delete");
  deleteModal.classList.add("hidden");
});

// Cancel Delete
cancelDeleteBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
});

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Show notification
function showNotification(message, type) {
  const notificationContainer = document.getElementById(
    "notificationContainer"
  );

  const notification = document.createElement("div");
  notification.className =
    "px-4 py-2 rounded shadow-lg transition transform duration-300 ease-in-out";

  if (type === "success") {
    notification.classList.add("bg-green-500", "text-white");
  } else if (type === "delete") {
    notification.classList.add("bg-red-500", "text-white");
  }

  notification.innerText = message;
  notificationContainer.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("opacity-0", "translate-x-4");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
