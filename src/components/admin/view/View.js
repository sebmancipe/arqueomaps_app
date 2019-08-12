/* 
Author: Sebastian Mancipe
Date: 
Last update: August 10 - 2019
Description: 
This component contains the view figures map. Acording to the selected Figure (from FiguresList component),
renders the polylines and markers related.
*/

import React, { Component } from 'react'
import config from '../../../others/config.js'
import FiguresList from './FiguresList'
import { Map, GoogleApiWrapper, Marker, Polyline, Polygon } from 'google-maps-react'
import '../../../styles/map_free.css'


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
    this.state = {
      markers: [{ id: '', lat: '', lng: '', text_mark: '' }],
      markers2PolyView:[{ id: '', lat: '', lng: '', dist: '' }],
      center: {
        lat: 15.5,
        lng: 45.5
      },
      isComplete: false,
      zoom: 4
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

 onMarkerClick(props, marker, e) {
    /* Show information when clicked*/
  }


/**
 * updateEdges reload the polylines and markers states of this component to re-render the figure
 * selected. Is called by child FiguresList. Could be optimized by the type of figure (Many2One or Manually)
 * @param {Param that contains the information of all edges with Id, PlaceFrom,
 * PlaceTo and Dist} edges 
 */
  updateEdges(edges){
    console.log(edges)
    let markers,markers2PolyView,markerFrom,markerTo
    const firstPlace=edges[0].PlaceFrom,lastPlace=edges[edges.length-1].PlaceTo;
    console.log((firstPlace.Id === lastPlace.Id),"firstPlace",firstPlace, "lastPlace",lastPlace)
    this.setState({isComplete:(firstPlace.Id === lastPlace.Id)?true:false})
    edges.forEach(function(edge,i){
    markerFrom = {id:edge.PlaceFrom.Id,lat:edge.PlaceFrom.Latitude,lng:edge.PlaceFrom.Longitude,text_mark: edge.PlaceFrom.Name}
    markerTo = {id:edge.PlaceTo.Id,lat:edge.PlaceTo.Latitude,lng:edge.PlaceTo.Longitude,text_mark: edge.PlaceTo.Name}
    if (markers===undefined) {
      markers = [markerFrom]
      markers.push(markerTo)
      markers2PolyView = [{ id: markerFrom.id, lat: markerFrom.lat, lng: markerFrom.lng }]
      markers2PolyView.push({ id: markerTo.id, lat: markerTo.lat, lng: markerTo.lng })
    }else{
      if(markers.filter(marker => (marker.id===markerTo.id)).length===0)
      markers.push(markerTo) //Avoid duplicates - Not used in Many2One
      if(markers.filter(marker => (marker.id===markerFrom.id)).length===0)
      markers.push(markerFrom) //Avoid duplicates - Not used in Many2One
      //markers.push(markerFrom) Obligatory in Many2One
      markers2PolyView.push({ id: markerFrom.id, lat: markerFrom.lat, lng: markerFrom.lng })
      markers2PolyView.push({ id: markerTo.id, lat: markerTo.lat, lng: markerTo.lng })
    }
    })
    this.setState({ markers})
    this.setState({ markers2PolyView})
  }


  render() {
    const FiguresListProps = {
      updateEdges: this.updateEdges.bind(this)
    }

    return (
      <ApolloProvider client={client}> 
        <Map id="map_free"
          google={this.props.google}
          center={this.state.center}
          zoom={this.state.zoom}
          initialCenter={{
            lat: 4.624335,
            lng: -74.063644
          }}
          mapTypeControl={false}
        >
        <FiguresList FiguresListProps={FiguresListProps}/>
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
          {this.state.isComplete && <Polygon
          paths={this.state.markers2PolyView}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35} />}
          {!this.state.isComplete && this.state.markers2PolyView[0].lat !== ''
            && <Polyline path={this.state.markers2PolyView} strokeColor="#00FFFF" />}
        </Map>
      </ApolloProvider>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (config.API_KEY)
})(MapView)