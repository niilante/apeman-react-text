'use strict'

const React = require('react')
const ReactDOM = require('react-dom')

const Demo = require('./demo.component.js').default

function onLoad () {
  window.removeEventListener('DOMContentLoaded', onLoad)
  window.React = React
  let DemoFactory = React.createFactory(Demo)
  ReactDOM.render(DemoFactory(), document.getElementById('demo-wrap'), () => {
    console.debug('Demo component mounted.')
  })
}

window.addEventListener('DOMContentLoaded', onLoad)
