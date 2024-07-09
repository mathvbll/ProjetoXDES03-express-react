import React from "react";

function ViewDeck({ deck }) {
    if (!deck || deck.length === 0) {
        return <div>No cards in the deck.</div>;
    }

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
        <div>
            {deck.map((card, index) => (
                <div key={index}>
                    {card.name}
                    {isModal && <Card cardData={cardData} closeModal={() => setIsModal(false)} />}
                </div>
            ))}
        </div>
    );
}

export default ViewDeck