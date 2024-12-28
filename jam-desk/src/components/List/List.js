import React from 'react';
import ProjectListItem from '../ListItem/ProjectListItem';
import StationListItem from '../ListItem/StationListItem';
import './List.css';

const List = ({ onSelectionChange, size, listItems, type }) => {

    return (

        <div className={`list ${size}`}>

            {listItems.map((listItem, index) => {

                if (type === "project") {
                    
                    return <ProjectListItem key={index} onSelectionChange={onSelectionChange} listItem={listItem}/>

                }
                else if (type === "station") {

                    return <StationListItem key={index} onSelectionChange={onSelectionChange} listItem={listItem}/>

                }


            })}

        </div>
    
    )

}

export default List;