import React, { Component } from "react";
import Clarifai from "clarifai";
import './App.css';
import ImageSearchForm from ".components/ImageSearchForm/ImageSearchForm";
import FaceDetect from "./components/FaceDetect/FaceDetect";

const app = new Clarifai.App({
  apiKey: "",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
    };
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(response);
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box
        );
      },
      function (err) {

      }
    );
  };
  render() {
    return  (
      <div className="App">
        <ImageSearchForm 
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
          />
        <FaceDetect imageUrl ={this.state.imageUrl} /> 
      </div>
    );
  }
}

export default App;
