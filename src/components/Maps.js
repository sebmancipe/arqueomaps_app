import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../others/config.js'
import LeftButtonsMap from './LeftButtonsMap'
import BottomButtonsMap from './BottomButtonsMap'


//const AnyReactComponent = ({ text }) => <div>{text}</div>;
//Biblio: https://stackoverflow.com/questions/41676254/react-js-pass-data-between-components-flow
//Biblio 2: https://stackoverflow.com/questions/43937887/dynamically-adding-markers-on-react-google-map

// TODO: Join markers 

const AnyReactComponent = ({ id, text_mark }) => <div key={id}>{text_mark}</div>

class MapView extends Component {
  constructor(props){
    super(props);
    this.state = {
      markers: [{lat:'', lng:'', text_mark: ""}],
      center: {
        lat:15.5,
        lng:45.5
      },
      zoom:4
    }
  }




  addMarker(latitude, longitude, text){
    let markers = [...this.state.markers]
    markers.push({lat:latitude,lng:  longitude,text_mark: text})
    this.setState({markers})
    this.setState({
      center:{
        lat:Number(latitude),
        lng:Number(longitude)}
    });
    let zoom = 6
    this.setState({zoom})
  }


  render() {
    return (
      <div style={{height:"100vh",width:"100%", position:'relative'}}>
        <LeftButtonsMap viewMarkers={this.addMarker.bind(this)}/>
        <GoogleMapReact
          bootstrapURLKeys={{ key:config.API_KEY}}
          center={this.state.center}
          zoom={this.state.zoom}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          disableDefaultUI={true}
          yesIWantToUseGoogleMapApiInternals
        >
          {this.state.markers.map((marker, i) =>{
              return(
                <AnyReactComponent
                  lat={marker.lat}
                  lng={marker.lng}
                  text_mark={marker.text_mark}
                  key={i}
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
