"use strict";

const React = require('react'),
    ReactDOM = require('react-dom');

const style = require('apeman-react-style'),
    html = require('apeman-react-html');
const Demo = require('./demo.component.js');

window.React = React;

let DemoFactory = React.createFactory(Demo);
ReactDOM.render(DemoFactory(), document.getElementById('demo-wrap'));
