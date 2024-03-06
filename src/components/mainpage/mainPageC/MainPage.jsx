import React, {useState, useEffect} from 'react'
import Header from '../header/Header'
import "./MainPage.scss"

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};


export default function MainPage() {


   

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTodoInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const [todoInfo, setTodoInfo] = useState({
    day: '',
    workTodo: '',
    time: '',
    taskName: '',
    deadline: ''
  });


  const [formOpen, setFormOpen] = useState(false); 


  const [list, setList] = useState(getLocalStorage());
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const timestamp = new Date().getTime().toString();
    const id = timestamp.slice(-3); 
    const addedItem = {
      id: id,
      day: todoInfo.day,
      workTodo: todoInfo.workTodo,
      time: todoInfo.time,
      taskName: todoInfo.taskName,
      deadline: todoInfo.deadline
    };
  
    setList([...list, addedItem]); 

    setTodoInfo({
      day: '',
      workTodo: '',
      time: '',
      taskName: '',
      deadline: ''
    });
  };
  

  const toggleForm = () => {
    setFormOpen(!formOpen);
  };

  const deleteItem = (id) => {
   let confirm = prompt("Are you sure you want to delete it? Type 'yes' if you want!")
   if(confirm === "yes"){
    const newItem = list.filter((item) => item.id !== id);
    setList(newItem);
   } else{
    console.log("didn't do it");
   }
  }

  const editElement = (id) => {
  let confirm = prompt("Are you sure you want to delete it? Your info will be first deleted and created again, don't panic your existing info will be saved! Type 'yes' if it is okay!")
  if (confirm ==="yes") {
    const selectedItem = list.find(item => item.id === id);
    if (selectedItem) {
        setTodoInfo({
            day: selectedItem.day,
            workTodo: selectedItem.workTodo,
            time: selectedItem.time,
            taskName: selectedItem.taskName,
            deadline: selectedItem.deadline
        });
        const updatedList = list.filter(item => item.id !== id);
        setList(updatedList);
    }
  } else {
    console.log("Didn't edited");
  }
};



  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));

  }, [list]);

  return (
   <div>
     <Header list={list}todoInfo={todoInfo}
        handleSubmit={handleSubmit}
        toggleForm ={toggleForm}
        handleChange={handleChange}
        formOpen={formOpen}  item={todoInfo} deleteItem = {deleteItem} editElement={editElement}/>
    
   </div>
  )
}
