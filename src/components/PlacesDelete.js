/* 
Author: Sebastian Mancipe
Date: 
Last update: July 5 - 2019
Description: 
This component execute the deleting action of a place.
*/
import React, { Component } from 'react'
import { Mutation } from "react-apollo"
import {gql} from 'apollo-boost'
import {Button} from 'react-bootstrap'

const buttons_style ={
    margin: '15px'
}
  
const PLAC_MUT = gql`
  mutation deletePlace($Id: Int!) {
        deletePlace(Id:$Id)
    }
  `
  
  
class PlacesDelete extends Component {
    constructor(props){
      super(props);
      this.state = {
        showAlert: false,
      };
    }
  
    render(){
      const idPlace = this.props.placesDelete
      return (
        <Mutation mutation={PLAC_MUT} variables={{Id:idPlace}}>
        {(mutateFunction, { data, error }) => {
          return <div>
          <Button style={buttons_style} variant="primary" onClick={mutateFunction}>Eliminar</Button>
          </div>
        }
        }
        </Mutation>
      )
    }
  }
  
  export default PlacesDelete
  