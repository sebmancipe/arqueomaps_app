import React, {Component} from 'react'
import {ButtonGroup, Button} from 'react-bootstrap'
import '../styles/map.css'

class BottomButtonsMap extends Component{

  showPolylineStack = (e) =>{
    this.props.BottomButtonsMapProps.generatePolylineStack()
  }

  showPolylineManually = (e) =>{
    this.props.BottomButtonsMapProps.generatePolylineManually()
  }

  render() {
    return(
      <ButtonGroup size="sm" aria-label="Basic example" className="buttonGroupHorizontal">
          <Button variant="secondary" onClick={this.showPolylineStack}>Stack</Button>
          <Button variant="secondary" onClick={this.showPolylineManually} >Manually</Button>
          <Button variant="secondary">Right</Button>
      </ButtonGroup>
    )
  }
}

export default BottomButtonsMap
