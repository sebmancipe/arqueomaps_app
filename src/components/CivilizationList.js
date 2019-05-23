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
