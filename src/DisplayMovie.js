import React from 'react';
import './App.css';

const DisplayMovie = (props) => {
    return (
        <div className="movie">
            <p>{props.name} : <p class="dog">{props.dogStat}</p></p>
            <div className="poster">
                <img src={props.img} alt='' />
            </div>
        </div>
    )
}

export default DisplayMovie;