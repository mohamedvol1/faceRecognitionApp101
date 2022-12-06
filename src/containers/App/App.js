import { Component } from 'react'
import Particles from 'react-particles-js';
import './App.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Logo from '../../components/Logo/Logo';
import LinkInputField from '../../components/LinkInputField/LinkInputField';
import Rank from '../../components/Rank/Rank';
import FaceRecognitionImage from '../../components/FaceRecognitionImage/FaceRecognitionImage';
import Register from '../../components/Register/Register';
import SignIn from '../../components/SignIn/SignIn';
// import Clarifai from 'clarifai';
import {
  Switch,
  Route,
} from "react-router-dom";

// const app = new Clarifai.App({
//  apiKey: '4028760184614db3be075e4f5057a2b6'
// });

const particlesOptions= {
  "particles": {
    "number": {
      "value": 130,
      "density": {
        "enable": true,
        "value_area": 900
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    }
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      inputField: '',
      faceBox: {},
      user: {
        name: '',
        email: '',
        password: '',
        id: '',
        enteries: 0,
        joined: ''
       }
    }

  }

  clearStateOnsignOut = () => {
    this.setState({
      inputField: '',
      faceBox: {},
      user: {
        name: '',
        email: '',
        password: '',
        id: '',
        enteries: 0,
        joined: ''
      }
    })
  }

  loadUser = (data) => {
    this.setState({
      user: {
        name: data.name,
        email: data.email,
        password: data.password,
        id: data.id,
        enteries: data.entries,
        joined: data.joined
      }
    })
  }

  OnButtonSubmit = () => {
    fetch('https://face-recogintion-server.onrender.com/imageurl/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
              "inputField": this.state.inputField
            }) 
    })
    .then(response => response.json())
    .then(response => {
      this.setfaceBox(this.caculateFaceBox(response))
      if(response) {
        fetch('https://face-recogintion-server.onrender.com/image/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                "id": this.state.user.id
              }) 
        })
        .then(response => response.json())
        .then(data => {
          this.setState({
           user: {
             ...this.state.user,
             enteries: data
           }
          }) 
        })
      }   
    })
  }

  onInputChange = (event) => {
    this.setState({
      inputField: event.target.value,
      // this line keeps the detection box hidden till the suer hit detect button
      faceBox: {}
    })  
  }

  caculateFaceBox = (data) => {
    // extract the detection box dimension from the response 
    let clarifaiResponse = data.outputs[0].data.regions[0].region_info.bounding_box;
    let divWidth = document.getElementById('imgdivid').clientWidth;
    let divHeight = document.getElementById('imgdivid').clientHeight;
    let imgWidth = document.getElementById('faceimageid').clientWidth;
    let imgHeight = document.getElementById('faceimageid').clientHeight;
    // calcultating the difference between image end and div end
    let widthDiff = (divWidth - imgWidth) / 2;
    let heightDiff = (divHeight - imgHeight) / 2;
    // returning the wanted dimension with consdering the difference with
    // the div element the pass the values to face componenet to draw 
    // a box around the detected face
    return ({
          top: (clarifaiResponse.top_row * imgHeight) + heightDiff,
          bottom: (imgHeight - (clarifaiResponse.bottom_row * imgHeight)) + heightDiff,
          left: (clarifaiResponse.left_col * imgWidth)  + widthDiff,
          right: imgWidth - (clarifaiResponse.right_col * imgWidth) + widthDiff
        })
  }

  // setting the faceBox state to the output caculateFaceBox function
  setfaceBox = (object) => {
    this.setState({faceBox: object});
  }

  render() {
    return (
      <div className="App">
        <Particles params={particlesOptions} className='particles' />
        <Switch>
          <Route exact path='/'>
            <NavigationBar clearStateOnsignOut={this.clearStateOnsignOut} />
            <Logo />
            <Rank name={this.state.user.name} enteries={this.state.user.enteries} />
            <LinkInputField onInputChange={this.onInputChange} OnButtonSubmit={this.OnButtonSubmit} />
            <FaceRecognitionImage imgUrl={this.state.inputField} box={this.state.faceBox} />
          </Route>
          <Route exact path='/SignIn'>
            <SignIn loadUser={this.loadUser} />
          </Route>
          <Route exact path='/Register'>
            <Register loadUser={this.loadUser} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
