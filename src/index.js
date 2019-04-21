import React from 'react'
import ReactDOM from 'react-dom'
import BackgroundSlideshow from 'react-background-slideshow'
import './styles/index.css'

/*
Images should have at least a resolution of 1280x850 
*/
import image1 from './images/back01.jpg'
import image2 from './images/back02.jpg'
import image3 from './images/back03.jpg'

const images= [
  image1,
  image2,
  image3
]

class Title extends React.Component {
  render() {
    return (
      <header id="header">
				<h1>¡Bienvenido a ArqueoMaps!</h1>
				<p>¿Qué deseas hacer?</p>
			</header>
    )
  }
}

class Buttons extends React.Component {
  render(){
    return (
      <form id="signup-form"  action="#">
  				<input type="submit" value="Administrar civilizaciones" onclick="location.href='pages/civilizations.jsp';"/>
          <input type="submit" value="Lanzar el mapa" onclick="location.href='pages/map.jsp';"/>
  			</form>
    )
  }
}

class Footer extends React.Component {
  render(){
    return (
      <footer id="footer">
				<ul class="icons">
         <li><a href="https://www.facebook.com/SarosColombia/" target="_blank" rel="noopener noreferrer" class="icon fa-facebook-f"><span class="label">Twitter</span></a></li>
					<li><a href="https://www.instagram.com/sarosastromath/" target="_blank" rel="noopener noreferrer" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
					<li><a href="https://www.instagram.com/sarosastromath/" class="icon fa-envelope-o"><span class="label">Email</span></a></li>
				</ul>
				<ul class="copyright">
					<li>&copy; Untitled.</li><li>Credits: <a href="http://html5up.net">HTML5 UP</a></li>
				</ul>
			</footer>
    )
  }
}


/*
Carousel was getting from https://www.npmjs.com/package/react-background-slideshow
*/
export default class Carousel extends React.Component {
  render () {
    return (
      <div>
        <BackgroundSlideshow images={images} animationDelay={5000}/>
      </div>
    )
  }
}

ReactDOM.render(<Carousel />,document.getElementById('background_component'))
ReactDOM.render(<Title />, document.getElementById('header_component'))
ReactDOM.render(<Buttons />, document.getElementById('buttons'))
ReactDOM.render(<Footer />, document.getElementById('footer_component'))
