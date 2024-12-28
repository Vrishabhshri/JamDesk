import React, { useEffect, useState } from 'react';
import './ListItem.css';

const StationListItem = ({ onSelectionChange, listItem }) => {

    const [selected, setSelected] = useState(false);

    const handleSelect = () => {

        setSelected(!selected)

    };

    return (

        <div className={`list-item ${selected ? 'clicked' : ''}`} onClick={handleSelect}> {listItem[0]}, {listItem[1].date} </div>

    )

}

export default StationListItem;