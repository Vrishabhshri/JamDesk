import React, { useState } from 'react';
import './ListItem.css';

const ProjectListItem = ({ onSelectionChange, listItem }) => {

    const [selected, setSelected] = useState(false);

    const handleSelect = () => {

        onSelectionChange(!selected, {name: listItem.name, projectID: listItem.id});
        setSelected(!selected);

    };

    return (

        <div className={`list-item ${selected ? 'clicked' : ''}`} onClick={handleSelect}> {listItem.name} </div>

    )

}

export default ProjectListItem;