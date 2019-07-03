import React from 'react';
import './App.css';

const DisplayMovie = (props) => {
    return (
        <div className="movie">
            <p className="movie-name">{props.name}</p>
            <p className="dog">{props.dogStat}</p>
            <div className="poster">
                <img src={props.img} alt='' />
            </div>
        </div>
    )
}

export default DisplayMovie;