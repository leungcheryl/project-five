import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import DisplayMovie from './DisplayMovie.js';
import movieimg from './assets/img-1.jpg';
import maindog from './assets/main-dog.png'
import movieicon from './assets/movie-icon.png'


const formatDogDeath = (value) => {
  if (value === null) return 'Watch At Your Own Risk';
  if (value === false) return 'A Dog Doesn\'t Die';
  if (value === true) return 'A Dog Dies';
};


class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
      allMovies: []
    }
  }
  
  _isMounted = false

  componentDidMount() {
    const movieInput = this.state.userInput;
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
        }).then(response => {
          response = response.data.items;
          const movieNamesArray = [];
          response.forEach(movie => {
            movieNamesArray.push({
              name: movie.name,
              id: movie.id
            })
          })

        this.setState({ 
          allMovies: movieNamesArray 
        })

        this.getDogStatus()
        this.getPoster()
      })
  }

  getDogStatus() {
    const allMovies = this.state.allMovies;
    Promise.all(allMovies.map(async (value, i) => {
        try {
          const url = `https://cors-anywhere.herokuapp.com/https://www.doesthedogdie.com/media/${value.id}`
          const result = await axios.get(`${url}`, {
            method: 'GET',
            dataType: 'json',
            headers: {
              'X-API-KEY': 'e39ba046c39413e2c04848ae44e80a73',
              Accept: 'application/json'
            }
          })
          
          const newResult = Object.values(result.data.topicItemStats[0]);
          console.log(newResult)
          const yes = newResult[0];
          const no = newResult[1]
          let dogDies;

          if (yes > no) {
            dogDies = true;
          } else if (yes < no) {
            dogDies = false;
          } else {
            dogDies = null;
          }
           return {
             ...this.state.allMovies[i],
             dogDies: dogDies
           }

        } catch (err) {
          console.log(err.message)
        }
      })).then(result => {
        this.setState ({
          allMovies : result
        })
      });
  }

  getPoster() {
    
    const selectedMovies = this.state.allMovies;
    console.log(selectedMovies)
    Promise.all(selectedMovies.map(async (value, i) => {
      try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=8d57b009677e25546dc89ff6368e4fbe&`
       
        const poster = await axios.get(`${url}`, {
        method: 'GET',
        dataType: 'jsonp',
        params: {
          query:`${value.name}`
        }
        })
        console.log(poster)
        const resultPoster = poster.data.results
        const moviePoster = resultPoster.map(post => {
          return post.poster_path
        })
       
          let posterUrl;

          if (moviePoster[0] === undefined) {
            posterUrl = `https://antmovies.tv/uploads/no-poster.png`
          } else {
            posterUrl = `http://image.tmdb.org/t/p/w500${moviePoster[0]}`
          }

          return {
            ...this.state.allMovies[i],
            poster: posterUrl
          }

      } catch (err) {
        console.log(err)
      }
    })).then(result => {
      this.setState ({
        allMovies : result
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
    this.componentDidMount()
  }

  handleReset = (event) => {
    event.preventDefault();
    this.setState ({
      allMovies : ['']
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return (
    <div className="wrapper">

      <div className="main">
        <div className="header">
          <h1>Safe for Dogs:</h1>
           <h2>Movie Edition</h2>
          <img src={movieicon} alt="Picture of Popcorn, Movie Items"/>
        </div>
        <div className="background-dog">
          <img src={maindog} alt="Dog wearing 3D glasses and holding popcorn"/>
        </div>
        <div className='scroll-note'>
          <p>Scroll Down To Search a Movie <span>&#9660;</span>
          </p>
        </div>

      </div>
      <div className="form">
        
        <form>
         

          <input 
            onChange={this.handleChange} 
            type='text' 
            placeholder='Type Movie Here' 
            value={this.state.userInput}
            name='search' />
          <button onClick={this.handleClick}>Search!</button>
          <button type="reset" value="Reset" onClick={this.handleReset}>Reset</button>
        </form>
      </div>

      <div className="display">
        { this.state.allMovies.map(movie => {
          return (
            <div>
              <DisplayMovie 
                img={movie.poster}
                name={movie.name}  
                dogStat= {formatDogDeath(movie.dogDies)}
              />
            </div>
          )
        })}
      </div>
    </div>
    );
  }
  
}

export default App;

