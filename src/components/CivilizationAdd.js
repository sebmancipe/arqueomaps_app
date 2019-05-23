import React, { Component } from 'react'
import { Mutation } from "react-apollo"
import { gql } from "apollo-boost"
import { Button } from 'react-bootstrap'

const admin_buttons_style = {
  margin: '5px'
}

const CIV_MUT = gql`
  mutation CivilizationAdd($Name: String!, $Description: String!) {
    newCivilization(Name:$Name, Description:$Description) {
      Id
      Name
      Description
    }
  }
`;


const PLAC_MUT = gql`
  mutation newPlace($Name: String!, $Description: String!, $Latitude: Float!, $Longitude: Float!, $Tag: String!, $Civilization: Int!) {
    newPlace(Name:$Name,Description:$Description,Latitude:$Latitude,Longitude:$Longitude,Tag:$Tag,Civilization: $Civilization) {
      Id
      Name
      Description
    }
  }
`;


class CivilizationAdd extends Component {
  render() {
    const civilizationName = this.props.civilizationprops.civilization_name,
      submitButton = this.props.civilizationprops.civ_petition,
      civilizationDescription = this.props.civilizationprops.civilization_description,
      places = this.props.civilizationprops.places_toadd

    /*return places.map(({ name, description, latitude, longitude, tag }) => {
        return (
          <Mutation mutation={PLAC_MUT}
            variables={{Name: name, Description: description, Latitude: latitude, Longitude:longitude, Tag:tag, Civilization: 2}}
            >
            {(postMutation, {data}) =>(
                <div>
                  <Button variant="primary" style={admin_buttons_style} onClick={postMutation}>Guardar</Button>
                  {data && <div>{data.newPlace.Id}</div>}
                </div>
            )}
          </Mutation>
        )
    }
  )*/
    return (
      <Mutation mutation={CIV_MUT} variables={{ Name: civilizationName, Description: civilizationDescription }}>
        {(postMutation) => {
          return (
            <Button variant="primary" style={admin_buttons_style} onClick={postMutation}>Guardar</Button>
          )
        }
        }
      </Mutation>)
  }

}

export default CivilizationAdd
/*https://reactgo.com/graphql-react-apollo-client/*/
