/* 
Author: Sebastian Mancipe
Date: May 24 - 2019
Last update: July 5 - 2019
Description: 
This component shows the edit places section.
Loads CivilizationList and PlacesList.
Contains the main configuration of Apollo Client also
*/

import React, { Component } from 'react'
import {Dropdown,Container} from 'react-bootstrap'
import config from '../others/config'
import 'bootstrap/dist/css/bootstrap.css'
import CivilizationList from './CivilizationList'
import PlacesList from './PlacesList'

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




class Form_Edit extends Component{
  constructor (props){
    super(props);
    this.state ={
      name: '',
      description: '',
      id_selected: ''
    };
  }

  onSelectedCiv(id){
    this.setState({id_selected:id})
  }


  render(){
    return(
        <ApolloProvider client={client}>
        <div className="box-gallery" id="background_div"></div>
          <Container id="main_container">
            <header id="header" >
              <h1>Edita civilizaciones</h1>
              <p>Selecciona la civilización y edita sus lugares</p>
            </header>
      
            <Dropdown id="dropdown_Civlist">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Ver las civilizaciones disponibles
              </Dropdown.Toggle>
              <CivilizationList onSelectedCiv={this.onSelectedCiv.bind(this)}/>
              <PlacesList civilizationId={this.state.id_selected}/>
            </Dropdown>

        </Container>
      </ApolloProvider>
    );
    }
  }

export default Form_Edit;
