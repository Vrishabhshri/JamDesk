import React, { useState } from 'react';
import './ListItem.css';

const ProjectListItem = ({ onSelectionChange, listItem }) => {

    const [selected, setSelected] = useState(false);

    const handleSelect = () => {

        setSelected(!selected)
        onSelectionChange(!selected, {name: listItem.name, projectID: listItem.id})

    };

    return (

        <div className={`list-item ${selected ? 'clicked' : ''}`} onClick={handleSelect}> {listItem.name}, {listItem.id} </div>

    )

}

export default ProjectListItem;