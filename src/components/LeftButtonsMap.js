import React, {Component} from 'react'
import {ButtonGroup, OverlayTrigger, Button, Form, Popover,Alert} from 'react-bootstrap'
import {Mutation} from "react-apollo"
import {gql} from "apollo-boost"
import EdgeMutation from "./EdgeMutation"
import '../styles/map.css'



const FIG_CREATE = gql`
  mutation newFigure($Name: String!, $Description: String!, $Author: String!, $CreationDate:String!){
    newFigure(Name:$Name, Description:$Description, Author:$Author, CreationDate:$CreationDate){
      Id
    }
  }
  `
const PLAC_CREATE = gql`
  mutation newPlace($Name: String!, $Latitude: String!, $Longitude: String!) {
    newPlace(Name:$Name,Latitude:$Latitude,Longitude:$Longitude) {
      Id
    }
  }
`

const EDGE_CREATE = gql`
  mutation setEdge($Id_figure: Int!, $Id_placeFrom: Int!, $Id_placeTo: Int!, $Dist: String!) {
    setEdge(Id_figure:$Id_figure,Id_placeFrom:$Id_placeFrom,Id_placeTo:$Id_placeTo, Dist:$Dist)
  }
`

class LeftButtonsMap extends Component{
  constructor(props){
    super(props);
    this.state ={
      figure:{
        id_figure:'',name_figure:'',description_figure:'',area_figure:'',author_figure:'',date_figure:''
      },
      place:{
        id_place:'', name_place:'',lat_place:'',lng_place:''
      }
    }
  }

  componentDidMount(){
    var date = new Date()
    var formattedDate = date.getDate()+" - "+(date.getMonth()+1)+" - "+date.getFullYear()
    let figure = this.state.figure
    figure['date_figure']=formattedDate
    this.setState({figure})
  }

  renderMarker(){
    this.props.LeftButtonsMapProps.addMarker(
      this.state.place.id_place,
      this.state.place.lat_place,
      this.state.place.lng_place,
      this.state.place.name_place)
  }

  changeFigure = (e) =>{
    let figure = this.state.figure
    figure[e.target.name]=e.target.value
    this.setState({figure})
  }

  changePlace = (e) =>{
    let place = this.state.place
    place[e.target.name] = e.target.value
    this.setState({place})
  }

  receivedFigure(Id){
    let figure = this.state.figure
    figure['id_figure']=Id
    this.setState({figure})
  }

  receivedPlace(Id){
    console.log(Id)
    let place = this.state.place
    place['id_place']=Id
    this.setState({place})
    this.renderMarker()
  }
  
  
  render() {
  const edgesFigure = this.props.LeftButtonsMapProps.edgesFigure
   if(edgesFigure[0]['id']!=='' && this.state.figure.id_figure!=='') {
     return edgesFigure.map((edge,index,array) => {
      if(index<(array.length-1)){
        return (
          <Mutation key={index} mutation={EDGE_CREATE}
          variables={{Id_figure:this.state.figure.id_figure,
                      Id_placeFrom: edge.id,
                      Id_placeTo: array[index+1].id,
                      Dist:0}
          }>
          {(submitEdge , {data,error}) => (
            <EdgeMutation mutate={submitEdge}/>
          )}
          </Mutation>
        )
      }
      else return null
     })
    }
    else
    return(
      <ButtonGroup vertical className="buttonGroupVertical">
        <OverlayTrigger trigger="click" placement="right" overlay={
          <Popover id="popover-basic" title="Agrega una nueva ubicación" className="markersForm">
            <Form onChange={this.changePlace}>
            <Form.Group controlId="form" >
              <Form.Label>Latitud</Form.Label>
              <Form.Control size="sm" type="number" step="0.0000000001" placeholder="Latitud" name="lat_place" className="latitude"/>
              <Form.Label size="sm">Longitud</Form.Label>
              <Form.Control size="sm" type="number" step="0.0000000001" placeholder="Longitud" name="lng_place" className="longitude"/>
              <Form.Label size="sm">Nombre</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Nombre" name="name_place" className="textname" />
            </Form.Group>
            {/*<Button variant="primary" type="submit" /*onClick={submitPlace}*//*>
              Add
            </Button>*/}
            <Mutation mutation={PLAC_CREATE}
          variables={{Name: this.state.place.name_place, 
                      Latitude: this.state.place.lat_place,
                      Longitude: this.state.place.lng_place}}
          update={(cache,{data: { newPlace } }) => {
                    this.receivedPlace(newPlace.Id)
                  }}>
          {(submitPlace , {error}) => (
            <div>
            <Button variant="primary" type="button" onClick={submitPlace}>
              Add
            </Button>
            {error && 
                <Alert variant='danger'>
                Ha ocurrido un error...
            </Alert>} 
            </div>
          )}
          </Mutation>
          </Form> 
          
        </Popover>

        }><Button variant="success">Add</Button>
        </OverlayTrigger>

        {/* Save figure */}
          <OverlayTrigger trigger="click" placement="right" overlay={
          <Popover id="popover-basic" title="Describe la figura a guardar" className="figureForm">
            <Form onChange={this.changeFigure}>
            <Form.Group controlId="form" >
              <Form.Label>Nombre</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Nombre" name="name_figure" className="textname"/>
              <Form.Label size="sm">Descripción</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Descripción" name="description_figure" className="textdescription"/>
              <Form.Label size="sm">Autor</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Autor" name="author_figure" className="textauthor" />
            </Form.Group>
          </Form>

          <Mutation mutation={FIG_CREATE}
          variables={{Name: this.state.figure.name_figure, 
                      Description: this.state.figure.description_figure,
                      Author: this.state.figure.author_figure,
                      CreationDate: this.state.figure.date_figure}}
          update={(cache,{data: { newFigure } }) => {
                    this.receivedFigure(newFigure.Id)
                  }}>
          
          {(submitFigure , {error}) => (
            <div>
            <Button variant="primary" onClick={submitFigure}>
              Save
            </Button>
            {error && 
                <Alert variant='danger'>
                Ha ocurrido un error...
            </Alert>} 
            </div>
          )}
          </Mutation>

        </Popover>

        }><Button variant="success">Save</Button>
        </OverlayTrigger>
        
        <OverlayTrigger trigger="click" placement="right" >
          <Button variant="success">See</Button>
        </OverlayTrigger>
      </ButtonGroup>
    )
  }

}
export default LeftButtonsMap
