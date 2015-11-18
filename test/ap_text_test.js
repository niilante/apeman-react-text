/**
 * Test case for component.
 * Runs with nodeunit.
 */
"use strict";

const ApText = require('../lib/ap_text.js'),
    ReactDOM = require('react-dom/server'),
    React = require('react');

exports.setUp = function (done) {
    done();
};

exports.tearDown = function (done) {
    done();
};

exports['ApText'] = function (test) {
    let html = ReactDOM.renderToString(
        React.createElement('div',
            {},
            React.createElement(ApText, {})
        )
    );
    console.log(html);
    test.ok(html);
    test.done();
};

