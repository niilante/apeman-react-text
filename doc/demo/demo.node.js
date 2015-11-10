"use strict";

var React = require('react'),
    ReactDOM = require('react-dom');

var style = require('apeman-react-style'),
    html = require('apeman-react-html');
var Demo = require('./demo.component.js');

window.React = React;

var DemoFactory = React.createFactory(Demo);
ReactDOM.render(DemoFactory(), document.getElementById('demo-wrap'));
