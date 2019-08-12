/* 
Author: Sebastian Mancipe
Date: 
Last update: July 5 - 2019
Description: 
This component executes the mutation that updates a specific place
*/

import React, { Component } from 'react'
import { Mutation } from "react-apollo"
import {gql} from 'apollo-boost'
import {Button} from 'react-bootstrap'

const buttons_style ={
  margin: '15px'
}

const PLAC_MUT = gql`
  mutation updatePlaceById($Id: Int!,$Name: String!, $Description: String!, $Latitude: String!, $Longitude: String!, $Tag: String!) {
    updatePlaceById(Id:$Id,Name:$Name,Description:$Description,Latitude:$Latitude,Longitude:$Longitude,Tag:$Tag) {
      Id
      Name
      Description
    }
  }
`


class PlacesUpdate extends Component {
  constructor(props){
    super(props);
    this.state = {
      showAlert: false,
    };
  }

  render(){
    const placesUpdate = this.props.placesUpdate
    //Map is unnecesary because placesUpdate has always one element
    return placesUpdate.map(({Id,Name, Description, Latitude, Longitude, Tag}) => {
      return (
      <Mutation mutation={PLAC_MUT}
        variables={{Id: Number(Id) , Name: Name, Description: Description, Latitude:Latitude, Longitude: Longitude, Tag: Tag}}
      >
      {(mutateFunction, { data, error }) => {
        return <div>
        <Button style={buttons_style} variant="primary" onClick={mutateFunction}>Guardar</Button>
        </div>
      }
      }
      
    </Mutation>
      )
    }
    )
  }
}

export default PlacesUpdate
/*https://reactgo.com/graphql-react-apollo-client/*/
