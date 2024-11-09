import React, { useState } from 'react';
import './ListItemOptions.css';

const ListItemOptions = ({ selectedCount }) => {

    const [clicked, setClicked] = useState(null);

    const handleMouseDown = (index) => {

        setClicked(index);

    }

    const handleMouseUp = () => {

        setClicked(null);

    }

    const options = ['Open', 'Delete', 'Add to Folder'];

    return (

        <div className='list-item-options'>

            {options.map((option, index) => {

                console.log(option)

                if (option === 'Open' && selectedCount > 1) return null;

                return (
                    <div
                        key={index}
                        className={`option-choice ${clicked === index ? 'clicked' : ''}`}
                        onMouseDown={() => handleMouseDown(index)}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}>
                        {option}
                    </div>
                )

            })}

        </div>

    )

}

export default ListItemOptions;