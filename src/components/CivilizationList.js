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
import {Dropdown} from 'react-bootstrap'
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

//TODO: Check the return value in PlacesList
  requestPlaces(civilizationId){
    this.props.onSelectedCiv(
      civilizationId
    )
  }

  render() {
    return(
      <Query query={CIV_QUERY} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching Civ</div>
          if (error) return <div>Error</div>
          const civilizationsToRender = data.getAllCivilizations
          return(
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
