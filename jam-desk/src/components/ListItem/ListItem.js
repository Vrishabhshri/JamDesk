import React, { useState } from 'react';
import './ListItem.css';

const ListItem = ({ onSelectionChange }) => {

    const [selected, setSelected] = useState(false);

    const handleSelect = () => {

        setSelected(!selected)
        onSelectionChange(!selected)

    };

    return (

        <div className={`list-item ${selected ? 'clicked' : ''}`} onClick={handleSelect}> Song </div>

    )

}

export default ListItem