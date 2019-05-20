import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../others/config.js'
import LeftButtonsMap from './LeftButtonsMap'
import BottomButtonsMap from './BottomButtonsMap'
import {Form, Button, ButtonGroup, Popover, OverlayTrigger} from 'react-bootstrap'

const AnyReactComponent = ({ text }) => <div>{text}</div>;


const handleApiLoaded = (map, maps) => {
  return(
    <AnyReactComponent
      lat={59.955413}
      lng={30.337844}
      text="My Marker"
    />
  );
};



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
  };



  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>

        <LeftButtonsMap/>
        <GoogleMapReact
          bootstrapURLKeys={{ key:config.API_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
        </GoogleMapReact>
        {AnyReactComponent}
        <BottomButtonsMap/>
      </div>
    );
  }
}

export default MapView;
