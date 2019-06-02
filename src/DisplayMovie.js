import React from 'react';

const DisplayMovie = (props) => {
    return (
        <div className='movie'>
            <p>{props.name}</p>
        </div>

    )
}

export default DisplayMovie;