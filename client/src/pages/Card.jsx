import React from "react";
import { FaTimes } from "react-icons/fa";

import "./Card.css";

function Card({ cardData, closeModal }) {
    const { name, level, atk, def, desc, card_images } = cardData;
    const imageUrl = card_images && card_images.length > 0 ? card_images[0].image_url : "";

    const addHandler = () =>
    {
        e.preventDefault();

        Axios.post('http://localhost:3001/addcard/${name}', {
            name: name
        }).then((response) => {

        }).catch((error) => {
            setError("There was an error adding the card");
        })

    }

    const deleteHandler = () =>
    {
        e.preventDefault()

        Axios.delete('http://localhost:3001/deletecard/${name}', {
            name: name
        }).then( (response) => {

        }).catch( (error) => {
            setError("There was an error deleting card.")
        })
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
                    <button onClick={addHandler()}>ADD TO DECK</button>
                    <button onClick={deleteHandler()}>REMOVE FROM DECK</button>
                </div>
            </div>
        </div>
    );
}

export default Card;