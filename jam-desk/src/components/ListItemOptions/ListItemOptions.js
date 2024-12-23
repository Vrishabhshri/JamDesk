import React, { useState } from 'react';
import './ListItemOptions.css';
import { fetchProjectByID } from '../../services/projectService';

const ListItemOptions = ({ selectedCount }) => {

    const [clicked, setClicked] = useState(null);

    // Handling button animations

    const handleMouseDown = (index) => {

        setClicked(index);

        if (index === 0) {

            handleOpenPress();

        }

    }

    const handleMouseUp = () => {

        setClicked(null);

    }

    // Handling opening a project

    const handleOpenPress = async () => {

        // try {

        //     const projectData = await fetchProjectByID(selectedProjectID)

        // }

    }   

    const options = ['Open', 'Delete', 'Add to Folder'];

    return (

        <div className='list-item-options'>

            {options.map((option, index) => {

                if (option === 'Open' && selectedCount > 1) return null;

                return (
                    <div
                        key={index}
                        className={`option-choice ${clicked === index ? 'clicked' : ''}`}
                        onMouseDown={() => handleMouseDown(index)}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}>
                        {option}
                    </div>
                )

            })}

        </div>

    )

}

export default ListItemOptions;