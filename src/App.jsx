import { useState } from 'react'
import { FaTrash, FaCheck, FaUndo } from "react-icons/fa";

import './App.css'

function App() {
  const [text, setText] = useState("")
  const [search, setSearch] = useState("")
  const [todos,setTodos]=useState([])
  const [filter,setFilter]=useState("all")

  // add Todo
  const addTodo =()=> {

    if(!text.trim()) return 
    setTodos([...todos,{id:Date.now(),title:text.trim(),achived:false}])
  }

  // Toggle achived 
  const toggleTodos=(id)=>{
    setTodos(todos.map(todo=>
      todo.id===id?{...todo,achived:!todo.achived} :todo
    ))
  }

  // Delete
  const deleteTodo=(id)=>{
    setTodos(todos.filter(todo=>todo.id!==id))
  }

  const filteredTodo= todos.filter(todo=>{
     if(filter==="achived") return todo.achived;
    if(filter==="not") return !todo.achived
    return true;
  }
  ).filter(todo=>todo.title.includes(search.toLowerCase()));



  return (
    <>
      <h1>Todo List</h1>
      <div className="input-section">
        <input className="task-input" value={text} onChange={(e)=>setText(e.target.value)}/>
        <button className="add-btn" onClick={addTodo}>Add Task</button>
      </div>
      <div className="search-section">
        <input className="search-input" placeholder='Search...' value={search} onChange={(e)=>setSearch(e.target.value)} />
      </div>
      <div className="filter-section">
        <button className='filter' onClick={() => setFilter("all")}>All</button>
        <button className='filter'  onClick={() => setFilter("achived")}>Achived</button>
        <button className='filter'  onClick={() => setFilter("not")}>Not Achived</button>
      </div>
      <ul>
        {filteredTodo.map((todo)=>(
        <li key={todo.id}>

          <span className={todo.achived ? "achived" : ""}>{todo.title}</span>
          <div className="action-section">
  <button className="icon-btn delete" onClick={() => deleteTodo(todo.id)}>
    <FaTrash />
  </button>
  <button className="icon-btn toggle" onClick={() => toggleTodos(todo.id)}>
    {todo.achived ? <FaUndo /> : <FaCheck />}
  </button>
</div>

          {/* <div className="action-section">
            <button className="action" onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button className="action" onClick={()=>toggleTodos(todo.id)}>{todo.achived?"Not Achived":"Achived"}</button>
          </div> */}
          </li>
          )
        
      )}
        </ul>
    </>
  )
}

export default App
