/* eslint-disable no-extend-native */
/*eslint no-extend-native: ["error", { "exceptions": ["Object"] }]*/
/* 
Author: Sebastian Mancipe
Date: 
Last update: August 25 - 2019
Description: 
This component contains the bottom section of buttons that reset, shows or allow the creation of 
polylines based in the user input. 
Last update comment: Added InformationSection component
*/

import React, { Component } from 'react'
import { ButtonGroup, Button, Dropdown, DropdownButton, OverlayTrigger, Form, Row, Popover, Col } from 'react-bootstrap'
import InformationSection from '../information/InformationSection'


const R = 6371e3; // Earth’s radius in meter
class BottomButtonsMapFree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showManually: false,
      showMany2One: false,
      projected_place: {
        name_place: '',
        angle: 0,
        distance: 0
      },
      isProjected: false
    }
    this.resetPolylines = this.resetPolylines.bind(this)
  }

  handleChange = (e) => {
    var projected_place = this.state.projected_place
    projected_place[e.target.name] = e.target.value
    this.setState({ projected_place })
  }

  setProjected = (e) => {
    this.props.BottomButtonsMapProps.isProjectable((this.state.isProjected) ? true : false)
    this.setState({ isProjected: (this.state.isProjected) ? false : true })
  }

  showPolylineStack = (e) => {
    this.props.BottomButtonsMapProps.generatePolylineStack()
  }

  showPolylineManually = (e, isReset) => {
    this.props.BottomButtonsMapProps.generatePolylineManually(isReset)
    if (isReset) this.setState({ showManually: false })
    else this.setState({ showManually: (this.state.showManually) ? false : true })
  }

  showPolylineMany2One = (e, isReset) => {
    this.props.BottomButtonsMapProps.generatePolylineMany2One(isReset)
    if (isReset) this.setState({ showMany2One: false })
    else this.setState({ showMany2One: (this.state.showMany2One) ? false : true })
  }

  setAngles = (e) => {
    this.props.BottomButtonsMapProps.setAngles(this.props.BottomButtonsMapProps.getAngle?true:false)
  }

  resetPolylines() {
    this.setState({ showManually: false })
    this.setState({ showMany2One: false })
    this.props.BottomButtonsMapProps.resetPolylines()
  }


  /**
   * Obtained from https://www.movable-type.co.uk/scripts/latlong.html, section:
   * Destination point given distance and bearing from start point
   * Creates a projection based in a source marker and angle
   */
  submitProjection = (e) => {
    e.preventDefault()
    var startMarker = this.props.BottomButtonsMapProps.markerSelected
    var d = (this.state.projected_place.distance) * 1000
    var latSource = Number(startMarker.lat)
    var lngSource = Number(startMarker.lng)
    var angle = (this.state.projected_place.angle)

    const angular_distance = d / R; // angular distance in radians
    const angle_radians = Number(angle).toRadians();
    const lat1 = latSource.toRadians(), long1 = lngSource.toRadians();

    const sinlat2 = Math.sin(lat1) * Math.cos(angular_distance) + Math.cos(lat1) * Math.sin(angular_distance) * Math.cos(angle_radians);
    const lat2 = Math.asin(sinlat2);
    const y = Math.sin(angle_radians) * Math.sin(angular_distance) * Math.cos(lat1);
    const x = Math.cos(angular_distance) - Math.sin(lat1) * sinlat2;
    const long2 = long1 + Math.atan2(y, x);

    const lat = lat2.toDegrees();
    const lon = long2.toDegrees();

    this.props.BottomButtonsMapProps.addMarker(
      -1,
      lat,
      lon,
      this.state.projected_place.name_place,
      "Projection"
    )
  }



  render() {
    const InfoProps ={
      distanceInfo: this.props.BottomButtonsMapProps.distanceInformation,
      anglesInfo: this.props.BottomButtonsMapProps.anglesInformation,
      angle: this.props.BottomButtonsMapProps.angle
    }
    console.log("Bottom Buttons",InfoProps)
    return (
      <ButtonGroup size="sm" aria-label="Basic example" className="buttonGroupHorizontal">
        <Button size="sm" variant="secondary" onClick={this.resetPolylines}>Reset</Button>
        <Button size="sm" variant="secondary" onClick={this.showPolylineStack}>Stack</Button>
        <DropdownButton id="dropdown-basic-button" title="Manually" size="sm">
          <Dropdown.Item onClick={(e) => this.showPolylineManually(e, false)}>{(this.state.showManually) ? 'Deactivate' : 'Activate'}</Dropdown.Item>
          <Dropdown.Item onClick={(e) => this.showPolylineManually(e, true)}>Reset</Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Many2One" size="sm">
          <Dropdown.Item onClick={(e) => this.showPolylineMany2One(e, false)}>{(this.state.showMany2One) ? 'Deactivate' : 'Activate'}</Dropdown.Item>
          <Dropdown.Item onClick={(e) => this.showPolylineMany2One(e, true)}>Reset</Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Angles" size="sm">
          <Dropdown.Item onClick={this.setAngles}>{(this.props.BottomButtonsMapProps.getAngle) ? 'Deactivate' : 'Activate'}</Dropdown.Item>
        </DropdownButton>



        <OverlayTrigger trigger="click" placement="top" overlay={
          <Popover id="popover-basic" title="Añade una proyección" className="markersForm" >
            <Form onChange={this.handleChange}>
              <Form.Group controlId="form" >
                <Row>
                  <Col>
                    <Form.Text size="sm">Distancia desde el punto seleccionado</Form.Text>
                    <Form.Control size="sm" type="number" step="0.0000000001" placeholder="Distancia" name="distance" className="distance" />
                  </Col>
                  <Col>
                    <Form.Text size="sm">Angulo en grados</Form.Text>
                    <Form.Control size="sm" type="number" step="0.0000000001" placeholder="Ángulo" name="angle" className="angle" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Text size="sm">Nombre</Form.Text>
                    <Form.Control size="sm" type="text" placeholder="Nombre" name="name_place" className="textname" />
                  </Col>
                </Row>
              </Form.Group>
              <Row>
                <Col>
                  <div>Lugar seleccionado: {this.props.BottomButtonsMapProps.markerSelected.text_mark}</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="primary" type="button" size="sm" onClick={(e) => this.submitProjection(e)}>Add</Button>
                </Col>
                <Col>
                  <Button variant="primary" type="button" size="sm" onClick={(e) => this.setProjected(e)}>{(this.state.isProjected) ? 'Reset' : 'Activate'}</Button>
                </Col>
              </Row>

            </Form>
          </Popover>
        }><Button size="sm" variant="success">Proyección</Button>
        </OverlayTrigger>

        <InformationSection InfoProps={InfoProps}/>
      </ButtonGroup>
    )
  }
}

Number.prototype.toRadians = function () { return this * Math.PI / 180; };
Number.prototype.toDegrees = function () { return this * 180 / Math.PI; };

export default BottomButtonsMapFree
