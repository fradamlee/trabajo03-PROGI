// to-dos.js
const apiURL = 'http://localhost:3000/api/todos';

// Fetch all tasks from backend
export const fetchTodos = async () => {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.todos;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

// Add new task
export const addTodo = async (task) => {
  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

// Delete task
export const deleteTodo = async (id) => {
  try {
    await fetch(`${apiURL}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

// Toggle task completion
export const toggleTodoCompletion = async (id, completed) => {
  try {
    await fetch(`${apiURL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
  } catch (error) {
    console.error('Error toggling task completion:', error);
  }
};
