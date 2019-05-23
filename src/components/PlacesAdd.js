import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const admin_buttons_style ={
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
`


class PlacesAdd extends Component{
  render(){
    //const civilizationName = this.props.civilization.civilization_name, civilizationDescription = this.props.civilization.civilization_description
    return (
        <div></div>
      /*<Mutation mutation={CIV_MUT} variables={{Name:civilizationName, Description:civilizationDescription}}>
        {(postMutation, { data } ) => {
          return (
            <Button variant="primary" style={admin_buttons_style} onClick={postMutation}>Guardar</Button>
          )
        }
      }
      </Mutation>*/
    )
  }
}

export default PlacesAdd
/*https://reactgo.com/graphql-react-apollo-client/*/
