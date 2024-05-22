// app.js

document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('task-form').addEventListener('submit', addTask);
document.getElementById('task-list').addEventListener('click', manageTask);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask(e) {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please add a task');
        return;
    }

    addTaskToDOM(taskText);
    saveTaskToLocalStorage(taskText);

    taskInput.value = '';
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.textContent = task;

    const editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.textContent = 'Edit';
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = 'Delete';
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function manageTask(e) {
    if (e.target.classList.contains('edit')) {
        editTask(e.target.parentElement);
    } else if (e.target.classList.contains('delete')) {
        deleteTask(e.target.parentElement);
    }
}

function editTask(taskElement) {
    const newTask = prompt('Edit your task:', taskElement.firstChild.textContent);

    if (newTask !== null && newTask.trim() !== '') {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        const index = tasks.indexOf(taskElement.firstChild.textContent);
        tasks[index] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskElement.firstChild.textContent = newTask;
    }
}

function deleteTask(taskElement) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = tasks.filter(task => task !== taskElement.firstChild.textContent);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    taskElement.remove();
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
alert("welcome my add task");