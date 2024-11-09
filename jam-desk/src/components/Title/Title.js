import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Title.css';

const Title = () => {

    const navigate = useNavigate();

    const handleOnClick = () => {

        navigate('/station')

    }

    return (

        <div className='title' onClick={handleOnClick}>

            JamDesk

        </div>

    )

}

export default Title;