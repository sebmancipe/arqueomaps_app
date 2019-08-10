/* 
Author: Sebastian Mancipe
Date: July 18 - 2019
Last update: July 18 - 2019
Description: 
This component contains the form and methods to add a Figure (it also sends it to server).
Sends the information to its parent, LeftButtonMap.
*/
import React from 'react'
import { OverlayTrigger, Button, Form, Popover, Alert, Row, Col} from 'react-bootstrap'
import { Mutation } from "react-apollo"
import { gql } from "apollo-boost"

const FIG_CREATE = gql`
  mutation newFigure($Name: String!, $Description: String!, $Author: String!, $CreationDate:String!){
    newFigure(Name:$Name, Description:$Description, Author:$Author, CreationDate:$CreationDate){
      Id
    }
  }
  `

class CreateFigureMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            figure: {
                id_figure: '', name_figure: '', description_figure: '', area_figure: '', author_figure: '', date_figure: ''
            }
        }
    }

    //Catchs the mount of the component to set the date of the figure
    //This can be acquired in any other moment
    componentDidMount() {
        var date = new Date()
        var formattedDate = date.getDate() + " - " + (date.getMonth() + 1) + " - " + date.getFullYear()
        let figure = this.state.figure
        figure['date_figure'] = formattedDate
        this.setState({ figure })
    }

    //Handles the changes in the figure's form 
    changeFigure = (e) => {
        let figure = this.state.figure
        figure[e.target.name] = e.target.value
        this.setState({ figure })
    }

    //Handles the mutation's response and sends it to the parent
    receivedFigure(Id) {
        this.props.createFigureMapProps.receivedFigure(
            Id
        )
    }

    render() {
        return (
            <OverlayTrigger trigger="click" placement="right" overlay={
                <Popover id="popover-basic" title="Describe la figura a guardar" className="figureForm">
                    <Form onChange={this.changeFigure}>
                        <Form.Group controlId="form" >
                            <Row>
                                <Col>
                                    <Form.Text size="sm">Nombre</Form.Text>
                                    <Form.Control size="sm" type="text" placeholder="Nombre" name="name_figure" className="textname" />
                                    <Form.Text size="sm">Descripción</Form.Text>
                                    <Form.Control size="sm" type="text" placeholder="Descripción" name="description_figure" className="textdescription" />
                                </Col>
                                <Col>
                                    <Form.Text size="sm">Autor</Form.Text>
                                    <Form.Control size="sm" type="text" placeholder="Autor" name="author_figure" className="textauthor" />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>

                    <Mutation mutation={FIG_CREATE}
                        variables={{
                            Name: this.state.figure.name_figure,
                            Description: this.state.figure.description_figure,
                            Author: this.state.figure.author_figure,
                            CreationDate: this.state.figure.date_figure
                        }}
                        update={(cache, { data: { newFigure } }) => {
                            this.receivedFigure(newFigure.Id)
                        }}>

                        {(submitFigure, { error }) => (
                            <div>
                                <Button variant="primary" onClick={submitFigure}>
                                    Save
                                </Button>
                                {error && <Alert variant='danger'>
                                    Ha ocurrido un error...
                                </Alert>}
                            </div>
                        )}
                    </Mutation>

                </Popover>

            }><Button variant="success">Save</Button>
            </OverlayTrigger>
        );
    };

}
export default CreateFigureMap;