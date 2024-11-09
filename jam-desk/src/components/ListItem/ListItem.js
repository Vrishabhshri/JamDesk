import React, { useState } from 'react';
import './ListItem.css';

const ListItem = () => {

    const [clicked, setClicked] = useState(false);

    const handleClick = () => {

        setClicked(!clicked)

    };

    return (

        <div className={`list-item ${clicked ? 'clicked' : ''}`} onClick={handleClick}> Song </div>

    )

}

export default ListItem