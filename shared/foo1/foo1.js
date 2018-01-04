import React from 'react';
import './foo1.css';

const Foo1 = ({title, desc}) =>
  <div className="foo1">
    <p>Foo1</p>
    <p>{title}</p>
    <p>{desc}</p>
  </div>

export default Foo1;
