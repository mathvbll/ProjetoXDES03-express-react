import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa";
import Axios from 'axios';
import "./Card.css";

function Card({ cardData, closeModal }) {
    const { id, name, level, atk, def, desc, card_images } = cardData;
    const imageUrl = card_images && card_images.length > 0 ? card_images[0].image_url : "";

    const [error, setError] = useState(null);

    const addHandler = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        Axios.put("http://localhost:3001/cards/deck", {
            card: name
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            alert("Card added!");
            console.log(res.status)
        }).catch((error) => {
            setError("There was an error adding the card!");
        });
    }

    const deleteHandler = (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
    
        Axios.delete("http://localhost:3001/cards/deck", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                card: id
            }
        }).then(() => {
            alert("Card removed!");
        }).catch((error) => {
            setError("There was an error removing the card!");
            console.error(error);
        });
    }

    return (
        <div className="card-overlay" onClick={closeModal}>
            <div className="card-wrapper" onClick={(e) => e.stopPropagation()}>
                <button onClick={closeModal}>
                    <FaTimes id="close-icon" />
                </button>
                <div>
                    <img src={imageUrl} id="card-image" alt={name} className="card-image" />
                </div>
                <div>
                    <h3 className="card-name">{name}</h3>
                    <h3 className="card-info">LVL.: {level} ATK: {atk} DEF: {def}</h3>
                    <h3 className="description">{desc}</h3>
                </div>
                <div>
                    <button onClick={addHandler}>ADD TO DECK</button>
                    <button onClick={deleteHandler}>REMOVE FROM DECK</button>
                </div>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

export default Card;