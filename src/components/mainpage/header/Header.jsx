import React, { useEffect, useState } from 'react';
import "./Header.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faTrash, faEdit, faBars, faPlus, faCheck  } from '@fortawesome/free-solid-svg-icons';


export default function Header({ list, todoInfo, editElement, handleSubmit, toggleForm, handleChange, formOpen, deleteItem}) {
    const [image, setImage] = useState(null);
    const [userName, setUserName] = useState(null);
    const [showTodoList, setShowTodoList] = useState(false);
    const [hideTodoList, sethideTodoList ] =useState(false)
    const [clickedItem, setClickedItem] = useState(null);


    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('user'));
        if (storedData) {
            setImage(storedData.image);
            setUserName(storedData.name);
        }
    }, []);

    const handleToggleTodoList = () => {
        setShowTodoList(prevState => !prevState);
        sethideTodoList(true);
    };
 function singleWork(id) {
    const clicked = list.find(item => item.id === id);
    setClickedItem(clicked);
    console.log(id);
 }

 const handleCloseModal = () => {
    setClickedItem(null);
 }

    return (
        <div className='header'>
            <div className="header__bg">
                <div className="container">
                    <div className="header__main-box">
                        <div className="header__logo-box">
                            <Link to="/main" className='websiteLogo'>Todo List</Link>
                            <button className='header__ham-btn' onClick={handleToggleTodoList}>
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                        </div>

                        <div className="header__profile-box">
                            <div>
                                <img src={image} alt="profile avatar" />
                            </div>
                            <p>
                                {userName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main__body-box">
                {showTodoList && (
                    <div className={`todo-list-overlay ${hideTodoList ? 'hide' : ''}`}>
                        {list.map((item) => (
                            <div key={item.id} className="navBar__items" >
                                <p onClick={()=>singleWork(item.id)}>Work: {item.taskName}</p>
                                <div className="todo-item-buttons">
                                    <button className='delete-button' onClick={() => deleteItem(item.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <button className='edit-button' onClick={() => editElement(item.id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


{list.map(item => (
    clickedItem && clickedItem.id === item.id && (
        <div key={item.id}>
            <div className='modal-overlay'></div>
            <div className='modal'>
                <h2>Task Name: {clickedItem.taskName}</h2>
                <p>Task day: {clickedItem.day}</p>
                <p>Task time: {clickedItem.time}</p>
                <p>Task deadline: {clickedItem.deadline}</p>
                <p>Task description: {clickedItem.workTodo}</p>

                <button onClick={handleCloseModal}>Close Modal</button>
            </div>
        </div>
    )
))}



                <div className={`addTodo__main-box ${showTodoList ? 'navBarOpen' : ''}`}>
                    <div className={`container ${formOpen ? 'open' : ''}`}>
                        <h2 className='addTodo__title'>Add Todo Info</h2>
                        {formOpen && (
                            <form className='addTask__form' onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="day">Day:</label>
                                    <input type="text" id="day" name="day" value={todoInfo.day} onChange={handleChange} placeholder="Enter the day" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="workTodo">Work Todo:</label>
                                    <input type="text" id="workTodo" name="workTodo" value={todoInfo.workTodo} onChange={handleChange} placeholder="Enter the work todo" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="time">Time:</label>
                                    <input type="text" id="time" name="time" value={todoInfo.time} onChange={handleChange} placeholder="Enter the time" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="taskName">Task Name:</label>
                                    <input type="text" id="taskName" name="taskName" value={todoInfo.taskName} onChange={handleChange} placeholder="Enter the task name" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="deadline">Deadline:</label>
                                    <input type="text" id="deadline" name="deadline" value={todoInfo.deadline} onChange={handleChange} placeholder="Enter the deadline" required />
                                </div>
                                <button className='submitButton' type='submit'>
                                    Add task
                                </button>
                            </form>
                        )}
                        <button className='plus__button' onClick={toggleForm}>
                            <FontAwesomeIcon className={formOpen ? 'plus__icon invisible' : 'plus__icon'} icon={faPlus} />
                            <FontAwesomeIcon className={formOpen ? 'checked__icon visible' : 'checked__icon'} icon={faCheck}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
