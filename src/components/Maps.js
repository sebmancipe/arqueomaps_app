/* 
Author: Sebastian Mancipe
Date: 
Last update: July 18 - 2019
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

// Imports to apollo-client and connection to graphql
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
      markers: [{ id: '', lat: '', lng: '', text_mark: '' }],
      /*markers: [{ id:'1',lat: '5.6494393', lng: '-73.5163933', text_mark: "Desierto El Infiernito" },
                { id:'2',lat: '4.977777', lng: '-73.775097', text_mark: "Laguna de Guatavita" },
                { id:'3',lat: '5.709184', lng: '-72.923647', text_mark: "Templo del Sol" },
                { id:'4',lat: '4.598083', lng: '-74.076043', text_mark: "Plaza Simón Bolivar" }],*/
      markers2PolyStack: [{ id: '', lat: '', lng: '', dist: '' }],
      markers2PolyManually: [{ id: '', lat: '', lng: '', dist: '' }],
      markers2PolyMany2One: [{ id: '', lat: '', lng: '', dist: '' }],
      center: {
        lat: 15.5,
        lng: 45.5
      },
      zoom: 4,
      //Control variables to show or no the polylines
      drawPolylinesStack: false,
      drawPolylinesManually: false,
      drawPolylinesMany2One: false,
      id_figure: ''
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  generatePolylineStack() {
    this.setState({ drawPolylinesStack: (this.state.drawPolylinesStack) ? false : true })
    //Set the other options in false
    if (this.state.drawPolylinesStack) {
      this.setState({ drawPolylinesManually: false })
      this.setState({ drawPolylinesMany2One: false })
    }
  }

  //Method that reset, show or no the polyline of manually input
  generatePolylineManually(isReset) {
    if (isReset) {
      this.setState({ drawPolylinesManually:false})
      let markers2PolyManually = [{ id: '', lat: '', lng: '', dist: '' }]
      this.setState({ markers2PolyManually })
    }else
      this.setState({ drawPolylinesManually: (this.state.drawPolylinesManually) ? false : true })
    
    //Set the other options in false
    if (this.state.drawPolylinesManually) {
      this.setState({ drawPolylinesStack: false })
      this.setState({ drawPolylinesMany2One: false })
    }
  }

  //Method that reset, show or no the polyline of many to one input
  generatePolylineMany2One(isReset) {
    if (isReset){
      this.setState({ drawPolylinesMany2One:false})
      let markers2PolyMany2One = [{ id: '', lat: '', lng: '', dist: '' }]
      this.setState({ markers2PolyMany2One })
    }else
      this.setState({drawPolylinesMany2One: (this.state.drawPolylinesMany2One) ? false:true})
    //Set the other options in false
    if (this.state.drawPolylinesMany2One) {
      this.setState({ drawPolylinesStack: false })
      this.setState({ drawPolylinesManually: false })
    }
  }

  //Method called from BottomButtonsMap that resets all states except markers
  //Here its reseted the id_figure to avoid resend with the same id
  resetAll() {
    let markers2PolyMany2One = [{ id: '', lat: '', lng: '', dist: '' }]
    this.setState({ markers2PolyMany2One })
    let markers2PolyManually = [{ id: '', lat: '', lng: '', dist: '' }]
    this.setState({ markers2PolyManually })
    this.setState({ drawPolylinesManually: false })
    this.setState({ drawPolylinesMany2One: false })
    this.setState({ drawPolylinesStack: false })
    this.setState({ id_figure: '' })
  }

  //Method that join two markers with a polyline
  markersJoinManually(markerSelected) {
    var p2 = {
      id: markerSelected.id,
      lat: markerSelected.lat,
      lng: markerSelected.lng
    }
    let markers2PolyManually
    if (this.state.markers2PolyManually[0].lat !== '') {
      let distance
      markers2PolyManually = [...this.state.markers2PolyManually]
      //Get distance based in latitude and longitude of the markers
      distance = this.getDistance(markers2PolyManually[markers2PolyManually.length - 1], p2)
      markers2PolyManually.push({ id: Number(p2.id), lat: Number(p2.lat), lng: Number(p2.lng), dist: Number(distance) })
    }
    else
      markers2PolyManually = [{ id: Number(p2.id), lat: Number(p2.lat), lng: Number(p2.lng) }]
    this.setState({ markers2PolyManually })
  }

  //Method that join all markers to one (the selected by the user)
  markersJoinMany2One(markerSelected) {
    let markers2PolyMany2One = [], markers = this.state.markers
    markers.forEach((marker) => {
      if (marker.id !== markerSelected.id) {
        let distance;
        distance = this.getDistance(marker, markerSelected)
        markers2PolyMany2One.push({ id: Number(marker.id), lat: Number(marker.lat), lng: Number(marker.lng) })
        markers2PolyMany2One.push({ id: Number(markerSelected.id), lat: Number(markerSelected.lat), lng: Number(markerSelected.lng), dist: Number(distance) })
      }
    });
    this.setState({ markers2PolyMany2One })
    console.log(this.state.markers2PolyMany2One)
  }


  onMarkerClick(props, marker, e) {
    const markersTemp = this.state.markers
    //*Search for the place selected in the markers array
    const placeSelected = markersTemp.find(place => place.text_mark === props.label && place.lat === props.position.lat && place.lng === props.position.lng);
    if (this.state.drawPolylinesManually) {
      this.markersJoinManually(placeSelected)
    } else if (this.state.drawPolylinesMany2One)
      this.markersJoinMany2One(placeSelected)
  }

  //Adds a marker in the map and update both, marker and markers2PolyStack.
  //Also moves the view to the marker created in the map
  addMarker(id, latitude, longitude, text) {
    var p2 = {
      id: id,
      lat: latitude,
      lng: longitude,
      text: text
    }
    let markers
    let markers2PolyStack
    if (this.state.markers[0].lat === '') {
      markers = [this.state.markers]
      markers2PolyStack = [this.state.markers2PolyStack]
      markers = [{ id: p2.id, lat: p2.lat, lng: p2.lng, text_mark: p2.text }]
      markers2PolyStack = [{ id: Number(p2.id), lat: Number(p2.lat), lng: Number(p2.lng) }]
    }
    else {
      let distance
      markers = [...this.state.markers]
      markers2PolyStack = [...this.state.markers2PolyStack]
      distance = this.getDistance(markers[markers.length - 1], p2)
      markers.push({ id: p2.id, lat: p2.lat, lng: p2.lng, text_mark: p2.text })
      markers2PolyStack.push({ id: Number(p2.id), lat: Number(p2.lat), lng: Number(p2.lng), dist: Number(distance) })
    }
    this.setState({ markers })
    this.setState({ markers2PolyStack })
    this.setState({
      center: {
        lat: Number(latitude),
        lng: Number(longitude)
      }
    });
    let zoom = 10
    this.setState({ zoom })
  }

  //Utilities: Convert from grad to rad
  toRad(x) {
    return x * Math.PI / 180;
  }

  //Utilities: Return the distance between points p1 and p2 in meters, based geodesic
  getDistance(p1, p2) {
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
    let edgesFigure //Polyline to be sended to LeftButtonMap in order to create the figure. Check what type of join is selected
    if (this.state.drawPolylinesMany2One && this.state.markers2PolyMany2One[0].lat !== '') { edgesFigure = this.state.markers2PolyMany2One; edgesFigure.typeJoin = 'Many2One' }
    else if (this.state.drawPolylinesManually && this.state.markers2PolyManually[0].lat !== '') { edgesFigure = this.state.markers2PolyManually; edgesFigure.typeJoin = 'Manually' }
    else { edgesFigure = this.state.markers2PolyStack; edgesFigure.typeJoin = 'Stack' }

    const LeftButtonsMapProps = {
      addMarker: this.addMarker.bind(this),
      edgesFigure: edgesFigure,
      id_figure: this.state.id_figure
    }
    const BottomButtonsMapProps = {
      generatePolylineStack: this.generatePolylineStack.bind(this),
      generatePolylineManually: this.generatePolylineManually.bind(this),
      generatePolylineMany2One: this.generatePolylineMany2One.bind(this),
      resetPolylines: this.resetAll.bind(this)
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
        >
          <BottomButtonsMap BottomButtonsMapProps={BottomButtonsMapProps} />
          {this.state.markers.map((marker, i) => {
            if (marker.lat !== '')
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
          {/*Check what figure can be rendered in the map based in length and selection by the user*/}
          {this.state.drawPolylinesStack && this.state.markers2PolyStack[0].lat !== ''
            && <Polyline path={this.state.markers2PolyStack} strokeColor="#0000FF" />}
          {this.state.drawPolylinesManually && this.state.markers2PolyManually[0].lat !== ''
            && <Polyline path={this.state.markers2PolyManually} strokeColor="#00FF00" />}
          {this.state.drawPolylinesMany2One && this.state.markers2PolyMany2One[0].lat !== ''
            && <Polyline path={this.state.markers2PolyMany2One} strokeColor="#FF0000" />}
        </Map>
      </ApolloProvider>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (config.API_KEY)
})(MapView)
// https://istarkov.github.io/google-map-thousands-markers/
