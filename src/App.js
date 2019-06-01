import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
     
    }
  }

  componentDidMount() {

    axios.get('https://cors-anywhere.herokuapp.com/https://www.doesthedogdie.com/search?', {
      method: 'GET',
      dataType: 'json',
      headers: {
        "X-API-KEY": "e39ba046c39413e2c04848ae44e80a73",
        "Accept": "application/json"
      },
      params: {
        q: `marley`
      }
    }).then(response => {
      console.log(response)
    })
  }s

  render() {
    return (
    <div className="App">
      <input type='text' placeholder='Enter your search term' name='search' />
    </div>
    );
  }
  
}

export default App;

