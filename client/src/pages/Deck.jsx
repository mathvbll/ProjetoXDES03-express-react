import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, Navigate } from 'react-router-dom';

import Card from './Card';
import './Deck.css'; // Adicionando o CSS para o contêiner rolável

import Header from './Header'

function Deck({ id }) {
    const [username, setUsername] = useState("")
    const [cards, setCards] = useState([]);

    useEffect ( () => {

        deckHandler()

    }, [])

    const deckHandler = (e) =>
    {
        e.preventDefault()

        Axios.get("http://localhost:3001/cards/deck", {

        }).then( () => {
            setCards(response.data)
            console.log(cards)
        }).catch( () => {
            setError("There was an error fetching the user's deck!");
        })
    }


    return (
      <div>
        <Header username={username} />
        <div className="deck-container">
            <h1>User's Deck</h1>
            {cards.map((card) => 
            
                {return <SearchResult result={result} key={index}/>}
        )}
            <Link to="/home">View more cards.</Link>
        </div>
        </div>
    );
}

export default Deck;