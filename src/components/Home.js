/* 
Author: Sebastian Mancipe
Date: May 21 - 2019
Last update: July 5 - 2019
Description: 
This component shows the main page. 
Loads BackgroundSlideshow component to change the background based in the images loaded below
*/

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button, DropdownButton, Dropdown, Container } from "react-bootstrap";
import "../styles/main.css";

class MainPage extends Component {
  render() {
    return (
      <div id="backgrnd">
        <Container id="main_container">
          <header id="header">
            <h1>¡Bienvenido a ArqueoMaps!</h1>
            <p>¿Qué deseas hacer?</p>
          </header>

          <Container id="selection_container">
            <NavLink to="/admin" id="admin_button">
              {" "}
              <Button variant="primary" type="button">
                Administrar civilizaciones
              </Button>
            </NavLink>
            <DropdownButton id="map_button" title="Lanzar el mapa">
              <Dropdown.Item href="/mapfree"> Mapa libre </Dropdown.Item>
              <Dropdown.Item href="/map">Mapa</Dropdown.Item>
            </DropdownButton>
          </Container>

          {/*<Container id="footer">
            <ul className="icons">
              <li>
                <a
                  href="https://www.facebook.com/SarosColombia/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fa fa-facebook">Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/sarosastromath/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fa fa-instagram">Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/sarosastromath/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fa fa-google">Email</span>
                </a>
              </li>
            </ul>
            <div id="orientation_message">
              Se recomienda usar una orientación horizontal y/o agrandar la
              pantalla
            </div>
    </Container>*/}
          <div id="warning_test">
            Esta es una versión beta de la aplicación, por lo tanto algunas de
            las características estarán inhabilitadas. <br />
            <br /> <br />
            Te sugerimos leer la documentación del proyecto{" "}
            <a
              rel="noopener noreferrer"
              href="https://github.com/sebmancipe/arqueomaps_app/tree/alpha_version"
              id="hyperlink_text"
              target="_blank"
            >
              aquí
            </a>
            .
          </div>
        </Container>
      </div>
    );
  }
}

export default MainPage;
