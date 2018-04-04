import React, { Component } from 'react';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';

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
            input : ''
        }
    }

    onInputChange = (event) => {
         console.log(event.target.value);
         this.setState({
             input: event.target.value
         })
    }

    onButtonSubmit = () => {
        console.log('clicked');
   }

    render() {
        return (
            <div className="App">
                <Particles className='particles' 
                    params={particlesOptions}
                />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onButtonSubmit={this.onButtonSubmit} 
                />
                {/* <FaceRecognition /> */}
            </div>
        );
    }
}

export default App;
