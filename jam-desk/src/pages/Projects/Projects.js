import React, { useState } from 'react';
import './Projects.css';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import ListItemOptions from '../../components/ListItemOptions/ListItemOptions';

const Projects = () => {

  const [selectedCount, setSelectedCount] = useState(0);

    const handleSelectionChange = (isSelected) => {

      setSelectedCount(count => {

        const newCount = isSelected ? count + 1 : count - 1;
        return newCount >= 0 ? newCount : 0;

    });

  }

  return (

    <div className='Projects'>
        
        <Header/>
        <List onSelectionChange={handleSelectionChange} size="large"/>
        {selectedCount > 0 && <ListItemOptions selectedCount={selectedCount}/>}
    
    </div>

  )

}

export default Projects;