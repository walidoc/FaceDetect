import React, { Component } from 'react';
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';
import Clarifai from 'clarifai';

// instantiate clarifai with my API key
const app = new Clarifai.App({
    apiKey: 'a716d318ec1d4db9bcdc27b016434f08'
});

const particlesOptions = {
    particles: {
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 1,
            width: 1
          },
        number: {
            value: 50,
            density: {
              enable: true,
              value_area: 800
            }
        }
    }
}


class App extends Component {
    constructor(){
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin'
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({box});
    }

    onInputChange = (event) => {
         this.setState({
             input: event.target.value
         })
    }

    onButtonSubmit = () => {
        
        this.setState({
            imageUrl: this.state.input
        })

        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then( response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.log('err', err));
   }

    onRouteChange = (route) => {
        this.setState({route: route});
    }

    render() {
        const { route, box, imageUrl } = this.state;
        return (
            <div className="App">
                <Particles className='particles' 
                    params={particlesOptions}
                />
                
                {   route === 'home'
                    ?   <div>
                            <Navigation onSignout={() => this.onRouteChange('signin')}/>
                            <Logo />
                            <Rank />
                            <ImageLinkForm 
                                onInputChange={this.onInputChange} 
                                onButtonSubmit={this.onButtonSubmit} 
                            />
                            <FaceRecognition box={box} imageUrl={imageUrl} /> 
                        </div>
                    :   (   route === 'signin'
                            ?   <Signin onRouteChange={this.onRouteChange} /> 
                            :   <Register onRouteChange={this.onRouteChange} /> 
                        )
                     
                }
            </div>
        );
    }
}

export default App;
