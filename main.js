const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasks);

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Task cannot be empty');
        return;
    }
    addTask(taskText);
    taskInput.value = '';
    saveTasks();
});

function addTask(taskText, isCompleted = false) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    taskItem.classList.toggle('completed', isCompleted);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        saveTasks();
    });

    taskItem.appendChild(deleteButton);
    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        saveTasks();
    });

    taskList.appendChild(taskItem);
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((taskItem) => {
        tasks.push({
            text: taskItem.firstChild.textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => addTask(task.text, task.completed));
}

