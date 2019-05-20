import React, {Component} from 'react'
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const CIV_MUT = gql`
  mutation CivilizationAdd($Name: String!, $Description: String!) {
    newCivilization(Name:$Name, Description:$Description) {
      Id
      Name
      Description
    }
  }
`


class CivilizationAdd extends Component{
  this.state={
    name:'',
    description:'',
  }
  render(){
    let {name,description}={this.props.name, this.props.description}
    return (
      <Mutation mutation={CIV_MUT} variables={{Name:{name}, Description:{description}}}>
        // TODO: Complete mutation
      </Mutation>
    )
  }
}
//https://reactgo.com/graphql-react-apollo-client/
