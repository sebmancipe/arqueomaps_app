/* 
Author: Sebastian Mancipe
Date: 
Last update: July 12 - 2019
Description: 
This component contains the fast map, markers and polylines loaded on it. 
Executes methods to get distance, join markers manually, by stack (arrive order) or to a specific point
*/

import React, { Component } from 'react'
import config from '../others/config.js'
import LeftButtonsMap from './LeftButtonsMap'
import BottomButtonsMap from './BottomButtonsMap'
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react'
import '../styles/map.css'

// 1
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: config.HOST
})

// 3
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

/*const mapStyles = {
  width: '100vh',
  height: '100%'
};*/


class MapView extends Component {
  constructor(props) {
    super(props);
    //Load basic markers for testing purpose
    this.state = {
      markers:[{id:'',lat:'',lng:'',text_mark:''}],
      /*markers: [{ id:'1',lat: '5.6494393', lng: '-73.5163933', text_mark: "Desierto El Infiernito" },
                { id:'2',lat: '4.977777', lng: '-73.775097', text_mark: "Laguna de Guatavita" },
                { id:'3',lat: '5.709184', lng: '-72.923647', text_mark: "Templo del Sol" },
                { id:'4',lat: '4.598083', lng: '-74.076043', text_mark: "Plaza Simón Bolivar" }],*/
      markers2PolyStack: [{id:'',lat:'', lng:'',dist:''}],
      markers2PolyManually: [{id:'',lat:'', lng:'', dist:''}],
      markers2PolyMany2One: [{id:'',lat:'', lng:'', dist:''}],
      center: {
        lat: 15.5,
        lng: 45.5
      },
      zoom: 4,
      //Control variables to show or no the polylines
      drawPolylinesStack: false,
      drawPolylinesManually: false,
      drawPolylinesMany2One: false,
    }
    this.onMarkerClick = this.onMarkerClick.bind(this)
  }

  generatePolylineStack(){
    this.setState({drawPolylinesStack: (this.state.drawPolylinesStack)?false:true})
    //Set the other options in false
    if(this.state.drawPolylinesStack) {
      this.setState({drawPolylinesManually:false})
      this.setState({drawPolylinesMany2One:false})
    }
  }

  //Method that reset, show or no the polyline of manually input
  generatePolylineManually(isReset){
    this.setState({drawPolylinesManually: (this.state.drawPolylinesManually)?false:true})
    if(isReset){
      let markers2PolyManually = [{id:'',lat:'',lng:'',dist:''}]
      this.setState({markers2PolyManually})
    }
    //Set the other options in false
    if(this.state.drawPolylinesManually) {
      this.setState({drawPolylinesStack:false})
      this.setState({drawPolylinesMany2One:false})
    }
  }

  //Method that reset, show or no the polyline of many to one input
  generatePolylineMany2One(isReset){
    this.setState({drawPolylinesMany2One: (this.state.drawPolylinesMany2One)?false:true})
    if(isReset){
      let markers2PolyMany2One = [{id:'',lat:'',lng:'',dist:''}]
      this.setState({markers2PolyMany2One})
    } 
    //Set the other options in false
    if(this.state.drawPolylinesMany2One) {
      this.setState({drawPolylinesStack:false})
      this.setState({drawPolylinesManually:false})
    }
  }

  //Method that join two markers with a polyline
  markersJoinManually(markerSelected){
    var p2 = {
      id: markerSelected.id,
      lat: markerSelected.lat,
      lng: markerSelected.lng
    }
    let markers2PolyManually
    if(this.state.markers2PolyManually[0].lat!==''){
      let distance
      markers2PolyManually=[...this.state.markers2PolyManually]
      //Get distance based in latitude and longitude of the markers
      distance=this.getDistance(markers2PolyManually[markers2PolyManually.length-1],p2)
      markers2PolyManually.push({id:Number(p2.id),lat:Number(p2.lat), lng:Number(p2.lng),dist:Number(distance)})
    }
    else 
      markers2PolyManually=[{id:Number(p2.id),lat:Number(p2.lat), lng:Number(p2.lng)}]
    this.setState({markers2PolyManually})
  }

