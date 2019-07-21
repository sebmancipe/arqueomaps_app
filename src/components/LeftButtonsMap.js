/* 
Author: Sebastian Mancipe
Date: 
Last update: July 18 - 2019
Description: 
This component contains the main form to the left buttons menu to add a place an a figure.
Also creates the Edges of the figure.
Uses children components as CreateFigureMap and CreatePlaceMap.
*/

import React, { Component } from 'react'
import { ButtonGroup } from 'react-bootstrap'
import CreateFigureMap from "./CreateFigureMap"
import PlacesMap from "./PlacesMap"
import { Mutation } from 'react-apollo'
import EdgeMutation from "./EdgeMutation"
import { gql } from "apollo-boost"

const EDGE_CREATE = gql`
  mutation setEdge($Id_figure: Int!, $Id_placeFrom: Int!, $Id_placeTo: Int!, $Dist: String!) {
    setEdge(Id_figure:$Id_figure,Id_placeFrom:$Id_placeFrom,Id_placeTo:$Id_placeTo, Dist:$Dist)
  }
`

class LeftButoonsMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_figure: ''
        }
    }
    //Sets the id_figure to '' or undefined when is reseted the map
    componentWillReceiveProps(nextProps) {
        this.setState({ id_figure: nextProps.id_figure })
    }

    renderMarker(places) {
        this.props.LeftButtonsMapProps.addMarker(places)
    }

    receivedFigure(Id) {
        this.setState({ id_figure: Id })
    }

    render() {
        const edgesFigure = this.props.LeftButtonsMapProps.edgesFigure
        const createFigureMapProps = {
            receivedFigure: this.receivedFigure.bind(this)
        }

        const placesMapProps = {
            renderMarker: this.renderMarker.bind(this)
        }

        //Check if the figure has already been created (with the id) and if the length of the array is enought to create edges
        //Figures with only two edges wont be able to be saved
        if (edgesFigure.length > 3 && this.state.id_figure !== undefined && typeof this.state.id_figure !== 'undefined') {
            //edgesArray contains the structure of and edge: id_figure, id_placeFrom, id_placeTo, dist
            const edgesArray = []
            //If the figure is Many2One, the edge has a different structure than Stack or Manually (distances primarily)
            if (edgesFigure.typeJoin === 'Many2One') {
                let i, j
                for (i = 0, j = 0; i < edgesFigure.length - 1; i = i + 2, j++) {
                    let temp = {};
                    temp.Id_figure = this.state.id_figure
                    temp.Id_placeFrom = edgesFigure[i].id
                    temp.Id_placeTo = edgesFigure[i + 1].id
                    temp.Dist = edgesFigure[i + 1].dist
                    edgesArray[j] = temp
                }
            } else {
                //Else, a normal structure
                let i
                for (i = 0; i < edgesFigure.length - 1; i++) {
                    let temp = {};
                    temp.Id_figure = this.state.id_figure
                    temp.Id_placeFrom = edgesFigure[i].id
                    temp.Id_placeTo = edgesFigure[i + 1].id
                    temp.Dist = edgesFigure[i + 1].dist
                    edgesArray[i] = temp
                }
            }

            //Mutation loaded in a var to allow return the left menu
            var mutations = edgesArray.map((edge, index) => {
                return (
                    <Mutation key={index} mutation={EDGE_CREATE}
                        variables={{
                            Id_figure: edge.Id_figure,
                            Id_placeFrom: edge.Id_placeFrom,
                            Id_placeTo: edge.Id_placeTo,
                            Dist: edge.Dist
                        }}>
                        {(submitEdge, { data, error }) => (
                            <EdgeMutation mutate={submitEdge} />
                        )}
                    </Mutation>
                )
            });
            //Execution of the mutations with the left menu
            return (
                <ButtonGroup vertical className="buttonGroupVerticalFull">
                    {mutations}
                    <PlacesMap placesMapProps={placesMapProps}/>
                    <CreateFigureMap createFigureMapProps={createFigureMapProps} />
                </ButtonGroup>
            )
        }
        else //If the condition is not satisfied, return the left menu  
            return (
                <ButtonGroup vertical className="buttonGroupVerticalFull">
                    <PlacesMap placesMapProps={placesMapProps}/>
                    <CreateFigureMap createFigureMapProps={createFigureMapProps} />
                </ButtonGroup>
            )
    }
}
export default LeftButoonsMap
