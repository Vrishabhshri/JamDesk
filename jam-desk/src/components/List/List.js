import React from 'react';
import ProjectListItem from '../ListItem/ProjectListItem';
import './List.css';

const List = ({ onSelectionChange, size, listItems }) => {



    return (

        <div className={`list ${size}`}>

            {listItems.map((listItem, index) => (

                <ProjectListItem key={index} onSelectionChange={onSelectionChange} listItem={listItem}/>

            ))}

        </div>
    
    )

}

export default List;