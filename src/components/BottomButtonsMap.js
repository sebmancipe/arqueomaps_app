import React, {Component} from 'react'
import {ButtonGroup, Button} from 'react-bootstrap'

class BottomButtonsMap extends Component{
  render() {
    return(
      <ButtonGroup size="sm" aria-label="Basic example">
          <Button variant="secondary">Left</Button>
          <Button variant="secondary">Middle</Button>
          <Button variant="secondary">Right</Button>
      </ButtonGroup>
    )
  }
}

export default BottomButtonsMap
