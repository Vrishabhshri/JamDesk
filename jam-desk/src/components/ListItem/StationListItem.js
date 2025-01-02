import React, { useState } from 'react';
import './ListItem.css';

const StationListItem = ({ onSelectionChange, listItem }) => {

    const [selected, setSelected] = useState(false);

    const handleSelect = () => {

        onSelectionChange(!selected, listItem[0]);
        setSelected(!selected);

    };

    return (

        <div className={`list-item ${selected ? 'clicked' : ''}`} onClick={handleSelect}> {listItem[0]}, {listItem[1].date} </div>

    )

}

export default StationListItem;