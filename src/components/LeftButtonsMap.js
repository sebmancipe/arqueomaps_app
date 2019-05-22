import React, {Component} from 'react'
import {ButtonGroup, OverlayTrigger, Button, Form, Popover} from 'react-bootstrap'
import '../styles/map.css'


function action(){
  console.log("Hellouda");
}

const form =(
  <Popover id="popover-basic" title="Agrega una nueva ubicación" className="markersForm">
    <Form>
    <Form.Group controlId="form">
      <Form.Label>Latitud</Form.Label>
      <Form.Control size="sm" type="number" step="0.000001" placeholder="Latitud" className="latitude"/>
      <Form.Label size="sm">Longitud</Form.Label>
      <Form.Control size="sm" type="number" step="0.000001" placeholder="Longitud" className="longitude"/>
      <Form.Label size="sm">Nombre</Form.Label>
      <Form.Control size="sm" type="text" placeholder="Nombre" />
    </Form.Group>
    <Button variant="primary" type="button" onClick={action}>
      Add
    </Button>
  </Form>
  </Popover>
);


class LeftButtonsMap extends Component{
  render() {
    return(
      <ButtonGroup vertical className="buttonGroupVertical">
        <OverlayTrigger trigger="click" placement="right" overlay={form}>
          <Button variant="success">Add</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="right" >
          <Button variant="success">Save</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="right" >
          <Button variant="success">See</Button>
        </OverlayTrigger>
      </ButtonGroup>
    )
  }

}
export default LeftButtonsMap
