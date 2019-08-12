/* 
Author: Sebastian Mancipe
Date: 
Last update: July 3 - 2019
Description: 
This component is used to add multiples places to a specific civilization. 
Uses the PlaceMutation component to acomplish this purpouse
*/

import React, { Component } from 'react'
import { Mutation } from "react-apollo"
import {gql} from 'apollo-boost'
import PlaceMutation from './PlaceMutation'
import {Alert} from 'react-bootstrap'


const PLAC_MUT = gql`
  mutation newPlace($Name: String!, $Description: String!, $Latitude: String!, $Longitude: String!, $Tag: String!, $Civilization: Int) {
    newPlace(Name:$Name,Description:$Description,Latitude:$Latitude,Longitude:$Longitude,Tag:$Tag,Civilization: $Civilization) {
      Id
      Name
      Description
    }
  }
`


class PlacesAdd extends Component {
  constructor(props){
    super(props);
    this.state = {
      showAlert: false,
    };
  }

  render() {
    const handleDismiss = () => this.setState({ showAlert: !this.state.showAlert });

    const id_civ = Number(this.props.placesprops.id_civ), places_add = this.props.placesprops.places
    
    return places_add.map(({ place_name, place_description, place_latitude, place_longitude, place_tag }) => {
        return (
          //This mutation creates the place based in the props sended by the CivilizationAdd component
          <Mutation mutation={PLAC_MUT}
            variables={{ Name: place_name, Description: place_description, Latitude: place_latitude, Longitude: place_longitude, Tag: place_tag, Civilization: id_civ }}
          >
            {(mutateFunction, { data, error }) => {
              /*PlaceMutation execute the mutation only if the civilization was created properly*/
              if(id_civ !== 0) return <PlaceMutation mutate={mutateFunction} />
              else if (this.state.showAlert && error)
              return <Alert onClose={handleDismiss} variant='danger' dismissible>
                Ha ocurrido un error
              </Alert>
              else return null
            }
            }
            
          </Mutation>
        )
      }
      )
  }
}

export default PlacesAdd
/*https://reactgo.com/graphql-react-apollo-client/*/
