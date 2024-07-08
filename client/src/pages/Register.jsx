import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import "./Register.css"

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:3001/auth/register', {
            username: username,
            email: email,
            password: password
        })
        .then((response) => {
            //localStorage.setItem('token', response.data.token);
            alert("User registered!");
            navigate('/login');  // Redireciona para a página de login
        })
        .catch((error) => {
            setError("There was an error registering the user!");
            console.error("There was an error registering the user!", error);
        });
    }

    return (
        <div className="auth-form-container">
            <form className="user_reg_form" onSubmit={registerUser}>
                <h1 className="title">Registrar-se</h1>
                <div className="form_row">
                    <label htmlFor="username">
                        <div>Nome de usuário:</div>
                    </label>
                    <input
                        className= "username-input"
                        type="text"
                        value={username}
                        name="username"
                        onChange={e => setUsername(e.target.value)}
                    />

                    <label htmlFor="email">
                        <div>E-Mail:</div>
                    </label>
                    <input
                        className= "email-input"
                        type="email"
                        value={email}
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">
                        <div>Senha:</div>
                    </label>
                    <input
                        className= "password-input"
                        type="password"
                        value={password}
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button className="reg_user" type="submit">Registrar</button>
            </form>

            <div>
                <label htmlFor="create_user">Já tem cadastro?</label>
                <Link to="/login" className="link-btn">
                    <button className="create_user">Logar</button>
                </Link>
            </div>
        </div>
    )
}

export default Register;