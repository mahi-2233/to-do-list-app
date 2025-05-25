// Get the necessary DOM elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Initialize the tasks array (fetch from localStorage if exists)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render the tasks list
function renderTasks() {
    taskList.innerHTML = "";  // Clear the list before rendering
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.toggle("completed", task.completed);
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div>
                <button class="completeBtn" onclick="toggleComplete(${index})">✔</button>
                <button class="deleteBtn" onclick="deleteTask(${index})">❌</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;  // Don't add empty tasks

    // Add the task to the tasks array
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";  // Clear input field

    // Update localStorage and re-render the list
    updateLocalStorage();
    renderTasks();
}

// Mark a task as complete
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    renderTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);  // Remove the task at the given index
    updateLocalStorage();
    renderTasks();
}

// Save tasks to localStorage
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listener to add task
addBtn.addEventListener("click", addTask);

// Allow hitting 'Enter' to add a task
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Render the tasks when the page loads
renderTasks();
