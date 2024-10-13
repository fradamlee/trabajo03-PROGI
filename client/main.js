
import { fetchTodos, addTodo, deleteTodo, toggleTodoCompletion } from './api/to-dos';

const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');

// Render the tasks from the server when the page loads
const renderTasks = async () => {
  taskList.innerHTML = ''; // Clear the task list
  const todos = await fetchTodos(); // Fetch tasks from the back-end
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.task;
    li.className = todo.completed ? 'completed' : '';

    // Add click event to mark as completed or uncompleted
    li.addEventListener('click', async () => {
      await toggleTodoCompletion(todo.id, !todo.completed);
      renderTasks(); // Re-render the tasks after update
    });

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', async () => {
      await deleteTodo(todo.id);
      renderTasks(); // Re-render tasks after deletion
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
};

// Add a new task when the button is clicked
addTaskButton.addEventListener('click', async () => {
  const task = taskInput.value.trim();
  if (task) {
    await addTodo(task); // Add task through API
    taskInput.value = ''; // Clear the input
    renderTasks(); // Re-render the tasks
  }
});

// Call renderTasks when the page loads to fetch all tasks
renderTasks();