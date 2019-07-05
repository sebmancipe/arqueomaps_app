/* 
Author: Sebastian Mancipe
Date: May 21 - 2019
Last update: July 5 - 2019
Description: 
This component shows the main page. 
Loads BackgroundSlideshow component to change the background based in the images loaded below
*/

import React, { Component } from 'react'
import BackgroundSlideshow from 'react-background-slideshow'
import {NavLink} from 'react-router-dom'
import '../styles/main.css'

/*
Images should have at least a resolution of 1280x850
*/
import image1 from '../images/back01.jpg'
import image2 from '../images/back02.jpg'
import image3 from '../images/back03.jpg'


const images= [
  image1,
  image2,
  image3
]

const text_style ={
  color: '#ffffff'
}
class MainPage extends Component {

  render() {
    return (
      <section className="wrapper">
          <div>
          {/*Carousel was getting from https://www.npmjs.com/package/react-background-slideshow*/}
            <BackgroundSlideshow images={images} animationDelay={5000}/>
          </div>

        <div className="content">
          <header id="header">
            <h1>¡Bienvenido a ArqueoMaps!</h1>
            <p style={text_style}>¿Qué deseas hacer?</p>
          </header>

          <form id="signup-form"  action="#">
      				<NavLink to="/admin"> <input type="submit" value="Administrar civilizaciones"/></NavLink>
              <NavLink to="/map"> <input type="submit" value="Lanzar el mapa"/> </NavLink>
      		</form>

          <footer id="footer">
    				<ul className="icons">
             <li><a href="https://www.facebook.com/SarosColombia/" target="_blank" rel="noopener noreferrer" className="icon fa-facebook-f"><span className="label">Twitter</span></a></li>
    					<li><a href="https://www.instagram.com/sarosastromath/" target="_blank" rel="noopener noreferrer" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
    					<li><a href="https://www.instagram.com/sarosastromath/" className="icon fa-envelope-o"><span className="label">Email</span></a></li>
    				</ul>
    				<ul className="copyright">
    					<li>&copy; Untitled.</li><li>Credits: <a href="http://html5up.net">HTML5 UP</a></li>
    				</ul>
    		 </footer>
        </div>
      </section>
    )
  }
}

export default MainPage;
