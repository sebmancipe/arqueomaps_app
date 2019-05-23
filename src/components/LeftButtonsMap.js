import React, {Component} from 'react'
import {ButtonGroup, OverlayTrigger, Button, Form, Popover} from 'react-bootstrap'
import '../styles/map.css'

class LeftButtonsMap extends Component{

  renderMarker = (e) =>{
    e.preventDefault()
    this.props.viewMarkers(
      e.target.latitude.value,
      e.target.longitude.value,
      e.target.textname.value)
  }

  render() {
    return(
      <ButtonGroup vertical className="buttonGroupVertical">

        <OverlayTrigger trigger="click" placement="right" overlay={
          <Popover id="popover-basic" title="Agrega una nueva ubicación" className="markersForm">
            <Form onSubmit={this.renderMarker}>
            <Form.Group controlId="form" >
              <Form.Label>Latitud</Form.Label>
              <Form.Control size="sm" type="number" step="0.000001" placeholder="Latitud" name="latitude" className="latitude"/>
              <Form.Label size="sm">Longitud</Form.Label>
              <Form.Control size="sm" type="number" step="0.000001" placeholder="Longitud" name="longitude" className="longitude"/>
              <Form.Label size="sm">Nombre</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Nombre" name="textname" className="textname" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Popover>

        }>
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
