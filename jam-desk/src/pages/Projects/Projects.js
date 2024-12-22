import React, { useState, useEffect } from 'react';
import './Projects.css';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import ListItemOptions from '../../components/ListItemOptions/ListItemOptions';
import { fetchProjects } from '../../services/projectService';

const Projects = () => {

  const [selectedCount, setSelectedCount] = useState(0);
  const [projects, setProjects] = useState([]);
  const [clicked, setClicked] = useState(false);
  
  // Handling button press for "create project"

  const handleMouseDown = () => {

      setClicked(true);

  }

  const handleMouseUp = () => {

      setClicked(false);

  }

  // Handling count for how many projects have been selected

  const onSelectionChange = (isSelected) => {

    setSelectedCount(count => {

      const newCount = isSelected ? count + 1 : count - 1;
      return newCount >= 0 ? newCount : 0;

    });

  }

  // Loading data about projects from database into projects view

  useEffect(() => {

    fetchProjects().then((data) => setProjects(data));

  });

  return (

    <div className='Projects'>
        
        <Header/>
        <List onSelectionChange={onSelectionChange} size="large" listItems={projects}/>
        {selectedCount > 0 && <ListItemOptions selectedCount={selectedCount}/>}
        <div
            className={`create-button ${clicked ? 'clicked' : ''}`}
            onMouseDown={() => handleMouseDown()}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}>
            Create Project
        </div>
    
    </div>

  )

}

export default Projects;