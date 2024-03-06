import React, { useState } from 'react';
import './Login.scss';

export default function Login() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }

    function handleInfo(event) {
        event.preventDefault(); 

        const newItem = { name: name, image: imagePreview };
        localStorage.setItem('user', JSON.stringify(newItem));
        window.location.href = "/main";
    }

    return (
        <div className="login__bg">
            <div className="container">
                <div className="login">
                    <h1>Todo List</h1>
                    <form onSubmit={handleInfo}>
                        <input className='inputFile' type="file" aria-label='Photo' accept='.jpg, .png, .jpeg' id="fileInput" onChange={handleImageChange} required />
                        <input type="name" placeholder='Enter your name' value={name} onChange={handleNameChange} required />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
