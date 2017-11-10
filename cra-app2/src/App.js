import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Foo1 from 'foo1';
import Bar1 from 'bar1';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CRA-App 2</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Foo1 food="carrots"/>
        <Bar1 drink="margarita"/>
      </div>
    );
  }
}

export default App;
