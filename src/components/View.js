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
import FiguresList from './FiguresList'
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
      markers2PolyView:[{ id: '', lat: '', lng: '', dist: '' }],
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



  updateEdges(edges){
    let markers,markers2PolyView,markerFrom,markerTo
    edges.forEach(function(edge){
    markerFrom = {id:edge.PlaceFrom.Id,lat:edge.PlaceFrom.Latitude,lng:edge.PlaceFrom.Longitude,text_mark: edge.PlaceFrom.Name}
    markerTo = {id:edge.PlaceTo.Id,lat:edge.PlaceTo.Latitude,lng:edge.PlaceTo.Longitude,text_mark: edge.PlaceTo.Name}
    if (markers===undefined) {
      markers = [markerFrom]
      markers2PolyView = [{ id: markerFrom.id, lat: markerFrom.lat, lng: markerFrom.lng }]
    }
    if(markers.filter(marker => (marker.id===markerTo.id))) markers.push(markerTo) //Avoid duplicates
    markers2PolyView.push({ id: markerTo.id, lat: markerTo.lat, lng: markerTo.lng })
    })
    
    this.setState({ markers},()=>{
      console.log(markers)
    })
    this.setState({ markers2PolyView},()=>{
      console.log(markers2PolyView)
    })
  }


  render() {
    const FiguresListProps = {
      updateEdges: this.updateEdges.bind(this)
    }

    return (
      <ApolloProvider client={client}> 
        <FiguresList FiguresListProps={FiguresListProps}/>
        <LeftButtonsMap  />
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
          <BottomButtonsMap  />
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
          {this.state.markers2PolyView[0].lat !== ''
            && <Polyline path={this.state.markers2PolyView} strokeColor="#0000FF" />}
        </Map>
      </ApolloProvider>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (config.API_KEY)
})(MapView)