/* 
  Author: Sebastian Mancipe
  Date: May 23 - 2019
  Last update: July 5 - 2019
  Description: 
  This component loads the main page of the civilizations administration
  IMPORTANT: All the related components from this has the bug of the cut-off page  
*/
  import React, { Component } from 'react'
  import { Button, ButtonToolbar, Container} from 'react-bootstrap'
  import {NavLink} from 'react-router-dom'
  import '../../styles/main.css'

  const admin_buttons_style ={
    margin: '5px'
  }

  class AdministrationView extends Component{
    
    render(){
      return(
        <div>
        <div className="box-gallery" id="background_div"></div>
        <Container id="main_container">
          <header id="header" >
            <h1>Administra las civilizaciones</h1>
            <p>Selecciona alguna de las siguientes opciones</p>
          </header>

        <ButtonToolbar>
            <NavLink to="/add"><Button variant="primary" style={admin_buttons_style}>Crear</Button></NavLink>
            <NavLink to="/edit"><Button variant="primary" style={admin_buttons_style}>Editar</Button></NavLink>
            <NavLink to="/view"><Button variant="primary" style={admin_buttons_style}>Ver</Button></NavLink>
        </ButtonToolbar>
        </Container>
        </div>
      );
    }
  }
  export default AdministrationView;
