import React, { Component } from 'react'
import config from '../others/config.js'
import LeftButtonsMap from './LeftButtonsMap'
import BottomButtonsMap from './BottomButtonsMap'
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react'
import '../styles/map.css'



//const AnyReactComponent = ({ text }) => <div>{text}</div>;
//Biblio: https://stackoverflow.com/questions/41676254/react-js-pass-data-between-components-flow
//Biblio 2: https://stackoverflow.com/questions/43937887/dynamically-adding-markers-on-react-google-map

// TODO: Join markers 

const mapStyles = {
  width: '100vh',
  height: '100%'
};


class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{ lat: '', lng: '', text_mark: "" }],
      markers2PolyStack: [{lat:'', lng:'',dist:''}],
      markers2PolyManually: [{lat:'', lng:'', dist:''}],
      center: {
        lat: 15.5,
        lng: 45.5
      },
      zoom: 4,
      firstTimeMarkers: true,
      drawPolylinesStack: false,
      drawPolylinesManually: false
    }
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.generatePolylineManually = this.generatePolylineManually.bind(this)
  }

  generatePolylineStack(){
    this.setState({drawPolylinesStack: (this.state.drawPolylinesStack)?false:true})
  }

  generatePolylineManually(){
    this.setState({drawPolylinesManually: (this.state.drawPolylinesManually)?false:true})
  }

  onMarkerClick(props, marker, e){
    e.preventDefault()
    if(this.state.drawPolylinesManually){
      var p2 = {
        lat: props.position.lat,
        lng: props.position.lng
      }
      let markers2PolyManually
      if(this.state.markers2PolyManually[0].lat!==''){
        let distance
        markers2PolyManually=[...this.state.markers2PolyManually]
        distance=this.getDistance(markers2PolyManually[markers2PolyManually.length-1],p2)
        markers2PolyManually.push({lat:Number(p2.lat), lng:Number(p2.lng),dist:Number(distance)})
        console.log(distance)
      }
      else 
        markers2PolyManually=[{lat:Number(p2.lat), lng:Number(p2.lng)}]
      this.setState({markers2PolyManually})
    }
  }


  addMarker(latitude, longitude, text) {
    let markers
    let markers2PolyStack
    if(this.state.firstTimeMarkers) {
      markers = [this.state.markers]
      markers2PolyStack = [this.state.markers2PolyStack]
      markers = [{ lat: latitude, lng: longitude, text_mark: text }]
      markers2PolyStack = [{lat:Number(latitude), lng:Number(longitude)}]
      this.setState({firstTimeMarkers:false})
    }
    else {
      markers = [...this.state.markers]
      markers2PolyStack = [...this.state.markers2PolyStack]
      markers.push({ lat: latitude, lng: longitude, text_mark: text })
      markers2PolyStack.push({lat:Number(latitude), lng:Number(longitude)})
    }
    this.setState({markers})
    this.setState({markers2PolyStack})
    this.setState({
      center: {
        lat: Number(latitude),
        lng: Number(longitude)
      }
    });
    let zoom = 18
    this.setState({ zoom })
  }

  toRad(x){
    return x * Math.PI / 180;
  }
  
  getDistance(p1,p2){
    console.log(p2)
    var R = 6378137; // Earth’s radius in meter
    var dLat = this.toRad(p2.lat - p1.lat);
    var dLong = this.toRad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(p1.lat)) * Math.cos(this.toRad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  }
  

  render() {
    const LeftButtonsMapProps = {
      addMarker: this.addMarker.bind(this)
    }
    const BottomButtonsMapProps = {
      generatePolylineStack: this.generatePolylineStack.bind(this),
      generatePolylineManually: this.generatePolylineManually.bind(this)
    }

    return (
      <div>
        <LeftButtonsMap LeftButtonsMapProps={LeftButtonsMapProps} />
        <Map
          google={this.props.google}
          center={this.state.center}
          zoom={this.state.zoom}
          initialCenter={{
            lat: 4.624335,
            lng: -74.063644
          }}
          mapTypeControl={false}
          //mapTypeId={this.props.google.maps.mapTypeId.TERRAIN}
        >
        <BottomButtonsMap BottomButtonsMapProps={BottomButtonsMapProps}/>
        {this.state.markers.map((marker, i) => {
          if(marker.lat !== '') 
          return (
            <Marker
              position={
                { lat: marker.lat, lng: marker.lng }
              }
              label={marker.text_mark}
              title={marker.text_mark}
              key={i}
              onClick={this.onMarkerClick}
            />
          )
        })}
        {this.state.drawPolylinesStack && this.state.markers2PolyStack[0].lat !== ''
        && <Polyline path={this.state.markers2PolyStack} strokeColor="#0000FF"/>}
        {this.state.drawPolylinesManually && this.state.markers2PolyManually[0].lat !== '' 
        && <Polyline path={this.state.markers2PolyManually} strokeColor="#00FF00"/>}        
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (config.API_KEY)
})(MapView)
// https://istarkov.github.io/google-map-thousands-markers/
