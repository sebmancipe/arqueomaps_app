import React, {Component} from 'react'
import { Query } from 'react-apollo'
import {ListGroup, Button, ButtonToolbar} from 'react-bootstrap'
import gql from 'graphql-tag'

const buttons_style ={
  margin: '15px'
}

const margin_style ={
  'marginBottom': '15px'
}

const PLACE_QUERY = gql`
query getAllPlacesFromCivilization($Id:Int)
  {
    getAllPlacesFromCivilization(Id:$Id) {
      Name
      Description
      Latitude
      Longitude
    }
  }
`
class PlacesList extends Component {
  render(){
    const civilizationId = Number(this.props.civilizationId)
    return(
      <Query  key={civilizationId} query={PLACE_QUERY} variables={{Id:civilizationId}} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching Places</div>
          if (error) return <div>Ups, selecciona una civilización primero</div>
          const placesToRender = data.getAllPlacesFromCivilization
          //TODO: Show other component based in the response
          return(
            <ListGroup key={civilizationId} style={margin_style}>
              {placesToRender.map(place =>
                <ListGroup.Item key={place.Id}> {place.Name}
                  <ButtonToolbar key={place.Id}>
                    <Button key={place.Id} style={buttons_style} variant="primary">Editar</Button>
                    <Button  key={place.Id}style={buttons_style} variant="secondary">Eliminar</Button>
                  </ButtonToolbar>
                </ListGroup.Item>
              )}
            </ListGroup>
          )
        }}
      </Query>
    )
  }
}

export default PlacesList
