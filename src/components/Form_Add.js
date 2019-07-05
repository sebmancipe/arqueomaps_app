/* 
Author: Sebastian Mancipe
Date: May 24 - 2019
Last update: July 5 - 2019
Description: 
This component shows the creates civilization and places section.
Contains the main configuration of Apollo Client also
*/

import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import PlaceInputs from './PlaceInputs'
import config from '../others/config'
import CivilizationAdd from './CivilizationAdd'


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


const text_style = {
  color: '#000000'
}

const admin_buttons_style = {
  margin: '5px'
}




class Form_Add extends Component {
  constructor(props){
    super();
    this.state = {
      places: [{ place_name: "", place_description: "", place_latitude: "", place_longitude: "", place_tag: "" }],
      civilization_name: "",
      civilization_description: "",
      civilization_id: '',
    }
    this.addedCivilization = this.addedCivilization.bind(this)
  }


  /*
  This method handle the changes in any input of the form and saves it to the places state.
  Check if some input based in the class name has been changed
  And update the value in the position of the place and in the attribute changed.
   */
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

  /* 
  Creates new object in the array to add another place
  */
  addLocation = (e) => {
    this.setState((prevState) => ({
      places: [...prevState.places, { place_name: "", place_description: "", place_latitude: "", place_longitude: "", place_tag: "" }]
    }));
  }

  /*
  Removes the places remaining just one
  */
  removeLocation = (e) => {
    this.setState((prevState) => ({
      places: [...prevState.places.splice(-1,1)]
    }));
  }


  addedCivilization(id_civ) {
    this.setState({ civilization_id: id_civ })
  }


  render() {
    let { places: placesToRender } = this.state
    let civilizationprops = {
      civilization_name: this.state.civilization_name,
      civilization_description: this.state.civilization_description,
      addedCivilization: this.addedCivilization,
      places: this.state.places
    }
    

    return (
      <ApolloProvider client={client}>
        <div className="content">
          <header id="header" >
            <h1 style={text_style}>Agrega civilizaciones</h1>
            <p>Ingresa los campos y agrega lugares a la civilización que estás por crear</p>
          </header>
          <Form onChange={this.handleChange}>
            <Form.Group>
              <Form.Label htmlFor="civilization_name">Nombre de la civilización</Form.Label>
              <Form.Control type="text" name="civilization_name" placeholder="Nombre" id="civilization_name" />
              <Form.Text className="text-muted">
                Esta información no podrá ser cambiada.
              </Form.Text>
              <Form.Label htmlFor="civilization_description" >Descripción</Form.Label>
              <Form.Control type="text" name="civilization_description" placeholder="Descripción" id="civilization_description" />
              <Form.Text className="text-muted">
                Esta información no podrá ser cambiada.
              </Form.Text>
            </Form.Group>

            <h4 style={text_style}>Lugares</h4>
            <Button style={admin_buttons_style} variant="secondary"  onClick={this.addLocation}>
              Agregar más lugares
            </Button>
            <Button style={admin_buttons_style} variant="secondary"  onClick={this.removeLocation}>
              Eliminar lugares
            </Button>
            <PlaceInputs places={placesToRender} />
            <CivilizationAdd civilizationprops={civilizationprops} />
            
          </Form>
        </div>
      </ApolloProvider>
    );
  }
}

export default Form_Add
//Biblio: https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
