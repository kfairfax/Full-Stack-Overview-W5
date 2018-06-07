import React, { Component } from "react";
import {HashRouter, Switch, Route} from 'react-router-dom';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route />
            <Route />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
