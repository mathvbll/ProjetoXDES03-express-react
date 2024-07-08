import React, { useState, useEffect } from 'react'
import { Axios } from 'axios'

import SearchBox from './SearchBox'
import SearchResultList from './SearchResultList'
import Header from './Header'

import "./Home.css"

function Home ()
{
    const [results, setResults] = useState([])

    const [username, setUsername] = useState('');

    useEffect(() => {
        // Simulate fetching user data
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                // Fetch user data using the token
                // Example: setUsername('John Doe');
                setUsername('Usuário'); // Substitute with actual username fetching logic
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className='Home'>
            <Header username={username} />
        <div className='search-bar-container'>
            <SearchBox setResults = {setResults}/>
            <SearchResultList results = {results}/>
        </div>
        </div>
    )
}

export default Home