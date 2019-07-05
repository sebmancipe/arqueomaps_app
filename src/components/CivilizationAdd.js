/* 
Author: Sebastian Mancipe
Date: May 20 - 2019
Last update: July 5 - 2019
Description: 
This component contains the mutation to create a new civilization and allows the creation
of its places. 
*/
import React, { Component } from 'react'
import { Mutation } from "react-apollo"
import { gql } from 'apollo-boost'
import { Button } from 'react-bootstrap'
import PlacesAdd from './PlacesAdd'
import {Alert} from 'react-bootstrap'

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



class CivilizationAdd extends Component {
  constructor(props) {
    super()
    this.state = {
      id_civ: '',
    }

  }

  handleSubmit(id) {
    this.setState({ id_civ: id })
  }

  render() {
    const civilizationName = this.props.civilizationprops.civilization_name,
      civilizationDescription = this.props.civilizationprops.civilization_description,
      places = this.props.civilizationprops.places
    let placesprops = {
      id_civ: this.state.id_civ,
      places: places
    }
    return (
      //This mutation creates the Civilization and allows the creation of the places from the civilization
      <Mutation mutation={CIV_MUT}
        variables={{ Name: civilizationName, Description: civilizationDescription }}
        update={(cache, { data: { newCivilization } }) => {
          this.handleSubmit(newCivilization.Id)
        }
        }>
        {/*If the mutation is completed, call the PlacesAdd component to create the places with the civilization's id response*/}
        {(handleSubmit, { data, error }) => (
            <div>
            {/*The button execute the submit and is only active when exists information in the form of civilization*/}
              <Button variant="primary" style={admin_buttons_style} 
              disabled={!(this.props.civilizationprops.civilization_name && this.props.civilizationprops.civilization_description)} 
              onClick={handleSubmit}>Guardar</Button>
              <PlacesAdd placesprops={placesprops} />
              {error && 
                <Alert variant='danger'>
                Ha ocurrido un error, intenta nuevamente
              </Alert>} 
            </div>
          
        )
        }
      </Mutation>)
  }

}

export default CivilizationAdd
/*https://reactgo.com/graphql-react-apollo-client/*/
