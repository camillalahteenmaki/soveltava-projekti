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

const app = new Clarifai.App({
  apiKey: apikey
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      loginUsername: '',
      loginPassword: '',
      registerUsername: '',
      registerPassword: '',
      isLoggedIn: false,
      userWantsToRegister: false,
      input: "",
      imageUrl: "",
      result: '',
      box: {},
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.data.outputs[0].data.regions[0].region_info.bounding_box;
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
    this.setState({ imageUrl: event.target.value });
  };

  onLoginChange = (event) => {
    if (event.target.name === 'loginUsername') {
      this.setState({ loginUsername: event.target.value })
    } else if (event.target.name === 'loginPassword') {
      this.setState({ loginPassword: event.target.value })
    }
  }

  onRegisterChange = (event) => {
    if (event.target.name === 'registerUsername') {
      this.setState({ registerUsername: event.target.value})
    } else if (event.target.name === 'registerPassword') {
      this.setState({ registerPassword: event.target.value })
    }
  }

  onUserRegister = (event) => {
    event.preventDefault()
    const userCredentials = {
      username: this.state.registerUsername,
      password: this.state.registerPassword
    }
    axios.post('http://localhost:8000/register', userCredentials)
    .then(response => {
      console.log(response)
      if (response.status === 201) {
        this.setState({
          isLoggedIn: true,
          loginUsername: response.data.username,
          loginPassword: response.data.password
        })
      }
    })
    .catch(error => {
        console.log('catch')
        console.log(error)
        console.log(error.response)
        if (error.response.status === 400 || error.response.status === 500) {
          window.alert(error.response.data)
        }
    })
  }

  registerOrLogin = (event) => {
    event.preventDefault()
    this.setState({
      userWantsToRegister: !this.state.userWantsToRegister
    })
  }

  onUserLogin  = (event) => {
    event.preventDefault()
    const userCredentials = {
      username: this.state.loginUsername,
      password: this.state.loginPassword
    }
    axios.post('http://localhost:8000/login', userCredentials)
    .then(response => {
      if (response.status === 200) {
        this.setState({isLoggedIn: true})
      }
    })
    .catch(error => {
        console.log('catch')
        console.log(error.response)
        if (error.response.status === 400) {
          window.alert(error.response.data)
        }
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    const imageUrl = {
      input: this.state.imageUrl
    }
    axios.post('http://localhost:8000/imageurl', imageUrl)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          this.displayFaceBox(this.calculateFaceLocation(response))
          console.log(this.state.box)
          console.log(this.state.imageUrl)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="App">
        <Greeting onLoginChange={this.onLoginChange} onSubmit={this.onSubmit} onUserLogin={this.onUserLogin} onRegisterChange={this.onRegisterChange} onUserRegister={this.onUserRegister} box={this.state.box} isLoggedIn={this.state.isLoggedIn} registerOrLogin={this.registerOrLogin} userWantsToRegister={this.state.userWantsToRegister} onInputChange={this.onInputChange} result={this.state.result} imageUrl={this.state.imageUrl} />
      </div>
    )
  }
}

export default App;
