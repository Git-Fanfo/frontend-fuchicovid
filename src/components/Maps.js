import React, { Component } from 'react';
import { GoogleComponent } from 'react-google-location' 
const API_KEY = "AIzaSyDGwf3wXD5z0XqaolwPbRVRKGIkDnK5ql4"

class Maps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      place: null,
    };
  }
  render() {
 console.warn("test", this.state.place)

    return (
      <div className="Maps">
        <header className="Maps-header">
          <h1 className="Maps-title">Welcome to React</h1>
        </header>
        <div className="wrMapser" >
        <GoogleComponent apiKey={API_KEY} language={'en'} country={'country:in'} onChange={(e) => { this.setState({ place: e }) }} />
      </div>
      </div>
    );
  }
}
export default Maps;