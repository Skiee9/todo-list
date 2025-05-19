import React, { useState, useEffect, useRef } from 'react'
import TodoItem from './components/TodoItem'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all') 
  const inputRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) setTodos(JSON.parse(saved))
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (task.trim()) {
      const newTodo = {
        id: Date.now(),
        text: task.trim(),
        completed: false,
      }
      setTodos([newTodo, ...todos])
      setTask('')
      inputRef.current?.focus()
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed
    if (filter === 'pending') return !todo.completed
    return true
  })

  return (
    <div className="app">
      <h1>My Todos </h1>

      <div className="input-section">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}
        style={{
    backgroundColor: 'blue',  
    color: 'white',
    border: '1px solid blue',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  }}
  onMouseEnter={e => e.target.style.backgroundColor = 'lightblue'}
  onMouseLeave={e => e.target.style.backgroundColor = 'blue'}
  >Add

  </button>
      </div>

      {/* <div className="filter-section">
        <button
          onClick={() => setFilter('all')}
          style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          style={{ fontWeight: filter === 'pending' ? 'bold' : 'normal' }}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}
        >
          Completed
        </button>
      </div> */}
      <div className="filter-section">
  <button
    onClick={() => setFilter('all')}
    className={filter === 'all' ? 'active' : ''}
  >
    All
  </button>
  <button
    onClick={() => setFilter('pending')}
    className={filter === 'pending' ? 'active' : ''}
  >
    Pending
  </button>
  <button
    onClick={() => setFilter('completed')}
    className={filter === 'completed' ? 'active' : ''}
  >
    Completed
  </button>
</div>


      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <p>No tasks {filter !== 'all' ? `in ${filter}` : ''}.</p>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleComplete}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App
