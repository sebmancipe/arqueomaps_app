import React, { Component } from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

const text_style ={
  color: '#000000'
}

const admin_buttons_style ={
  margin: '5px'
}

const input_style ={
  'marginBottom': '15px'
}



class Form_Add extends Component{
  state ={
    places: [{name:"",description:"",latitude:"",longitude:"",tag:""}],
  }

  addLocation = (e) => {
    this.setState((prevState) => ({
      places: [...prevState.places, {name:"", description:"", latitude:"",longitude:"",tag:""}],
    }));
  }

handleSubmit = (e) => { e.preventDefault() }
  render(){
    let {places} = this.state
    return(
      <div className="content">
        <header id="header" >
          <h1 style={text_style}>Agrega civilizaciones</h1>
          <p>Ingresa los campos y agrega lugares a la civilización que estás por crear</p>
        </header>
        <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nombre de la civilización</Form.Label>
              <Form.Control type="text" placeholder="Nombre" />
              <Form.Text className="text-muted">
                Esta información no podrá ser cambiada.
              </Form.Text>
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" placeholder="Descripción" />
              <Form.Text className="text-muted">
                Esta información no podrá ser cambiada.
              </Form.Text>
          </Form.Group>
          <h4 style={text_style}>Lugares</h4>
        <Button style={admin_buttons_style} variant="secondary" type="button" onClick={this.addLocation}>
          Agregar más lugares
        </Button>
        {
          places.map((val, idx) => {
            let namePlace = {idx}, descriptionPlace = {idx}, latitudePlace ={idx}, longitudePlace={idx}, tagPlace={idx}
            return(
              <Row style={input_style} key={idx}>
                         <Col>
                           <label htmlFor={namePlace}><Form.Text className="text-muted">
                             Nombre
                           </Form.Text></label>
                           <Form.Control placeholder="Nombre" />
                         </Col>
                         <Col>
                           <label htmlFor={descriptionPlace}><Form.Text className="text-muted">
                             Descripción
                           </Form.Text></label>
                           <Form.Control placeholder="Descripción" />
                         </Col>
                         <Col>
                           <label htmlFor={latitudePlace}><Form.Text className="text-muted">
                             Latitud
                           </Form.Text></label>
                           <Form.Control placeholder="Latitud" />
                         </Col>
                         <Col>
                           <label htmlFor={longitudePlace}><Form.Text className="text-muted">
                             Longitud
                           </Form.Text></label>
                           <Form.Control placeholder="Longitud" />
                         </Col>
                         <Col>
                           <label htmlFor={tagPlace}><Form.Text className="text-muted">
                             Etiqueta
                           </Form.Text></label>
                           <Form.Control placeholder="Etiqueta" />
                         </Col>
              </Row>
            );
          })
        }
        <Button variant="primary" style={admin_buttons_style} type="submit">
          Guardar
        </Button>
      </Form>
    </div>
    );
}
}

export default Form_Add;
//Biblio: https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
