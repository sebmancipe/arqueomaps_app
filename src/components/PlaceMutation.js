import React from 'react'
import {Alert} from 'react-bootstrap'

class PlaceMutation extends React.Component {
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
    const handleDismiss = () => this.setState({ show: !this.state.show });
    if(this.state.show){
      return (
        <Alert onClose={handleDismiss} variant='success' dismissible>
          Se ha creado la civilización correctamente
        </Alert>
      );
    }return null
  };
};

export default PlaceMutation;
