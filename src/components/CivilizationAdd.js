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
  render(){
    const civilizationName = this.props.civilizationprops.civilization_name, 
    submitButton = this.props.civilizationprops.civ_petition,
    civilizationDescription = this.props.civilizationprops.civilization_description
    if(submitButton){
      return (
        <Mutation mutation={CIV_MUT} variables={{Name:civilizationName, Description:civilizationDescription}}>
        {/*TODO: Check how to start a mutation without a onClick method*/}
        {(submitButton, { data } ) => {
          const dataReceived = data.newCivilization
          return (
            <div>
              {dataReceived.Id+" "+dataReceived.Name +" "}
            </div>
          )
        }
      }
      </Mutation>)
      }else{
        return null
      }   
  }
}

export default CivilizationAdd
/*https://reactgo.com/graphql-react-apollo-client/*/
