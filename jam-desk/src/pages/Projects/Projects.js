import React, { useState, useEffect } from 'react';
import './Projects.css';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import ProjectListItemOptions from '../../components/ListItemOptions/ProjectListItemOptions';
import { fetchProjects } from '../../services/projectService';

const Projects = () => {

  const [selectedProjects, setSelectedProjects] = useState({});
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

  const onSelectionChange = (isSelected, projectInfo) => {

    setSelectedProjects(currentProjects => {

      const updatedProjects = {...currentProjects};

      if (isSelected) {

        updatedProjects[projectInfo.projectID] = projectInfo.name;

      }
      else {

        delete updatedProjects[projectInfo.projectID];

      }

      return updatedProjects;

    });

  }

  // Loading data about projects from database into projects view

  useEffect(() => {

    fetchProjects().then((data) => setProjects(data));

  }, []);

  return (

    <div className='Projects'>
        
        <Header/>
        <List onSelectionChange={onSelectionChange} size="large" listItems={projects} type={"project"}/>
        {Object.keys(selectedProjects).length > 0 && <ProjectListItemOptions selectedProjects={selectedProjects}/>}
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