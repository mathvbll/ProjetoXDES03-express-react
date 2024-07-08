import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.css"

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Deck from './pages/Deck'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
        <Register />
    </div>
  );
}

export default App
