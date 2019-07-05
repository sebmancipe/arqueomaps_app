/* 
  Author: Sebastian Mancipe
  Date: May 23 - 2019
  Last update: July 5 - 2019
  Description: 
  This component loads the main page of the civilizations administration
  IMPORTANT: All the related components from this has the bug of the cut-off page  
*/
  import React, { Component } from 'react'
  import { Button, ButtonToolbar} from 'react-bootstrap'
  import {NavLink} from 'react-router-dom'
  import '../styles/main.css'

  const admin_buttons_style ={
    margin: '5px'
  }
  const text_style ={
    color: '#000000'
  }

  class AdministrationView extends Component{
    
    render(){
      return(
        <div className="content">
          <header id="header" >
            <h1 style={text_style}>Administra las civilizaciones</h1>
            <p>Selecciona alguna de las siguientes opciones</p>
          </header>

        <ButtonToolbar>
            <NavLink to="/add"><Button variant="primary" style={admin_buttons_style}>Crear</Button></NavLink>
            <NavLink to="/edit"><Button variant="primary" style={admin_buttons_style}>Editar</Button></NavLink>
            <NavLink to="/view"><Button variant="primary" style={admin_buttons_style}>Ver</Button></NavLink>
        </ButtonToolbar>
        </div>
      );
    }
  }
  export default AdministrationView;
