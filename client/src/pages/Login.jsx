import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import "./Login.css"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const logUser = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:3001/auth/login', {
            username: username,
            password: password
        })
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        })
        .catch((error) => {
            setError("There was an error logging the user!");
            console.error("There was an error logging the user!", error);
        });
    }

    return (
        <div className="auth-form-container">
            <form className="user_log_form" onSubmit={logUser}>
                <h1 className="title">Logar-se</h1>
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
                <button className="log_user" type="submit">Logar</button>
            </form>

            <div>
                <label htmlFor="create_user">Não tem cadastro?</label>
                <Link to="/register" className="link-btn">
                    <button className="create_user">Registrar</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;