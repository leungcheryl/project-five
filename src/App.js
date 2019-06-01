import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      userInput: ''
    }
  }

  getMovie() {
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
          console.log(response)
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
    this.getMovie()
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

