import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import Projects from './pages/Projects/Projects';
import Station from './pages/Station/Station';

function App() {

    return (
        <div className="App">

            <NavBar />

            <Router> 
                <Routes> 
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/station" element={<Station />} />
                </Routes>
            </Router>
            
        </div>
    );
}

export default App;