import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      userInput: '',
      movieId: [],
      movie: []
    }
  }

  getMovieId() {
    const movieInput = this.state.userInput
    console.log(movieInput)

      axios.get(
          'https://cors-anywhere.herokuapp.com/https://www.doesthedogdie.com/search?',
          {
            method: 'GET',
            dataType: 'json',
            headers: {
              'X-API-KEY': 'e39ba046c39413e2c04848ae44e80a73',
              Accept: 'application/json'
            },
            params: {
              q: movieInput
            }
          }
        )
        .then(response => {
          
          response = response.data.items
          console.log(response)
          
          const id = response.map(movies => {
            return movies.id
          })

          console.log(id)
          this.setState ({
            movieId:id
          })
          console.log(this.state.movieId)

          const inputId = this.state.movieId;
          
        
          inputId.map((value) => {
            const url = `https://cors-anywhere.herokuapp.com/https://www.doesthedogdie.com/media/${value}`
            return axios.get(`${url}`, {
              method: 'GET',
              dataType: 'json',
              headers: {
                'X-API-KEY': 'e39ba046c39413e2c04848ae44e80a73',
                Accept: 'application/json'
              }
            })
            .then(result => {
              console.log(result)
            })
          })
          

        })

  }


  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      userInput: ''
    })
    this.getMovieId()
  }

  render() {
    return (
    <div className="App">
      <form action="">
        <input 
          onChange={this.handleChange} 
          type='text' 
          placeholder='Type Movie Here' 
          value={this.state.userInput}
          name='search' />
        <button onClick={this.handleClick}>Search!</button>
      </form>
    </div>
    );
  }
  
}

export default App;

