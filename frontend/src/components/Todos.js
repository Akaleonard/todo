import { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './Todo.js';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
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
        placeholder="Add new todo"
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        todos.map((todo) => (
          <Todo key={todo._id} todo={todo} onDelete={handleDeleteTodo} />
        ))
      )}
    </div>
  );
};

export default Todos;
