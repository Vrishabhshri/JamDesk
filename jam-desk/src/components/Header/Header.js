import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {

  const navigate = useNavigate();

    const handleOnClick = () => {

        navigate('/')

    }

  return (

    <div className='header' onClick={handleOnClick}>

      JamDesk

    </div>

  )

}

export default Header;