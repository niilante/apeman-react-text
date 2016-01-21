/**
 * Test case for component style.
 * Runs with mocha.
 */
"use strict";

const ApTextStyle = require('../lib/ap_text_style.js'),
    assert = require('assert'),
    React = require('react'),
    ReactDOM = require('react-dom/server');


it('ApTextStyle', (done) => {
    let style = ReactDOM.renderToString(
        React.createElement(ApTextStyle, {})
    );
    console.log(style);
    assert.ok(style);
    done();
});

