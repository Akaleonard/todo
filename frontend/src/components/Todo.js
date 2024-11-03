import '../Todo.css';

const Todo = ({ todo, onDelete }) => {
  return (
    <div className="todo-item">
      <h3>{todo.name}</h3>
      <span className="delete-icon" onClick={() => onDelete(todo._id)}>
        ❌
      </span>
    </div>
  );
};

export default Todo;
