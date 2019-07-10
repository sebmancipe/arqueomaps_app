import React, {Component} from 'react'
import {ButtonGroup, Button} from 'react-bootstrap'
import '../styles/map.css'

class BottomButtonsMap extends Component{

  showPolyline = (e) =>{
    this.props.BottomButtonsMapProps.generatePolyline()
  }

  render() {
    return(
      <ButtonGroup size="sm" aria-label="Basic example" className="buttonGroupHorizontal">
          <Button variant="secondary" onClick={this.showPolyline}>Poly</Button>
          <Button variant="secondary">Middle</Button>
          <Button variant="secondary">Right</Button>
      </ButtonGroup>
    )
  }
}

export default BottomButtonsMap
