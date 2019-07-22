/* 
Author: Sebastian Mancipe
Date: May 23 - 2019
Last update: July 5 - 2019
Description: 
This component executes the query to get all the civilizations avaliables. 
Is used in Form_Edit component 
*/

import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
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
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  //TODO: Check the return value in PlacesList
  requestPlaces(civilizationId) {
    this.props.onSelectedCiv(
      civilizationId
    )
  }

  render() {
    return (
      <Dropdown.Menu>
      <Query query={CIV_QUERY} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading</div>
          if (error) return <div>Error</div>
          if (data){
            const civilizationsToRender = data.getAllCivilizations
            var civResult = civilizationsToRender.map(civilization =>
                <Dropdown.Item onClick={() => { this.requestPlaces(civilization.Id) }} key={civilization.Id}>
                {civilization.Id} - {civilization.Name}
                </Dropdown.Item>
                )
            return civResult
          }
        }
        }
      </Query>
      </Dropdown.Menu>
    )
  }
}

export default CivilizationList
