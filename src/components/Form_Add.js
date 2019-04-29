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
  'margin-bottom': '15px'
}
class Form_Add extends Component{
  constructor (){
    super();
    this.state ={
      name: '',
      description: '',
      places: []
    };
  }
  render(){
    return(
      <div class="content">
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
          <Row style={input_style}>
             <Col>
               <Form.Text className="text-muted">
                 Nombre
               </Form.Text>
               <Form.Control placeholder="Nombre" />
             </Col>
             <Col>
               <Form.Text className="text-muted">
                 Descripción
               </Form.Text>
               <Form.Control placeholder="Descripción" />
             </Col>
             <Col>
               <Form.Text className="text-muted">
                 Latitud
               </Form.Text>
               <Form.Control placeholder="Latitud" />
             </Col>
             <Col>
               <Form.Text className="text-muted">
                 Longitud
               </Form.Text>
               <Form.Control placeholder="Longitud" />
             </Col>
             <Col>
               <Form.Text className="text-muted">
                 Etiqueta
               </Form.Text>
               <Form.Control placeholder="Etiqueta" />
             </Col>
           </Row>

        <Button style={admin_buttons_style} variant="secondary" type="submit">
          Agregar más lugares
        </Button>
        <Button variant="primary" style={admin_buttons_style} type="submit">
          Guardar
        </Button>
      </Form>
    </div>
    );
}
}

export default Form_Add;
