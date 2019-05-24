import React from 'react';
import { Mutation } from 'react-apollo';

class PlaceMutation extends React.Component {
  componentDidMount() {
    const { mutate } = this.props;
    mutate();
  };

  render() {
    return null;
  };
};

export default PlaceMutation;
