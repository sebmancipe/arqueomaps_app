import React, {Component} from 'react'

class Place extends Component{
  render() {
    return (
      <div>
        <div>
          {this.props.place.Id}: {this.props.place.Name} {this.props.place.Description} {this.props.place.Latitude} {this.props.place.Longitude} {this.props.place.Tag}
        </div>
      </div>
    )
  }
}

export default Place
