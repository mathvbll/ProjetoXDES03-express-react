import React, { useEffect, useState } from 'react';
import Axios from 'axios'; // Verifique se está importando 'axios' corretamente
import { Link } from 'react-router-dom';

import './Deck.css'; // Adicionando o CSS para o contêiner rolável
import ViewDeck from './ViewDeck';
import Header from './Header';

function Deck({ id }) {
    const [username, setUsername] = useState("");
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(""); // Adicionando um estado para gerenciar erros

    useEffect(() => {
        deckHandler();
    }, []);

    const deckHandler = () => {
        const token = localStorage.getItem('token');

        Axios.get("http://localhost:3001/cards/deck", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log("Deck found!");
            console.log(res.data);
            // Certifique-se de que o dado retornado é o esperado
            if (res.data.cardlist) {
                setCards(res.data.cardlist);
            } else {
                setError("Unexpected response format");
                console.error("Expected an array, but got:", res.data);
            }
        }).catch((error) => {
            setError("There was an error fetching the deck!");
            console.error(error);
        });
    };

    return (
      <div>
        <Header username={username} />
        <div className="deck-container">
            <h1>User's Deck</h1>
            <ViewDeck deck={cards}/>
            <Link to="/home">View more cards.</Link>
        </div>
        </div>
    );
}

export default Deck;