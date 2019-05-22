import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../others/config.js'
import LeftButtonsMap from './LeftButtonsMap'
import BottomButtonsMap from './BottomButtonsMap'


//const AnyReactComponent = ({ text }) => <div>{text}</div>;
//Biblio: https://stackoverflow.com/questions/41676254/react-js-pass-data-between-components-flow
//Biblio 2: https://stackoverflow.com/questions/43937887/dynamically-adding-markers-on-react-google-map

const AnyReactComponent = ({  text_mark }) => <div>{text_mark}</div>

class MapView extends Component {
  constructor(props){
    super(props);
      this.state = {
        markers: [{lat:58.9, lng: 31.3, text_mark: 'Mark 1'},
        {lat:60.1,lng: 78.3, text_mark: 'Mark 2'}],
      }
  }

  static defaultProps = {
    center: {
      lat: 58.95,
      lng: 30.33
    },
    zoom: 11
  }

  render() {
    return (
      <div style={{height:'100vh',width:'100%', position:'relative'}}>
        <LeftButtonsMap/>
        <GoogleMapReact
          bootstrapURLKeys={{ key:config.API_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          disableDefaultUI={true}
          yesIWantToUseGoogleMapApiInternals
        >
          {console.log(this.state.markers)}
          {this.state.markers.map((marker, i) =>{
              return(
                <AnyReactComponent
                  lat={marker.lat}
                  lng={marker.lng}
                  text_mark={marker.text_mark}
                />
              )
            })}
        </GoogleMapReact>
        <BottomButtonsMap/>
      </div>
    )
  }
}

export default MapView
// https://istarkov.github.io/google-map-thousands-markers/
