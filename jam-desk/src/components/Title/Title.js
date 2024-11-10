import React from 'react';
import './Title.css';

const Title = () => {

    const handleOnClick = () => {

        window.location.href = '/projects';

    }

    return (

        <div className='title' onClick={handleOnClick}>

            JamDesk

        </div>

    )

}

export default Title;