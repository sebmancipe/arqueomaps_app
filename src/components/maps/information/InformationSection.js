/* 
Author: Sebastian Mancipe
Date: August 25 - 2019
Last update: August 25 - 2019
Description: 
This component shows a table with distances and angles obtained in the map
*/
import React, { Component } from 'react'
import { OverlayTrigger, Popover, Table, Button } from 'react-bootstrap'

class InformationSection extends Component {
    constructor(props) {
        super();
        this.state = {

        }
    }


    render() {
        const distanceInfo = this.props.InfoProps.distanceInfo
        const anglesInfo= this.props.InfoProps.anglesInfo, angle = this.props.InfoProps.angle

        const edgesArray = []
        if(distanceInfo[0].id!=='' && distanceInfo.length>2){
            if(distanceInfo.typeJoin==='Many2One'){
                let i,j
                for (i = 0, j = 0; i < distanceInfo.length - 1; i = i + 2, j++) {
                    let temp = {};
                    temp.placeFrom = distanceInfo[i].name
                    temp.placeTo = distanceInfo[i + 1].name
                    temp.Dist = distanceInfo[i + 1].dist
                    edgesArray[j] = temp
                }
            }else{
                 //Else, a normal structure
                 let i
                 for (i = 0; i < distanceInfo.length - 1; i++) {
                     let temp = {};
                     temp.placeFrom = distanceInfo[i].name
                     temp.placeTo = distanceInfo[i + 1].name
                     temp.Dist = distanceInfo[i + 1].dist
                     edgesArray[i] = temp
                 }
            }
        }

        return (
            <OverlayTrigger className="" trigger="click" placement="top" overlay={
                <Popover id="popover-basic" title="Añade una proyección" >
                    <Table responsive variant="dark">
                    <thead>
                        <tr>
                            <th>Origin</th>
                            <th>Destiny</th>
                            <th>Distance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {edgesArray.map(((edge , index)=> {
                            return(
                                <tr key={index}>
                                    <td>{edge.placeFrom}</td>
                                    <td>{edge.placeTo}</td>
                                    <td>{edge.Dist}</td>
                                </tr>
                            )
                        }))}
                    </tbody>
                    
                </Table>

                <Table responsive variant="dark">
                <thead>
                        <tr>
                            <th>Origin</th>
                            <th>Middle</th>
                            <th>Final</th>
                            <th>Angle</th>
                        </tr>
                    </thead>
                    <tbody>
                    {angle!=='' && 
                        <tr>
                            <td>{anglesInfo[0].name}</td>
                            <td>{anglesInfo[1].name}</td>
                            <td>{anglesInfo[2].name}</td>
                            <td>{angle}</td>
                        </tr>
                    }
                    </tbody>
                </Table>
            
                </Popover>
            }><Button variant="success">Info</Button>
            </OverlayTrigger>
        )
    }
}
export default InformationSection