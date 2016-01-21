/**
 * Test case for component.
 * Runs with mocha.
 */
"use strict";

const ApText = require('../lib/ap_text.js'),
    ReactDOM = require('react-dom/server'),
    assert = require('assert'),
    React = require('react');


it('ApText', (done) => {
    let html = ReactDOM.renderToString(
        React.createElement('div',
            {},
            React.createElement(ApText, {})
        )
    );
    console.log(html);
    assert.ok(html);
    done();
});

