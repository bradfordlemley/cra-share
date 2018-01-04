import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Foo1 from 'foo1';
import {add} from 'lib1';

const title = "CRA-App 1";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{title}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Foo1 title={title} desc="Example app with sharing"/>
        <div>1 + 1 = {add(1, 1)}</div>
      </div>
    );
  }
}

export default App;
