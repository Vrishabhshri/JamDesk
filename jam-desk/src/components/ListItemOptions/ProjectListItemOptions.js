import React, { useState } from 'react';
import './ProjectListItemOptions.css';
import { fetchProjectByID } from '../../services/projectService';
import { useNavigate } from 'react-router-dom';

const ProjectListItemOptions = ({ selectedProjects }) => {

    const [clicked, setClicked] = useState(null);
    const navigate = useNavigate();

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

        try {

            const projectData = await fetchProjectByID(Number(Object.keys(selectedProjects)[0]));
            // navigate('/station', { state: { project: projectData } });
            localStorage.setItem('project', JSON.stringify(projectData));
            navigate('/station');

        }
        catch (error) {

            console.error("Error opening project:", error);

        }

    }   

    const options = ['Open', 'Delete', 'Add to Folder'];

    return (

        <div className='list-item-options'>

            {options.map((option, index) => {

                if (option === 'Open' && Object.keys(selectedProjects).length > 1) return null;

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

export default ProjectListItemOptions;