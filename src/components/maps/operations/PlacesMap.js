/* 
Author: Sebastian Mancipe
Date:  July 19 - 2019
Last update: July 19 - 2019
Description: 
This component shows the form with all the places from a specific civilization, tags and 
send the places based in the selected one. 
Is called from MapFull to load the places.
*/
import React, { Component } from "react";
import { Query } from "react-apollo";
import { Dropdown } from "react-bootstrap";
import gql from "graphql-tag";

const CIV_Q = gql`
  query getAllCivilizations {
    getAllCivilizations {
      Id
      Name
    }
  }
`;

const TAG_Q = gql`
  query getTags {
    getTags
  }
`;

const PLAC_CIV_Q = gql`
  query getAllPlacesFromCivilization($Id: Int) {
    getAllPlacesFromCivilization(Id: $Id) {
      Id
      Name
      Description
      Latitude
      Longitude
      Tag
    }
  }
`;

const PLAC_TAG_Q = gql`
  query getAllPlacesByTag($Tag: String) {
    getAllPlacesByTag(Tag: $Tag) {
      Id
      Name
      Description
      Latitude
      Longitude
      Tag
    }
  }
`;

class PlacesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag_selected: "",
      idCiv_selected: "",
    };
  }

  receivedCiv(idCiv_selected) {
    this.setState({ idCiv_selected });
  }

  receivedTag(tag_selected) {
    this.setState({ tag_selected });
  }

  receivedPlaces(places) {
    console.log(places);
    this.props.placesMapProps.renderMarker(places);
    this.setState({ tag_selected: "" });
    this.setState({ idCiv_selected: "" });
  }

  resetPlaces() {
    this.setState({ tag_selected: "" });
  }

  render() {
    let queryTag = (
      <Query
        query={PLAC_TAG_Q}
        variables={{ Tag: this.state.tag_selected }}
        pollInterval={1000}
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          if (data) {
            const placeList = data.getAllPlacesByTag;
            this.receivedPlaces(placeList);
            return <div>Completed</div>;
          }
        }}
      </Query>
    );
    let queryCiv = (
      <Query
        query={PLAC_CIV_Q}
        variables={{ Id: this.state.idCiv_selected }}
        pollInterval={1000}
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          if (data) {
            const placeList = data.getAllPlacesFromCivilization;
            this.receivedPlaces(placeList);
            return <div>Completed</div>;
          }
        }}
      </Query>
    );
    return (
      <section>
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            size="sm"
            disabled={true}
          >
            Civz.
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Query query={CIV_Q} pollInterval={1000}>
              {({ loading, error, data }) => {
                if (loading) return <div>Loading</div>;
                if (error) return <div>Error</div>;
                if (data) {
                  const civList = data.getAllCivilizations;
                  var civResult = civList.map((civ) => (
                    <Dropdown.Item
                      key={civ.Id}
                      onClick={() => {
                        this.receivedCiv(civ.Id);
                      }}
                    >
                      {civ.Id} - {civ.Name}
                    </Dropdown.Item>
                  ));
                  return civResult;
                }
              }}
            </Query>
          </Dropdown.Menu>
        </Dropdown>
        {/*Start tag-dropdown*/}
        <Dropdown id="dropdown_tag">
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            size="sm"
            disabled={true}
          >
            Tags
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Query query={TAG_Q} pollInterval={1000}>
              {({ loading, error, data }) => {
                if (loading) return <div>Loading</div>;
                if (error) return <div>Error</div>;
                if (data) {
                  const tagList = data.getTags;
                  var tagResult = tagList.map((tag, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => {
                        this.receivedTag(tag);
                      }}
                    >
                      {index}: - {tag}
                    </Dropdown.Item>
                  ));
                  return tagResult;
                }
              }}
            </Query>
          </Dropdown.Menu>
        </Dropdown>
        {this.state.tag_selected !== "" && queryTag}
        {this.state.idCiv_selected !== "" && queryCiv}
      </section>
    );
    /*}*/
  }
}
export default PlacesMap;
