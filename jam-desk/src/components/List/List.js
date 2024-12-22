import React from 'react';
import ListItem from '../ListItem/ListItem';
import './List.css';

const List = ({ onSelectionChange, size, listItems }) => {



    return (

        <div className={`list ${size}`}>

            {listItems.map((_, index) => (

                <ListItem key={index} onSelectionChange={onSelectionChange}/>

            ))}

        </div>
    
    )

}

export default List;