import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'


const FIG_QUERY = gql`
{
  getAllFigures {
    Id
    Name
    Author
    CreationDate
  }
}
`
const EDGE_QUERY = gql`
query getEdgesFromFigure($Id_figure:Int!)
{
  getEdgesFromFigure(Id_figure:$Id_figure){
    Id
    PlaceFrom{
      Id
      Name
      Latitude
      Longitude
    }
    PlaceTo{
      Id
      Name
      Latitude
      Longitude
    }
    Dist
  }
}
`
class FiguresList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchComplete: false,
            figure: {Id:'',Name:'',Author:'',CreationDate:''}
        }
    }

    onClickFigure(figure) {
        this.setState({figure})
    }

    responseEdges(edges) {
        this.props.FiguresListProps.updateEdges(edges)
    }

    finishQuery(){
        this.setState({figure:{Id:'',Name:'',Author:'',CreationDate:''}})
    }

    render() {
        if (this.state.searchComplete)
            return null
        else
            return (
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Selecciona para ver las figuras disponibles
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Query query={FIG_QUERY} pollInterval={1000}>
                            {({ loading, error, data }) => {
                                if (loading) return <div>Loading</div>
                                if (error) return <div>Error</div>
                                if (data) {
                                    const figuresList = data.getAllFigures
                                    var figuresResult = figuresList.map(figure =>
                                        <Dropdown.Item key={figure.Id} onClick={() => {
                                            this.onClickFigure(figure)
                                        }}>
                                            {figure.Id} - {figure.Name} - {figure.Author} - {figure.CreationDate}
                                        </Dropdown.Item>
                                    )
                                    return figuresResult
                                }
                            }
                            }
                        </Query>

                        {this.state.figure.Id!=='' && 
                        <Query query={EDGE_QUERY} variables={{ Id_figure: this.state.figure.Id }} pool={1000}>
                            {({ loading, error, data }) => {
                                if (loading) return <div>Loading</div>
                                if (error) return <div>Error</div>
                                if (data) {
                                    const edgesList = data.getEdgesFromFigure
                                    this.responseEdges(edgesList)
                                    this.finishQuery()
                                    return null
                                }
                            }
                            }
                        </Query>
                        }
                    </Dropdown.Menu>
                </Dropdown>
            )
    }
}
export default FiguresList