/* 
Author: Sebastian Mancipe
Date: May 23 - 2019
Last update: July 5 - 2019
Description: 
This component executes the query to get all the civilizations avaliables. 
Is used in Form_Edit component 
*/

import React, {Component} from 'react'
import Civilization from './Civilization'
import {Dropdown, Alert} from 'react-bootstrap'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const CIV_QUERY = gql`
{
  getAllCivilizations {
    Id
    Name
  }
}
`

class CivilizationList extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false
    }
  }
//TODO: Check the return value in PlacesList
  requestPlaces(civilizationId){
    this.props.onSelectedCiv(
      civilizationId
    )
  }

  render() {
    const handleDismiss = () => this.setState({ show: true });
    return(
      <Query query={CIV_QUERY} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return  <Alert onClose={handleDismiss} hidden={this.state.show} variant='info' dismissible>
                                Cargando...
                              </Alert>
          const civilizationsToRender = data.getAllCivilizations
          if(civilizationsToRender.length === 0) 
            return  <Alert onClose={handleDismiss} hidden={this.state.show} variant='danger' dismissible>
                    No se ha encontrado ninguna civilización
                    </Alert>
          else return(
            <Dropdown.Menu>
            {/*Loads all the civilizations in a dropdown with the information in the component Civilization*/}
              {civilizationsToRender.map(civilization =>
                <Dropdown.Item onClick={()=>{this.requestPlaces(civilization.Id)}} key={civilization.Id}>
                  <Civilization key={civilization.Id} civilization={civilization} />
                </Dropdown.Item>)}
            </Dropdown.Menu>
          )
        }}
      </Query>
    )
  }
}

export default CivilizationList
