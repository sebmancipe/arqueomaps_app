import React, {Component} from 'react'
import { Query } from 'react-apollo'
import {ListGroup, Button, ButtonToolbar} from 'react-bootstrap'
import gql from 'graphql-tag'
import PlaceInputs from './PlaceInputs'
import {Form} from 'react-bootstrap'

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
      Tag
    }
  }
`
class PlacesList extends Component {
  constructor(props){
    super();
    this.state={
      places: [{ place_name: "", place_description: "", place_latitude: "", place_longitude: "", place_tag: ""}],
      edit: false
    }
  }
  editAction(){
    this.setState({edit:true})
  }

  handleChange = (e) => {
    var targetRealClassName = e.target.className.replace(' form-control', '')
    if (["place_name", "place_description", "place_latitude", "place_longitude", "place_tag"].includes(targetRealClassName)) {
      let places = [...this.state.places]
      places[e.target.dataset.id][targetRealClassName] = e.target.value
      this.setState({ places })
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  render(){
    const civilizationId = Number(this.props.civilizationId)
    return(
      <Query  key={civilizationId+1} query={PLACE_QUERY} variables={{Id:civilizationId}} pollInterval={500}>
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
                    <Button key={place.Id} style={buttons_style} variant="primary" onClick={this.editAction}>Editar</Button>
                    <Button  key={place.Id}style={buttons_style} variant="secondary">Eliminar</Button>
                    <Form onChange={this.handleChange}>
                    {console.log(place)}
                    {/*Error with multiples places */}
                      <PlaceInputs places={placesToRender}/>
                    </Form>
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
