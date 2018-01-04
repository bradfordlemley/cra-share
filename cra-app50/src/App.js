import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Foo1 from 'foo1';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CRA-App-50</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Foo1 food="oranges" />
      </div>
    );
  }
}

export default App;
