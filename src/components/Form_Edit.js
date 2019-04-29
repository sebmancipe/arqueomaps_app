import React, { Component } from 'react'
import { Button, ButtonToolbar, Dropdown, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

const text_style ={
  color: '#000000'
}

const buttons_style ={
  margin: '15px'
}

const margin_style ={
  'margin-bottom': '15px'
}

class Form_Edit extends Component{
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
          <h1 style={text_style}>Edita civilizaciones</h1>
          <p>Selecciona la civilización y edita sus lugares</p>
        </header>

        <Dropdown style={margin_style}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Selecciona para ver las civilizaciones disponibles
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Chibchas</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Muiscas</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Motilones</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <ListGroup style={margin_style}>
          <ListGroup.Item>Place 1
            <ButtonToolbar>
              <Button style={buttons_style} variant="primary">Editar</Button>
              <Button style={buttons_style} variant="secondary">Eliminar</Button>
            </ButtonToolbar>
          </ListGroup.Item>
          <ListGroup.Item>Place 2
            <ButtonToolbar>
              <Button style={buttons_style} variant="primary">Editar</Button>
              <Button style={buttons_style} variant="secondary">Eliminar</Button>
            </ButtonToolbar>
          </ListGroup.Item>
          <ListGroup.Item>Place 3
            <ButtonToolbar>
              <Button style={buttons_style} variant="primary">Editar</Button>
              <Button style={buttons_style} variant="secondary">Eliminar</Button>
            </ButtonToolbar>
          </ListGroup.Item>

        </ListGroup>

    </div>
    );
}
}

export default Form_Edit;
