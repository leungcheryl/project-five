import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const formatDogDeath = (value) => {
  if (value === null) return 'Take a risk';
  if (!value) return 'Doesn\'t die';
  return 'Does die';
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
      movieId: [],
      movies: [],
      stats: [],
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
          }
        )
        .then(response => {
          response = response.data.items
          console.log(response)
          const ids = response.map(movies => {
            return movies.id
          })
          
          this.setState ({
            movieId: ids
          })

          const movieName = response.map(names => {
            return names.name
          })
          const movieNamesArray = [];
          response.forEach(movie => {
            movieNamesArray.push({
              name: movie.name,
              id: movie.id
            })
          })
          console.log(movieNamesArray)

          this.setState({ allMovies: movieNamesArray })

          this.setState ({
            movies: movieName
          })
          this.getStats()
          this.getPoster()
        })
  }
//Loop over this.state.allMovies. use movie.id for dog dying search parameter. 
// use movie.name for poster


  getStats() {
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
            dogDies = false
          } else {
            dogDies = null
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

    Promise.all(selectedMovies.map(async (value, i) => {
      try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=8d57b009677e25546dc89ff6368e4fbe&query=${value.name}`
        const poster = await axios.get(`${url}`, {
        method: 'GET',
        dataType: 'jsonp'
        })
        const resultPoster = poster.data.results
        const moviePoster = resultPoster.map(post => {
          return post.poster_path
        })
        console.log(moviePoster[0])

        const posterUrl = `http://image.tmdb.org/t/p/w500${moviePoster[0]}`
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


  componentWillUnmount() {
    this._isMounted = false
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

      <div className="display">
        { this.state.allMovies.map(movie => {
          return (
            <div>
              <img src={movie.poster} />
              {movie.name} : {formatDogDeath(movie.dogDies)}
              
            </div>
          )
        })}
      </div>
    </div>
    );
  }
  
}

export default App;

