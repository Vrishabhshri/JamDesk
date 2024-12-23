import React, { useState } from 'react';
import './ListItem.css';

const ListItem = ({ key, onSelectionChange, listItem }) => {

    const [selected, setSelected] = useState(false);

    const handleSelect = () => {

        setSelected(!selected)
        onSelectionChange(!selected, {name: listItem.name, projectID: listItem.projectID})

    };

    return (

        <div className={`list-item ${selected ? 'clicked' : ''}`} onClick={handleSelect}> {listItem.name}, {listItem.projectID} </div>

    )

}

export default ListItem