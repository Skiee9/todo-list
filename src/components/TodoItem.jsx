import React from 'react'

function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'gray' : 'black',
          marginLeft: '10px',
          flex: 1
        }}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          marginLeft: '10px',
          backgroundColor: 'blue',
          border: 'none',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </div>
  )
}

export default TodoItem
