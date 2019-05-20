  import React, {Component} from 'react'

  class Civilization extends Component{
    render() {
      return (
        <div>
          <div>
            {this.props.civilization.Id}: {this.props.civilization.Name} {(this.props.civilization.Description)? ' - '+this.props.civilization.Description:''}
          </div>
        </div>
      )
    }
  }

  export default Civilization
