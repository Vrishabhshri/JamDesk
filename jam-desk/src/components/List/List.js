import React from 'react';
import ListItem from '../ListItem/ListItem';
import './List.css';

const List = ({ onSelectionChange, size, listItems }) => {



    return (

        <div className={`list ${size}`}>

            {listItems.map((listItem, index) => (

                <ListItem key={index} onSelectionChange={onSelectionChange} listItem={listItem}/>

            ))}

        </div>
    
    )

}

export default List;