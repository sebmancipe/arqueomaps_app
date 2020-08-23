/* 
Author: Sebastian Mancipe
Date: July 18 - 2019
Last update: July 19 - 2019
Description: 
This component contains the form and methods to add a Marker/Place (it also sends to server).
Sends the information to its parent LeftButtonMap to render de marker.
*/
import React from "react";
import {
  OverlayTrigger,
  Button,
  Form,
  Popover,
  Alert,
  Col,
  Row,
} from "react-bootstrap";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const PLAC_CREATE = gql`
  mutation newPlace(
    $Name: String!
    $Latitude: String!
    $Longitude: String!
    $Tag: String
  ) {
    newPlace(
      Name: $Name
      Latitude: $Latitude
      Longitude: $Longitude
      Tag: $Tag
    ) {
      Id
    }
  }
`;

class CreatePlaceMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: {
        name_place: "",
        lat_place: "",
        lng_place: "",
        tag_place: "",
      },
    };
  }

  //Handles the change in the form of place
  changePlace = (e) => {
    let place = this.state.place;
    place[e.target.name] = e.target.value;
    this.setState({ place });
  };

  //Handles the response and sends the info the parent
  receivedPlace(Id) {
    this.props.createPlaceMapProps.receivedPlace(
      Id,
      this.state.place.lat_place,
      this.state.place.lng_place,
      this.state.place.name_place,
      this.state.place.tag_place
    );
  }

  render() {
    return (
      <OverlayTrigger
        trigger="click"
        placement="right"
        overlay={
          <Popover
            id="popover-basic"
            title="Agrega una nueva ubicación"
            className="markersForm"
          >
            <Form onChange={this.changePlace}>
              <Form.Group controlId="form">
                <Row>
                  <Col>
                    <Form.Text size="sm">Latitud</Form.Text>
                    <Form.Control
                      size="sm"
                      type="number"
                      step="0.0000000001"
                      placeholder="Latitud"
                      name="lat_place"
                      className="latitude"
                    />
                  </Col>
                  <Col>
                    <Form.Text size="sm">Longitud</Form.Text>
                    <Form.Control
                      size="sm"
                      type="number"
                      step="0.0000000001"
                      placeholder="Longitud"
                      name="lng_place"
                      className="longitude"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Text size="sm">Nombre</Form.Text>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Nombre"
                      name="name_place"
                      className="textname"
                    />
                  </Col>
                  <Col>
                    <Form.Text size="sm">Tag</Form.Text>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Tag"
                      name="tag_place"
                      className="tagname"
                    />
                  </Col>
                </Row>
              </Form.Group>
              {/*TODO: May use PlacesAdd component*/}
              <Mutation
                mutation={PLAC_CREATE}
                variables={{
                  Name: this.state.place.name_place,
                  Latitude: this.state.place.lat_place,
                  Longitude: this.state.place.lng_place,
                  Tag: this.state.place.tag_place,
                }}
                update={(cache, { data: { newPlace } }) => {
                  this.receivedPlace(newPlace.Id);
                }}
              >
                {(submitPlace, { error }) => (
                  <div>
                    <Button
                      variant="primary"
                      type="button"
                      onClick={submitPlace}
                      disabled={true}
                    >
                      Add
                    </Button>
                    {error && (
                      <Alert variant="danger">Ha ocurrido un error...</Alert>
                    )}
                  </div>
                )}
              </Mutation>
            </Form>
          </Popover>
        }
      >
        <Button size="sm" variant="success">
          Add
        </Button>
      </OverlayTrigger>
    );
  }
}
export default CreatePlaceMap;
