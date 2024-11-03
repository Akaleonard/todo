import '../Todo.css';

const Todo = ({ todo, onDelete, onEditClick }) => {
  return (
    <div className="todo-item">
      <h3>{todo.name}</h3>
      <div className="todo-icons">
        <span className="edit-icon" onClick={() => onEditClick(todo)}>
          ✏️
        </span>
        <span className="delete-icon" onClick={() => onDelete(todo._id)}>
          ❌
        </span>
      </div>
    </div>
  );
};

export default Todo;
