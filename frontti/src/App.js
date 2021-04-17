import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Greeting from './Components/greeting/Greeting'
import Login from './Components/login/login';
import ImageSearchForm from './Components/ImageSearchForm/ImageSearchForm'
import FaceDetect from './Components/FaceDetect/FaceDetect';
import axios from 'axios';
import Register from './Components/register/register';

let apikey = process.env.REACT_APP_APIKEY
console.log(apikey)

const app = new Clarifai.App({
  apiKey: apikey
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isLoggedIn: false,
      input: "",
      imageUrl: "",
      box: {},
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onChange = (event) => {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    } else if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    }
  }

  onUserLogin = (event) => {
    event.preventDefault()
    const userCredentials = {
      username: this.state.username,
      password: this.state.password
    }
    console.log('onUserLogin')
    axios.post('http://localhost:8000/login', userCredentials)
    .then(response => {
      console.log(response)
      if (response.status === 200) {
        this.setState({isLoggedIn: true})
      }
      else if (response.status === 400) {
        window.alert('Username or password incorrect')
      }
    })
    .catch(error =>{
        console.log(error)
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ 
      imageUrl: this.state.input
    });
    axios.post('http://localhost:8000')
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          app.models
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then((response) =>
              this.displayFaceBox(this.calculateFaceLocation(response))
            )
            .catch(err => {
              console.log(err)
            })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="App">
        <Greeting onChange={this.onChange} onSubmit={this.onSubmit} onUserLogin={this.onUserLogin} box={this.state.box} isLoggedIn={this.state.isLoggedIn} />
      </div>
    )
  }
}

export default App;
