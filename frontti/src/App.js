import React, { Component } from 'react';
import './App.css';
import Greeting from './Components/greeting/Greeting'
import axios from 'axios';

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
      user: {}
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
          user: response.data
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
        this.setState({user: response.data})
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
          this.incrementImage();
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  incrementImage = () => {
    console.log(this.state.user)
    const body = {
      id: this.state.user.id
    }
    axios.put('http://localhost:8000/image', body)
      .then(response => {
        if(response.status === 200){
          const tmpUser = this.state.user;
          console.log("USER: ", this.state.user)
          console.log("TMPUSER: ", tmpUser);
          tmpUser.imageCount++;
          this.setState({user: tmpUser});
        }
      })
      .catch(err => {console.log(err)})
  }

  render() {
    const {box, isLoggedIn, userWantsToRegister, result, imageUrl, user} = this.state;
    return (
      <div className="App">
        <Greeting onLoginChange={this.onLoginChange} 
        onSubmit={this.onSubmit} 
        onUserLogin={this.onUserLogin} 
        onRegisterChange={this.onRegisterChange} 
        onUserRegister={this.onUserRegister} 
        box={box} 
        isLoggedIn={isLoggedIn} 
        registerOrLogin={this.registerOrLogin} 
        userWantsToRegister={userWantsToRegister} 
        onInputChange={this.onInputChange} 
        result={result} 
        imageUrl={imageUrl}
        user={user} />
      </div>
    )
  }
}

export default App;
