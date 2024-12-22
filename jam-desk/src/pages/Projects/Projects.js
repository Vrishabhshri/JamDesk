import React, { useState, useEffect } from 'react';
import './Projects.css';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import ListItemOptions from '../../components/ListItemOptions/ListItemOptions';
import { fetchProjects } from '../../services/projectService';

const Projects = () => {

  const [selectedCount, setSelectedCount] = useState(0);
  const [projects, setProjects] = useState([]);

  const handleSelectionChange = (isSelected) => {

    setSelectedCount(count => {

      const newCount = isSelected ? count + 1 : count - 1;
      return newCount >= 0 ? newCount : 0;

    });

  }

  useEffect(() => {

    fetchProjects().then((data) => setProjects(data));

  });

  return (

    <div className='Projects'>
        
        <Header/>
        <List onSelectionChange={handleSelectionChange} size="large" listItems={projects}/>
        {selectedCount > 0 && <ListItemOptions selectedCount={selectedCount}/>}
    
    </div>

  )

}

export default Projects;