import React from 'react';
import './Station.css';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import ListItemOptions from '../../components/ListItemOptions/ListItemOptions';

const Station = () => {

  return (

    <div className='Station'>
        
        <Header/>
        <List/>
        <ListItemOptions/>
    
    </div>

  )

}

export default Station;