/* 
Author: Sebastian Mancipe
Date: 
Last update: July 5 - 2019
Description: 
This component shows the form with all the places from a specific civilization. 
Call the PlacesDelete, PlacesUpdate and PlaceInputs components.
Update the content of the places based in the changes done
*/
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { ListGroup, ButtonToolbar } from 'react-bootstrap'
import gql from 'graphql-tag'
import PlaceInputs from '../create/PlaceInputs'
import { Form } from 'react-bootstrap'
import PlacesUpdate from './PlacesUpdate'
import PlacesDelete from './PlacesDelete'


const margin_style = {
  'marginBottom': '15px'
}

const PLACE_QUERY = gql`
query getAllPlacesFromCivilization($Id:Int)
  {
    getAllPlacesFromCivilization(Id:$Id) {
      Id
      Name
      Description
      Latitude
      Longitude
      Tag
    }
  }
`
class PlacesList extends Component {
  constructor(props) {
    super();
    this.state = {
      places: [{ place_id: "", place_name: "", place_description: "", place_latitude: "", place_longitude: "", place_tag: "" }],
      edit: false
    }
  }
  editAction() {
    this.setState({ edit: true })
  }

  /*
  This method handle the changes in any input of the form and saves it to the places state.
  First replaces the target name of the input (this is for the Bootstrap classes)
  Then check if some input based in the class name has been changed
  And update the value in the position of the place and in the attribute changed.
  The attribute's name is modified to the values in the server-side to avoid conflicts 
  */
  handleChange = (e, place) => {
    var targetRealClassName = e.target.className.replace(' form-control', '')
    if (["place_name", "place_description", "place_latitude", "place_longitude", "place_tag"].includes(targetRealClassName)) {
      let places = [...this.state.places]
      places[e.target.dataset.id] = place
      places[e.target.dataset.id][targetRealClassName.replace('place_', '').charAt(0).toUpperCase() + targetRealClassName.replace('place_', '').slice(1)] = e.target.value
      this.setState({ places })
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  render() {
    const civilizationId = Number(this.props.civilizationId)
    if(civilizationId!==0)
    return (
      //The query returns all the places from the selected civilization
      <Query key={civilizationId + 1} query={PLACE_QUERY} variables={{ Id: civilizationId }} pollInterval={1000}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching Places</div>
          if (error) return <div>Error</div>
          if (data) {
            const placesToRender = data.getAllPlacesFromCivilization
            return (
              //Load all the places from placesToRender in the input form with delete and save buttons
              <ListGroup key={civilizationId} style={margin_style}>
                {placesToRender.map(place =>
                  <ListGroup.Item key={place.Id}> {place.Name}
                    <ButtonToolbar key={place.Id}>
                      <Form key={place.Id} onChange={(e) => { this.handleChange(e, place) }}>
                        <PlaceInputs key={place.Id} places={place} />
                        <PlacesUpdate key={place.Id} placesUpdate={this.state.places} />
                        <PlacesDelete key={place.Id} placesDelete={place.Id} />
                      </Form>
                    </ButtonToolbar>
                  </ListGroup.Item>
                )}
              </ListGroup>
            )
          }
        }}
      </Query>
    )
    else return null
  }
}

export default PlacesList
