import React, { useState } from "react";
import Card from './Card';

import "./SearchResult.css"

function SearchResult({ result }) {
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

    return (
        <div className="search-result" onClick={modalHandler}>
            {result.name}
            {isModal && <Card cardData={cardData} closeModal={() => setIsModal(false)} />}
        </div>
    );
}

export default SearchResult;