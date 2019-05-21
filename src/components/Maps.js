import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../others/config.js'
import LeftButtonsMap from './LeftButtonsMap'
import BottomButtonsMap from './BottomButtonsMap'


const AnyReactComponent = ({ text }) => <div>{text}</div>;


class MapView extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11,
    greatPlaces: [
     {id: 'A', lat: 59.955413, lng: 30.337844},
     {id: 'B', lat: 59.724, lng: 30.080}
   ]
  }

  handleApiLoaded (map, maps) {
    let marker = new maps.Marker({
      position: {lat:59.95, lng: 30.33},
      map,
      title: 'Hello World!'
    });
  }



  render() {
    return (
      <div style={{height:'100vh',width:'100%'}}>
        <LeftButtonsMap/>
        <GoogleMapReact
          bootstrapURLKeys={{ key:config.API_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
        </GoogleMapReact>

        <BottomButtonsMap/>
      </div>
    )
  }
}

export default MapView
// https://istarkov.github.io/google-map-thousands-markers/
