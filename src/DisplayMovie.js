import React from 'react';
import './App.css';

const DisplayMovie = (props) => {
    return (
        <div className="movie">
            <p>{props.name}</p>
            <p class="dog">{props.dogStat}</p>
            <div className="poster">
                <img src={props.img} alt='' />
            </div>
        </div>
    )
}

export default DisplayMovie;