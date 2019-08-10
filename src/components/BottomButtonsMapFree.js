/* 
Author: Sebastian Mancipe
Date: 
Last update: August 10 - 2019
Description: 
This component contains the bottom section of buttons that reset, shows or allow the creation of 
polylines based in the user input.
*/

import React, { Component } from 'react'
import { ButtonGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap'



class BottomButtonsMapFree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showManually: false,
      showMany2One: false
    }
    this.resetPolylines = this.resetPolylines.bind(this)
  }

  showPolylineStack = (e) => {
    this.props.BottomButtonsMapProps.generatePolylineStack()
  }

  showPolylineManually = (e, isReset) => {
    this.props.BottomButtonsMapProps.generatePolylineManually(isReset)
    if(isReset) this.setState({ showManually:false })
    else this.setState({ showManually: (this.state.showManually) ? false : true })
  }

  showPolylineMany2One = (e, isReset) => {
    this.props.BottomButtonsMapProps.generatePolylineMany2One(isReset)
    if(isReset) this.setState({ showMany2One:false })
    else this.setState({ showMany2One: (this.state.showMany2One) ? false : true })
  }

  setAngles = (e) =>{
    this.props.BottomButtonsMapProps.setAngles(false)
  }

  resetPolylines() {
    this.setState({ showManually: false })
    this.setState({ showMany2One: false })
    this.props.BottomButtonsMapProps.resetPolylines()
  }

  render() {
    return (
      <ButtonGroup size="sm" aria-label="Basic example" className="buttonGroupHorizontal">
        <Button size="sm" variant="secondary" onClick={this.resetPolylines}>Reset</Button>
        <Button size="sm" variant="secondary" onClick={this.showPolylineStack}>Stack</Button>
        <DropdownButton id="dropdown-basic-button" title="Manually" size="sm">
          <Dropdown.Item onClick={(e) => this.showPolylineManually(e, false)}>{(this.state.showManually) ? 'Deactivate' : 'Activate'}</Dropdown.Item>
          <Dropdown.Item onClick={(e) => this.showPolylineManually(e, true)}>Reset</Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Many2One" size="sm">
          <Dropdown.Item onClick={(e) => this.showPolylineMany2One(e, false)}>{(this.state.showMany2One) ? 'Deactivate' : 'Activate'}</Dropdown.Item>
          <Dropdown.Item onClick={(e) => this.showPolylineMany2One(e, true)}>Reset</Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Angles" size="sm">
          <Dropdown.Item onClick={this.setAngles}>{(this.props.BottomButtonsMapProps.getAngle) ? 'Deactivate' : 'Activate'}</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    )
  }
}

export default BottomButtonsMapFree
