import React, {Component} from 'react'
import {Form, Col} from 'react-bootstrap'

const input_style ={
  'marginBottom': '15px'
}

class PlaceInputs extends Component{
  render(){
    return(
      this.props.places.map((val, idx) => {
        let namePlace=`place_name-${idx}`, descriptionPlace = `place_description-${idx}`, latitudePlace =`place_latitude-${idx}`, longitudePlace=`place_longitude-${idx}`, tagPlace=`place_tag-${idx}`
        return(
          <Form.Row style={input_style} key={idx}>
                     <Col>
                       <Form.Text htmlFor={namePlace} className="text-muted">
                         Nombre
                       </Form.Text>
                       <Form.Control placeholder="Nombre" type="text" name={namePlace} data-id={idx} id={namePlace} className="place_name"/>
                     </Col>
                     <Col>
                       <Form.Text htmlFor={descriptionPlace} className="text-muted">
                         Descripción
                       </Form.Text>
                       <Form.Control placeholder="Descripción" type="text" name={descriptionPlace} data-id={idx} className="place_description"/>
                     </Col>
                     <Col>
                       <Form.Text htmlFor={latitudePlace} className="text-muted">
                         Latitud
                       </Form.Text>
                       <Form.Control placeholder="Latitud" type="number" step="0.000001" name={latitudePlace} data-id={idx} className="place_latitude"/>
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
                       <Form.Control placeholder="Etiqueta" type="text" name={tagPlace} data-id={idx} className="place_tag"/>
                     </Col>
          </Form.Row>
        );
      })
    )
  }
}

export default PlaceInputs;
