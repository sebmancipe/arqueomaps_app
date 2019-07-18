/* 
Author: Sebastian Mancipe
Date: 
Last update: July 3 - 2019
Description: 
This component execute the mutation of the Place (create a place) in the componentDidMount method. 
The component is called from PlacesAdd. The return method has not been implemented yet. 
Should return an error or a complete message
*/
import React from 'react'
//import {Alert} from 'react-bootstrap'

class EdgeMutation extends React.Component {
  componentDidMount() {
    const { mutate } = this.props;
    mutate();
  };

  
  constructor(props){
    super(props);
    this.state = {
      show: true,
    };
  }

  render() {
    //The Alert response has not been implemented for error showing the alert and closing it again 
    //const handleDismiss = () => this.setState({ show: !this.state.show });
    //TO DO: Multiples Alerts when create multiples places
    /*if(this.state.show){
      return (
        <Alert onClose={handleDismiss} variant='success' dismissible>
          Se ha creado la civilización correctamente
        </Alert>
      );
    }else*/ return null
  };
};

export default EdgeMutation;