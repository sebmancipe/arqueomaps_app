/* 
Author: Sebastian Mancipe
Date: 
Last update: July 3 - 2019
Description: 
This component is used for the form input of a place according the props input of places.
Contains two main renderings, one for multiples place's inputs and other one to a single input (for Edit section) 
*/
import React, { Component } from 'react'
import { Form, Col } from 'react-bootstrap'

const input_style = {
  'marginBottom': '15px'
}

class PlaceInputs extends Component {
  render() {
    //Check if the props is an Array (to add place in create civilization)...
    if (this.props.places.constructor === Array) {
      return (
        this.props.places.map((val, idx) => {
          let namePlace = `place_name-${idx}`, descriptionPlace = `place_description-${idx}`, latitudePlace = `place_latitude-${idx}`, longitudePlace = `place_longitude-${idx}`, tagPlace = `place_tag-${idx}`
          return (
            <Form.Row style={input_style} key={idx}>
              <Col>
                <Form.Text htmlFor={namePlace} className="text-muted">
                  Nombre
                         </Form.Text>
                <Form.Text htmlFor={namePlace} className="text">
                </Form.Text>
                <Form.Control placeholder="Nombre" type="text" name={namePlace} data-id={idx} id={namePlace} className="place_name" />
              </Col>
              <Col>
                <Form.Text htmlFor={descriptionPlace} className="text-muted">
                  Descripción
                         </Form.Text>
                <Form.Control placeholder="Descripción" type="text" name={descriptionPlace} data-id={idx} className="place_description" />
              </Col>
              <Col>
                <Form.Text htmlFor={latitudePlace} className="text-muted">
                  Latitud
                         </Form.Text>
                <Form.Control placeholder="Latitud" type="number" step="0.000001" name={latitudePlace} data-id={idx} className="place_latitude" />
              </Col>
              <Col>
                <Form.Text htmlFor={longitudePlace} className="text-muted">
                  Longitud
                         </Form.Text>
                <Form.Control placeholder="Longitud" type="number" step="0.000001" name={longitudePlace} data-id={idx} className="place_longitude" />
              </Col>
              <Col>
                <Form.Text className="text-muted" htmlFor={tagPlace}>
                  Etiqueta
                         </Form.Text>
                <Form.Control placeholder="Etiqueta" type="text" name={tagPlace} data-id={idx} className="place_tag" />
              </Col>
            </Form.Row>
          );
        })
      )
    }
    //Else, if is just one element, is used the edit's place method
    else {
      let namePlace = `place_name-${0}`, descriptionPlace = `place_description-${0}`, latitudePlace = `place_latitude-${0}`, longitudePlace = `place_longitude-${0}`, tagPlace = `place_tag-${0}`
      return (
        <Form.Row style={input_style} key={0}>
          <Col>
            <Form.Text htmlFor={namePlace} className="text-muted">
              Nombre
              </Form.Text>
            <Form.Text htmlFor={namePlace} className="text">
            </Form.Text>
            <Form.Control placeholder="Nombre" type="text" name={namePlace} data-id={0} id={namePlace} className="place_name" defaultValue={this.props.places.Name} />
          </Col>
          <Col>
            <Form.Text htmlFor={descriptionPlace} className="text-muted">
              Descripción
                       </Form.Text>
            <Form.Control placeholder="Descripción" type="text" name={descriptionPlace} data-id={0} className="place_description" defaultValue={this.props.places.Description} />
          </Col>
          <Col>
            <Form.Text htmlFor={latitudePlace} className="text-muted">
              Latitud
                       </Form.Text>
            <Form.Control placeholder="Latitud" type="number" step="0.000001" name={latitudePlace} data-id={0} className="place_latitude" defaultValue={this.props.places.Latitude} />
          </Col>
          <Col>
            <Form.Text htmlFor={longitudePlace} className="text-muted">
              Longitud
                       </Form.Text>
            <Form.Control placeholder="Longitud" type="number" step="0.000001" name={longitudePlace} data-id={0} className="place_longitude" defaultValue={this.props.places.Longitude}/>
          </Col>
          <Col>
            <Form.Text className="text-muted" htmlFor={tagPlace}>
              Etiqueta
                       </Form.Text>
            <Form.Control placeholder="Etiqueta" type="text" name={tagPlace} data-id={0} className="place_tag" defaultValue={this.props.places.Tag} />
          </Col>
        </Form.Row>
      )
    }
  }
}

export default PlaceInputs;
