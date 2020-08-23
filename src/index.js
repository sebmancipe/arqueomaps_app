import React, { Component } from "react";
import ReactDOM from "react-dom";
import MapView from "./components/admin/view/View";
import MapFull from "./components/maps/main/MapFull";
import MapFree from "./components/maps/main/MapFree";
import MainPage from "./components/Home";
import Form_Edit from "./components/admin/edit/Form_Edit";
//import View from './components/View'
import Form_Add from "./components/admin/create/Form_Add";
import Error from "./components/Error";
import AdministrationView from "./components/admin/Administration";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class Core extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/mapfree" component={MapFree} />
          <Route path="/map" component={MapFull} />
          <Route path="/add" component={Form_Add} />
          <Route path="/edit" component={Form_Edit} />
          <Route path="/view" component={MapView} />
          <Route path="/admin" component={AdministrationView} />
          <Route path="/" component={MainPage} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Core />, document.getElementById("render_component"));
