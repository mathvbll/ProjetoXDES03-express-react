import React, { useState } from 'react'
import "./SearchBox.css"

import { FaSearch } from "react-icons/fa"

function SearchBox ( { setResults })
{
    const [input, setInput] = useState("")

    const fetchData = ( value ) =>
    {
        fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
            .then( (response) => response.json() )
            .then( (json)  =>
            {
                const results = json.data.filter( (card) => {
                    return (
                    value 
                    && card 
                    && card.name 
                    && card.name.toLowerCase().includes(value))
                })
                console.log(results)
                setResults(results)
            })
            
    }   

    const handleChange = ( value ) =>
    {
        setInput(value)
        fetchData(value)
    }

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input 
                placeholder="Search card here..." 
                value={input} 
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    )
}

export default SearchBox 