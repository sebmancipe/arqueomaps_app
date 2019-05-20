import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../others/config.js'
import {Form, Button, ButtonGroup, Popover, OverlayTrigger} from 'react-bootstrap'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function action(){
  console.log("Hellouda");
}

const handleApiLoaded = (map, maps) => {
  return(
    <AnyReactComponent
      lat={59.955413}
      lng={30.337844}
      text="My Marker"
    />
  );
};



const form =(
  <Popover id="popover-basic" title="Popover right">
    <Form>
    <Form.Group controlId="form">
      <Form.Label>Latitud</Form.Label>
      <Form.Control size="sm" type="number" placeholder="Latitud" />
      <Form.Label size="sm">Longitud</Form.Label>
      <Form.Control size="sm" type="number" placeholder="Longitud" />
      <Form.Label size="sm">Nombre</Form.Label>
      <Form.Control size="sm" type="text" placeholder="Nombre" />
    </Form.Group>
    <Button variant="primary" type="button" onClick={action}>
      Add
    </Button>
  </Form>
  </Popover>
);

class MapView extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11,
    greatPlaces: [
     {id: 'A', lat: 59.955413, lng: 30.337844},
     {id: 'B', lat: 59.724, lng: 30.080}
   ]
  };



  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <ButtonGroup vertical>
          <OverlayTrigger trigger="click" placement="right" overlay={form}>
            <Button variant="success">Add</Button>
          </OverlayTrigger>
          <OverlayTrigger trigger="click" placement="right" overlay={form}>
            <Button variant="success">Save</Button>
          </OverlayTrigger>
          <OverlayTrigger trigger="click" placement="right" overlay={form}>
            <Button variant="success">See</Button>
          </OverlayTrigger>
        </ButtonGroup>

        <GoogleMapReact
          bootstrapURLKeys={{ key:config.API_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
        </GoogleMapReact>
        {AnyReactComponent}
        <ButtonGroup size="sm" aria-label="Basic example">
            <Button variant="secondary">Left</Button>
            <Button variant="secondary">Middle</Button>
            <Button variant="secondary">Right</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default MapView;
