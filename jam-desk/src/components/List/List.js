import React from 'react';
import ListItem from '../ListItem/ListItem';
import './List.css';

const List = ({ onSelectionChange, size }) => {

    return (

        <div className={`list ${size}`}>

            {[...Array(20)].map((_, index) => (

                <ListItem key={index} onSelectionChange={onSelectionChange}/>

            ))}

        </div>
    
    )

}

export default List;