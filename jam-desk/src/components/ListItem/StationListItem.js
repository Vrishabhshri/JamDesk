import React, { useState } from 'react';
import './ListItem.css';

const StationListItem = ({ onSelectionChange, listItem }) => {

    const [selected, setSelected] = useState(false);

    const handleSelect = () => {

        setSelected(!selected)
        onSelectionChange(!selected, {name: listItem.name, audioFileID: listItem.id})

    };

    return (

        <div className={`list-item ${selected ? 'clicked' : ''}`} onClick={handleSelect}> {listItem[0]}, {listItem[1].date.toDateString()} </div>

    )

}

export default StationListItem;