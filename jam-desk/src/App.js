import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';


function App() {

    return (
        <div className="App">

            <NavBar />

            <Router> 
                <Routes> 
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
            
        </div>
    );
}

export default App;