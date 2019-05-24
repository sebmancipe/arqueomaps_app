import React, { Component } from 'react';
import config from '../others/config.js'
import LeftButtonsMap from './LeftButtonsMap'
import BottomButtonsMap from './BottomButtonsMap'
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import '../styles/map.css'
import normalize from 'react-style-reset';
import { injectGlobal } from 'emotion';



//const AnyReactComponent = ({ text }) => <div>{text}</div>;
//Biblio: https://stackoverflow.com/questions/41676254/react-js-pass-data-between-components-flow
//Biblio 2: https://stackoverflow.com/questions/43937887/dynamically-adding-markers-on-react-google-map

// TODO: Join markers 

const mapStyles = {
  width: '100vh',
  height: '100%'
};


const AnyReactComponent = ({ id, text_mark }) => <div key={id}>{text_mark}</div>



class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{ lat: '', lng: '', text_mark: "" }],
      markers2Poly: [{lat:17.5, lng:16.2}, {lat:19.5, lng:17.2}],
      center: {
        lat: 15.5,
        lng: 45.5
      },
      zoom: 4,
      firstTimeMarkers: true,
      drawPolylines: false,
    }
    this.generatePolyline = this.generatePolyline.bind(this)
  }

  generatePolyline(){
    this.setState({drawPolylines: (this.state.drawPolylines)?false:true})
  }

  addMarker(latitude, longitude, text) {
    let markers
    let markers2Poly
    if(this.state.firstTimeMarkers) {
      markers = [this.state.markers]
      markers2Poly = [this.state.markers2Poly]
      markers = [{ lat: latitude, lng: longitude, text_mark: text }]
      markers2Poly = [{lat:Number(latitude), lng:Number(longitude)}]
      this.setState({firstTimeMarkers:false})
    }
    else {
      markers = [...this.state.markers]
      markers2Poly = [...this.state.markers2Poly]
      markers.push({ lat: latitude, lng: longitude, text_mark: text })
      markers2Poly.push({lat:Number(latitude), lng:Number(longitude)})
    }
    this.setState({markers})
    this.setState({markers2Poly})
    this.setState({
      center: {
        lat: Number(latitude),
        lng: Number(longitude)
      }
    });
    let zoom = 6
    this.setState({ zoom })
  }

  render() {
    const LeftButtonsMapProps = {
      addMarker: this.addMarker.bind(this),
      generatePolyline: this.generatePolyline
    }
    console.log(this.state.markers)
    return (
      <div>
        <LeftButtonsMap LeftButtonsMapProps={LeftButtonsMapProps} />
        <Map
          google={this.props.google}
          center={this.state.center}
          zoom={this.state.zoom}
          initialCenter={{
            lat: -1.2884,
            lng: 36.8233
          }}
        >
        {/*<BottomButtonsMap/>*/}
        {this.state.markers.map((marker, i) => {
          return (
            <Marker
              position={
                { lat: marker.lat, lng: marker.lng }
              }

              label={marker.text_mark}
              title={marker.text_mark}
              key={i}
            />
          )
        })}
        
        <Polyline path={this.state.markers2Poly}
                                                 strokeColor="#0000FF"/>    
        
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (config.API_KEY)
})(MapView)
// https://istarkov.github.io/google-map-thousands-markers/
