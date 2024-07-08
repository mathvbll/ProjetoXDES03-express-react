import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, Navigate } from 'react-router-dom';

import Card from './Card';
import './Deck.css'; // Adicionando o CSS para o contêiner rolável

import Header from './Header'

function Deck({ id }) {
    const [cards, setCards] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    const [username, setUsername] = useState('');

    const [isModal, setIsModal] = useState(false);
    const [cardData, setCardData] = useState({});

    const fetchCardData = () => {
        fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${result.name}`)
            .then((response) => response.json())
            .then((json) => {
                const card = json.data[0];
                setCardData(card);
            });
    };

    const modalHandler = () => {
        setIsModal(true);
        fetchCardData();
    };


    useEffect(() => {
        // Simulate fetching user data
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setUsername('Usuário'); 
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        // Fetch cards data based on deck ID
        const fetchCards = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/deck/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCards(response.data.cards);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        if (isAuthenticated) {
            fetchCards();
        }
    }, [id, isAuthenticated]);


    return (
      <div>
        <Header username={username} />
        <div className="deck-container">
            {cards.map((card) => (
                <Card key={card.id} cardData={card} />
            ))}
            <Link to="/home">View more cards.</Link>
        </div>
        </div>
    );
}

export default Deck;