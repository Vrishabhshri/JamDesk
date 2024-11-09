import React from 'react';
import ListItem from '../ListItem/ListItem';
import './List.css';

const List = ({ onSelectionChange }) => {

    return (

        <div className='list'>

            {[...Array(20)].map((_, index) => (

                <ListItem key={index} onSelectionChange={onSelectionChange}/>

            ))}

        </div>
    
    )

}

export default List;