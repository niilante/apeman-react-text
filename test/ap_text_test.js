/**
 * Test case for component.
 * Runs with mocha.
 */
'use strict'

const ApText = require('../lib/ap_text.js').default
const ReactDOM = require('react-dom/server')
const assert = require('assert')
const React = require('react')

it('ApText', (done) => {
  let html = ReactDOM.renderToString(
    React.createElement('div',
      {},
      React.createElement(ApText, {})
    )
  )
  console.log(html)
  assert.ok(html)
  done()
})

/* global it */
