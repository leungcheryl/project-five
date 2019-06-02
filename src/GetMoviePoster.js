import React, { Component } from 'react';
import axios from 'axios';

class GetMoviePoster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviePoster:[]
        }
    }

    async getPoster() {
        const apiKey = '8d57b009677e25546dc89ff6368e4fbe';
        try {
            const result = await axios.get(`${url}`, {
            method: 'GET',
            dataType: 'json',
            })
        }
    

}

export default GetMoviePoster;

