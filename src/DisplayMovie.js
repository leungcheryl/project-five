import React from 'react';

const DisplayMovie = (props) => {
    return (
        <div className="movie">
            <p>{props.name} : <span>{props.dogStat}</span></p>
            <img src={props.img} alt='' />
        </div>
    )
}

export default DisplayMovie;