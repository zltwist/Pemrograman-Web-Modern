import React, { useState, useEffect } from 'react';

const CRUDOperationsDemo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    completed: false,
  });

  // Fetch todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTodos();
  }, []);

  // Create new todo
  const createTodo = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          completed: formData.completed,
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      const newTodo = await response.json();

      // Karena JSONPlaceholder tidak benar-benar menyimpan data,
      // kita simulasi ID baru
      newTodo.id = Math.random();
      setTodos((prev) => [newTodo, ...prev]);

      // Reset form
      setFormData({ title: '', completed: false });

      console.log('Todo created:', newTodo);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update todo
  const updateTodo = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${editingTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editingTodo,
          title: formData.title,
          completed: formData.completed,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();

      // Update local state
      setTodos((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );

      // Reset editing state
      setEditingTodo(null);
      setFormData({ title: '', completed: false });

      console.log('Todo updated:', updatedTodo);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      // Remove from local state
      setTodos((prev) => prev.filter((todo) => todo.id !== id));

      console.log('Todo deleted:', id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const startEditing = (todo) => {
    setEditingTodo(todo);
    setFormData({ title: todo.title, completed: todo.completed });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTodo(null);
    setFormData({ title: '', completed: false });
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">CRUD Todo Demo</h1>

      {error && <p className="text-red-500 mb-2">Error: {error}</p>}
      {loading && <p>Loading...</p>}

      <form onSubmit={editingTodo ? updateTodo : createTodo} className="mb-4 space-y-2">
        <input
          type="text"
          name="title"
          placeholder="Todo title"
          value={formData.title}
          onChange={handleFormChange}
          className="border rounded p-2 w-full"
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleFormChange}
          />
          <span>Completed</span>
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingTodo ? 'Update Todo' : 'Add Todo'}
        </button>
        {editingTodo && (
          <button
            type="button"
            onClick={cancelEditing}
            className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        )}
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="border p-2 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{todo.title}</p>
              <p className="text-sm text-gray-500">
                Status: {todo.completed ? 'Completed' : 'Pending'}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => startEditing(todo)}
                className="bg-yellow-400 px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRUDOperationsDemo;
