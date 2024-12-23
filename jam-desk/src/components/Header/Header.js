import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  const handleOnClick = () => {

    navigate('/');

  }

  return (

    <div className='header' onClick={handleOnClick}>

      JamDesk

    </div>

  )

}

export default Header;