import React from "react"

import SearchResult from "./SearchResult"

import "./SearchResultList.css"

function SearchResultList ( props ) 
{
    const { results } = props
    
    return (
        <div className="results-list">
            { results.map((result, index) => {
                return <SearchResult result={result} key={index}/>
            })}
        </div>
    )
}

export default SearchResultList