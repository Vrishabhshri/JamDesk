import React from 'react';
import './Title.css';
import { useNavigate } from 'react-router-dom';

const Title = () => {

    const navigate = useNavigate();

    const handleOnClick = () => {

        navigate('/projects');

    }

    return (

        <div className='title' onClick={handleOnClick}>

            JamDesk

        </div>

    )

}

export default Title;