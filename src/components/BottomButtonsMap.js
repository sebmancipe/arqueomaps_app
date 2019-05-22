import React, {Component} from 'react'
import {ButtonGroup, Button} from 'react-bootstrap'
import '../styles/map.css'

class BottomButtonsMap extends Component{
  render() {
    return(
      <ButtonGroup size="sm" aria-label="Basic example" className="buttonGroupHorizontal">
          <Button variant="secondary">Left</Button>
          <Button variant="secondary">Middle</Button>
          <Button variant="secondary">Right</Button>
      </ButtonGroup>
    )
  }
}

export default BottomButtonsMap
