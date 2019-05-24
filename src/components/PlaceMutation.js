import React from 'react'

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
