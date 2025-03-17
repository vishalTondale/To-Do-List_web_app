document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskName = document.getElementById("taskName").value;
    const taskPriority = document.getElementById("taskPriority").value;
    const taskNotes = document.getElementById("taskNotes").value;
    const taskDeadline = document.getElementById("taskDeadline").value;
    const taskCreation = new Date().toLocaleString();

    if (taskName.trim() === "") {
        alert("Task Name cannot be empty!");
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        priority: taskPriority,
        notes: taskNotes,
        deadline: taskDeadline,
        created: taskCreation,
        completed: false
    };

    saveTask(task);
    displayTask(task);
    clearForm();
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(displayTask);
}

function displayTask(task) {
    const taskList = document.getElementById("taskList");
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    if (task.completed) taskItem.classList.add("completed");

    taskItem.innerHTML = `
        <strong>${task.name}</strong> (${task.priority}) <br>
        <small>Created: ${task.created}</small> <br>
        <small>Deadline: ${task.deadline || "N/A"}</small> <br>
        <small>Notes: ${task.notes}</small> <br>
        <div class="task-actions">
            <button class="complete-btn" onclick="toggleComplete(${task.id})">✔ Done</button>
            <button class="edit-btn" onclick="editTask(${task.id})">✏ Edit</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">❌ Delete</button>
        </div>
    `;

    taskList.appendChild(taskItem);
}

function toggleComplete(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTasks();
}

function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks.find(task => task.id === id);

    if (task) {
        document.getElementById("taskName").value = task.name;
        document.getElementById("taskPriority").value = task.priority;
        document.getElementById("taskNotes").value = task.notes;
        document.getElementById("taskDeadline").value = task.deadline;

        deleteTask(id);
    }
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTasks();
}

function refreshTasks() {
    document.getElementById("taskList").innerHTML = "";
    loadTasks();
}

function clearForm() {
    document.getElementById("taskName").value = "";
    document.getElementById("taskNotes").value = "";
    document.getElementById("taskDeadline").value = "";
}
