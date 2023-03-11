import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from "./axios/api"

function App() {
  const [todos, setTodos] = useState([]);
  const [targetID, setTargetID] = useState('');
  const [content, setContent] = useState('');
  const [inputValue, setInputValue] = useState({
    title: "",
  })

//조회함수
  const fetchTodos = async() => {
    const {data} = await api.get();
    setTodos(data);
  }
  
// 추가함수
  const onSubmitHandler = async() => {
    api.post('', inputValue)
    setTodos([...todos, inputValue])
    // fetchTodos();
}

// 삭제함수
const onDeleteClickHandler = async(id) => {
  api.delete(`/${id}`,)
  setTodos(todos.filter((item) => {
    return item.id !== id;
  }));
}

// 수정함수
const onUpdateClickHandler = async() => {
  api.patch(`/${targetID}`, {
    title:content
  });
  setTodos(todos.map((item)=>{
    if(item.id == targetID){
      return{...item, title : content}
    }else{
      return item
    }
  }))
}


  useEffect(() => {
    fetchTodos();
  },[])

  console.log(todos)

  return (
  <div>
    <div>
      {/* 수정영역 */}
      <input type='text' value = {targetID}  
      onChange={(event) => {setTargetID(event.target.value)}} placeholder='수정할 아이디'/>
      <input type='text' value = {content} 
      onChange={(event) => {setContent(event.target.value)}} placeholder='title'/>
      <button onClick={onUpdateClickHandler}>수정</button>
    </div>
    <form onSubmit={(e)=>{
      e.preventDefault();
      onSubmitHandler();
    }}>
      {/* input */}
      <input type = 'text'
      value ={inputValue.title}
      onChange = {(event)=> {
          const { value } = event.target;
          setInputValue({
            title : value,
    })}
  }/>
      <button>추가</button>
    </form>
    
    <div>
      {/* 데이터의 영역 */}
      { todos?.map((item) => {
        return (
        <div key = {item.id}>
          {item.id} : {item.title} &nbsp;
          <button onClick={()=>{onDeleteClickHandler(item.id)}}>삭제</button>
        </div>
        )}) }
    </div>
    
  </div>
)}

export default App;
