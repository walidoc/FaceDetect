import React, { Component } from 'react';
import Navigation from "../components/Navigation/Navigation";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import Rank from "../components/Rank/Rank";
import Signin from "../components/Signin/Signin";
import Register from "../components/Register/Register";
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
            value: 150,
            density: {
              enable: true,
              value_area: 800
            }
        }
    }
}

const initialState = {
    input: '',
    imageUrl: '',
    boxes: [],
    route: 'signin',
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component {
    constructor(){
        super();
        this.state = initialState;
    }

    loadUser = (userData) => {
        this.setState({
            user: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                entries: userData.entries,
                joined: userData.joined
            }
        })
    }

    calculateFacesLocations = (data) => {
        const image = document.getElementById('inputImage');
        const clarifaiFaces = data.outputs[0].data.regions;
        const boxes = [];
        for(let i = 0; i < clarifaiFaces.length; i++){
            let clarifaiFace = clarifaiFaces[i].region_info.bounding_box;
            boxes.push(this.calculateFaceLocation(clarifaiFace, image));
        }
        return boxes;
    }
    calculateFaceLocation = (clarifaiFace, image) => {
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (boxes) => {
        this.setState({boxes});
    }

    onInputChange = (event) => {
         this.setState({
             input: event.target.value
         })
    }

    onPictureSubmit = () => {
        this.setState({
            imageUrl: this.state.input
        })
        fetch('http://localhost:8080/api/image/clarifaiCall', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then(res => res.json())
        .then( response => {
            if(response){
                fetch('http://localhost:8080/api/image/increment', {
                    method: 'post',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                .then(res => res.json())
                .then(count => {
                    this.setState(Object.assign(this.state.user, {entries: count}))
                })
                .catch(console.log)
            }
            
            this.displayFaceBox(this.calculateFacesLocations(response))
        })
        .catch(err => console.log('err', err));
   }

    onRouteChange = (route) => {
        if(route === 'signin') {
            this.setState(initialState);
        }
        this.setState({route: route});
    }

    render() {
        const { route, boxes, imageUrl, user } = this.state;
        return (
            <div className="App">
                <Particles className='particles' 
                    params={particlesOptions}
                />
                
                {   route === 'home'
                    ?   <div>
                            <Navigation onSignout={() => this.onRouteChange('signin')}/>
                            
                            <Rank name={user.name} entries={user.entries} />
                            <ImageLinkForm 
                                onInputChange={this.onInputChange} 
                                onPictureSubmit={this.onPictureSubmit} 
                            />
                            <FaceRecognition boxes={boxes} imageUrl={imageUrl} /> 
                        </div>
                    :   (   route === 'signin'
                            ?   <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
                            :   <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
                        )
                     
                }
            </div>
        );
    }
}

export default App;
