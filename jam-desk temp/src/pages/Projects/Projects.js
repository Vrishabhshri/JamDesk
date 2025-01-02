import React, { useState, useEffect } from 'react';
import './Projects.css';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import ProjectListItemOptions from '../../components/ListItemOptions/ProjectListItemOptions';
import { createProject, fetchProjects } from '../../services/projectService';
import { useNavigate } from 'react-router-dom';

const Projects = () => {

  const [selectedProjects, setSelectedProjects] = useState({});
  const [projects, setProjects] = useState([]);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  
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

  // Handle create project

  const handleCreateProject = async () => {

    const projectData = {

      "id": "newID",
      "name": "New Project",
      "dateCreated": new Date().toDateString(),
      "lastUpdated": new Date().toDateString(),
      "audioFiles": {},
      "people": {}

    }
    createProject(projectData);
    localStorage.setItem('project', JSON.stringify(projectData));
    navigate('/station');

  }

  // const handleOpenPress = async () => {
  
  //   try {

  //     const projectData = await fetchProjectByID(Number(Object.keys(selectedProjects)[0]));
  //     // navigate('/station', { state: { project: projectData } });
  //     localStorage.setItem('project', JSON.stringify(projectData));
  //     navigate('/station');

  //   }
  //   catch (error) {

  //     console.error("Error opening project:", error);

  //   }

  // }

  // Loading data about projects from database into projects view

  useEffect(() => {

    fetchProjects().then((data) => setProjects(data));

  }, []);

  return (

    <div className='Projects'>
        
        <Header/>
        <List onSelectionChange={onSelectionChange} size="large" listItems={projects} type={"project"}/>
        {Object.keys(selectedProjects).length > 0 && (<ProjectListItemOptions selectedProjects={selectedProjects}/>)}
        {Object.keys(selectedProjects).length === 0 && (
        <div
            className={`create-button ${clicked ? 'clicked' : ''}`}
            onMouseDown={() => handleMouseDown()}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleCreateProject}>
            Create Project
        </div>)}
    
    </div>

  )

}

export default Projects;