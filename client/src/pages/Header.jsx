import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ username }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleViewDecks = () => {
        navigate('/deck');
    };

    

    return (
        <header className="header">
            <div className="greeting">Olá, {username}</div>
            <div className="header-buttons">
                <button onClick={handleViewDecks}>See Decks</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
}

export default Header;