import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import PlaceMutation from './PlaceMutation'

const admin_buttons_style = {
  margin: '5px'
}



const PLAC_MUT = gql`
  mutation newPlace($Name: String!, $Description: String!, $Latitude: Float!, $Longitude: Float!, $Tag: String!, $Civilization: Int!) {
    newPlace(Name:$Name,Description:$Description,Latitude:$Latitude,Longitude:$Longitude,Tag:$Tag,Civilization: $Civilization) {
      Id
      Name
      Description
    }
  }
`


class PlacesAdd extends Component {
 
  render() {
      const id_civ = Number(this.props.placesprops.id_civ), places_add = this.props.placesprops.places
      return places_add.map(({ place_name, place_description, place_latitude, place_longitude, place_tag }) => {
        return (
          <Mutation mutation={PLAC_MUT}
            variables={{ Name: place_name, Description: place_description, Latitude: place_latitude, Longitude: place_longitude, Tag: place_tag, Civilization: id_civ }}
          >
            {(mutateFunction, { data }) => {
              console.log(id_civ)
              if(id_civ !== 0) return <PlaceMutation mutate={mutateFunction} />
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
