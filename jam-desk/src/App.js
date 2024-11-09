import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';

function App() {

    return (
        <div className="App">

            <HomePage />
            
        </div>
    );
}

export default App;