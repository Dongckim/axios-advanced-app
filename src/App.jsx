import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState({
    title:'',
  })

  const fetchTodos = async() => {
    const {data} = await axios.get('http://localhost:4000/todos');
    setTodos(data);
  }

  const onSubmitHandler = async() => {
    axios.post('http://localhost:4000/todos', inputValue)
    setTodos(...todos,inputValue)
  }

  useEffect(() => {
    fetchTodos();
  },[])

  console.log(todos)

  return (
  <div>
    <form onSubmit={(e)=>{
      e.preventDefault();
      onSubmitHandler();
    }}>
      {/* input */}
      <input type = 'text'
      value ={inputValue.title}
      onChange = {(event)=> {
        setInputValue(event.target.value)
      }}/>
      <button>추가</button>
    </form>
    
    <div>
      {/* 데이터의 영역 */}
      { todos.map((item) => {
        return (
        <div key = {item.id}>
          {item.id} : {item.title}
        </div>
        )}) }
    </div>
    
  </div>
)}

export default App;
