import React from 'react';
import Header from '/Users/vrish/Desktop/Projects/JamDesk/jam-desk/src/components/Header/Header.js';
import NavBar from '../../components/NavBar/NavBar';
import './HomePage.css';

const HomePage = () => {
  return (
    
    <div className='HomePage'>

        <NavBar />

        <div className='page'>

            <div className='header-box'>

                <Header />

            </div>

        </div>

    </div>

  )
}

export default HomePage