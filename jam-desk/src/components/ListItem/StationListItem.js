import React, { useState } from 'react';
import './ListItem.css';

const StationListItem = ({ key, onSelectionChange, listItem }) => {

    const [selected, setSelected] = useState(false);

    const handleSelect = () => {

        setSelected(!selected)
        onSelectionChange(!selected, {name: listItem.name, audioFileID: listItem.id})

    };

    return (

        <div className={`list-item ${selected ? 'clicked' : ''}`} onClick={handleSelect}> {listItem.name}, {listItem.id} </div>

    )

}

export default StationListItem;