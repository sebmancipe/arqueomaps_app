import React, {Component} from 'react'
import Civilization from './Civilization'
import {Dropdown} from 'react-bootstrap'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PlacesList from './PlacesList'

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
    console.log("Ingresa a request con Civ " + civilizationId);
    return <PlacesList civilizationId={civilizationId}/>
  }

  handleClick = (e) => {
    this.requestPlaces(e);
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
