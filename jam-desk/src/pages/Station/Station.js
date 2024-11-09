import React, { useState } from 'react';
import './Station.css';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import ListItemOptions from '../../components/ListItemOptions/ListItemOptions';

const Station = () => {

  const [selectedCount, setSelectedCount] = useState(0);

    const handleSelectionChange = (isSelected) => {

      setSelectedCount(count => {

        const newCount = isSelected ? count + 1 : count - 1;
        return newCount >= 0 ? newCount : 0;

    });

  }

  return (

    <div className='Station'>
        
        <Header/>
        <List onSelectionChange={handleSelectionChange}/>
        {selectedCount > 0 && <ListItemOptions selectedCount={selectedCount}/>}
    
    </div>

  )

}

export default Station;