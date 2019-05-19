import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MapView from './components/Maps'
import MainPage from './components/Home'
import Form_Edit from './components/Form_Edit'
//import View from './components/View'
import Form_Add from './components/Form_Add'
import Error from './components/Error'
import AdministrationView from './components/Administration'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

class Core extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/map" component={MapView} />
          <Route path="/add" component={Form_Add} />
          <Route path="/edit" component={Form_Edit} />
          <Route path="/view" component={MapView} />
          <Route path="/admin" component={AdministrationView}/>
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Core />,document.getElementById('render_component'))
