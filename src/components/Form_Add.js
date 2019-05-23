import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import PlaceInputs from './PlaceInputs'
import config from '../others/config'
import CivilizationAdd from './CivilizationAdd'
import PlacesAdd from './PlacesAdd'


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
    super(props);
    this.state = {
      places: [{ place_name: "", place_description: "", place_latitude: "", place_longitude: "", place_tag: "" }],
      civilization_name: "",
      civilization_description: "",
      civilization_id: "",
      civ_petition: false,
    }
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

  addLocation = (e) => {
    this.setState((prevState) => ({
      places: [...prevState.places, { name: "", description: "", latitude: "", longitude: "", tag: "" }],
    }));
  }

  submitAction = (e) => {
    e.preventDefault()
    this.setState({ civ_petition: true})
  }

  addedCivilization(id_civ) {
    this.setState({ civilization_id: id_civ })
  }


  render() {
    let { places: placesToRender } = this.state
    let civilizationprops = {
      civilization_name: this.state.civilization_name,
      civilization_description: this.state.civilization_description,
      civ_petition: this.state.civ_petition,
      places_toadd: this.state.places,
      addedCivilization: this.addedCivilization.bind(this),
    }
    let placesProps = {
      places: placesToRender,
      civilization_id: this.state.civilization_id
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
            <Button style={admin_buttons_style} variant="secondary" type="button" onClick={this.addLocation}>
              Agregar más lugares
            </Button>
            {/*<Button variant="primary" style={admin_buttons_style} onClick={this.submitAction}>Guardar</Button>*/}
            <PlaceInputs places={placesToRender} />
            <CivilizationAdd civilizationprops={civilizationprops} />
            <PlacesAdd places={placesProps} />
          </Form>
        </div>
      </ApolloProvider>
    );
  }
}

export default Form_Add
//Biblio: https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
