import { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './Todo.js';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/routes');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        const response = await axios.post('http://localhost:8000/api/routes/', {
          name: newTodo,
        });
        setTodos((prevTodos) => [...prevTodos, response.data]);
        setNewTodo('');
      } catch (error) {
        console.error('Error adding new todo:', error);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/routes/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdateTodo = async (id, updatedName) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/routes/${id}`,
        {
          name: updatedName,
        }
      );
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setNewTodo('');
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setNewTodo(todo.name);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (editingTodo) {
        handleUpdateTodo(editingTodo._id, newTodo);
      } else {
        handleAddTodo();
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
        placeholder={editingTodo ? 'Update todo' : 'Add new todo'}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={
          editingTodo
            ? () => handleUpdateTodo(editingTodo._id, newTodo)
            : handleAddTodo
        }
      >
        {editingTodo ? 'Update Todo' : 'Add Todo'}
      </button>
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        todos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onEditClick={handleEditClick}
          />
        ))
      )}
    </div>
  );
};

export default Todos;
