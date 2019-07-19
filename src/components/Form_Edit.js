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
import {Dropdown} from 'react-bootstrap'
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



const text_style ={
  color: '#000000'
}

const margin_style ={
  'marginBottom': '15px'
}


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
          <div className="content">
            <header id="header" >
              <h1 style={text_style}>Edita civilizaciones</h1>
              <p>Selecciona la civilización y edita sus lugares</p>
            </header>
      
            <Dropdown style={margin_style}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Selecciona para ver las civilizaciones disponibles
              </Dropdown.Toggle>
              <CivilizationList onSelectedCiv={this.onSelectedCiv.bind(this)}/>
              <PlacesList civilizationId={this.state.id_selected}/>
            </Dropdown>

        </div>
      </ApolloProvider>
    );
    }
  }

export default Form_Edit;
