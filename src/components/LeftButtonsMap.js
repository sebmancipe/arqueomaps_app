import React, {Component} from 'react'
import {ButtonGroup, OverlayTrigger, Button, Form, Popover} from 'react-bootstrap'



function action(){
  console.log("Hellouda");
}

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

class LeftButtonsMap extends Component{
  render() {
    return(
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
    )
  }

}
export default LeftButtonsMap
