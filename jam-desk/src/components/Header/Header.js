import React from 'react';
import './Header.css';

const Header = () => {

    const handleOnClick = () => {

      window.location.href = '/';

    }

  return (

    <div className='header' onClick={handleOnClick}>

      JamDesk

    </div>

  )

}

export default Header;