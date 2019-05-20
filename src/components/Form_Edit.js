import React, { Component } from 'react'
import {Dropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import CivilizationList from './CivilizationList'
import PlacesList from './PlacesList'

// 1
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: 'http://192.168.0.26:8080/graphql'
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
  constructor (){
    super();
    this.state ={
      name: '',
      description: '',
      places: []
    };
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
              <CivilizationList />
              
            </Dropdown>

        </div>
      </ApolloProvider>
    );
}
}

export default Form_Edit;