  //Method that join all markers to one (the selected by the user)
  markersJoinMany2One(markerSelected){
    let markers2PolyMany2One=[], markers = this.state.markers
    markers.forEach(function(marker){
      markers2PolyMany2One.push({id:Number(marker.id),lat:Number(marker.lat),lng:Number(marker.lng)})
      markers2PolyMany2One.push({id:Number(markerSelected.id),lat:Number(markerSelected.lat),lng:Number(markerSelected.lng)})
    });
    this.setState({markers2PolyMany2One})
  }

  
  onMarkerClick(props, marker, e){
    const markersTemp = this.state.markers
    const placeSelected = markersTemp.find(place => place.lat=== props.position.lat && place.lng === props.position.lng);
    if(this.state.drawPolylinesManually){
      this.markersJoinManually(placeSelected)
    }else if(this.state.drawPolylinesMany2One)
      this.markersJoinMany2One(placeSelected)
  }


  addMarker(id,latitude, longitude, text) {
    let markers
    let markers2PolyStack
    if(this.state.markers[0].lat === '') {
      markers = [this.state.markers]
      markers2PolyStack = [this.state.markers2PolyStack]
      markers = [{ id:id,lat: latitude, lng: longitude, text_mark: text }]
      markers2PolyStack = [{id:Number(id),lat:Number(latitude), lng:Number(longitude)}]
      console.log(markers)
    }
    else {
      markers = [...this.state.markers]
      markers2PolyStack = [...this.state.markers2PolyStack]
      markers.push({ id:id,lat: latitude, lng: longitude, text_mark: text })
      markers2PolyStack.push({id:Number(id),lat:Number(latitude), lng:Number(longitude)})
    }
    this.setState({markers})
    this.setState({markers2PolyStack})
    this.setState({
      center: {
        lat: Number(latitude),
        lng: Number(longitude)
      }
    });
    let zoom = 14
    this.setState({ zoom })
  }

  toRad(x){
    return x * Math.PI / 180;
  }
  
  getDistance(p1,p2){
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
    let edgesFigure
    if(this.state.drawPolylinesMany2One && this.state.markers2PolyMany2One[0].lat !== '') edgesFigure = this.state.markers2PolyMany2One
    else if(this.state.drawPolylinesManually && this.state.markers2PolyManually[0].lat !== '') edgesFigure = this.state.markers2PolyManually
    else edgesFigure = this.state.markers2PolyStack
    const LeftButtonsMapProps = {
      addMarker: this.addMarker.bind(this),
      edgesFigure: edgesFigure
    }
    const BottomButtonsMapProps = {
      generatePolylineStack: this.generatePolylineStack.bind(this),
      generatePolylineManually: this.generatePolylineManually.bind(this),
      generatePolylineMany2One: this.generatePolylineMany2One.bind(this)
    }

    return (
      <ApolloProvider client={client}>
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
          else return null
        })}
        {this.state.drawPolylinesStack && this.state.markers2PolyStack[0].lat !== ''
        && <Polyline path={this.state.markers2PolyStack} strokeColor="#0000FF"/>}
        {this.state.drawPolylinesManually && this.state.markers2PolyManually[0].lat !== '' 
        && <Polyline path={this.state.markers2PolyManually} strokeColor="#00FF00"/>}     
        {this.state.drawPolylinesMany2One && this.state.markers2PolyMany2One[0].lat !== '' 
        && <Polyline path={this.state.markers2PolyMany2One} strokeColor="#FF0000"/>}   
        </Map>
      </ApolloProvider>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (config.API_KEY)
})(MapView)
// https://istarkov.github.io/google-map-thousands-markers/
