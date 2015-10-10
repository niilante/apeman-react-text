/**
 * Test case for component style.
 * Runs with nodeunit.
 */

var ApTextStyle = require('../lib/ap_text_style.js'),
    React = require('react'),
    ReactDOM = require('react-dom/server');

exports.setUp = function (done) {
    done();
};

exports.tearDown = function (done) {
    done();
};

exports['ApTextStyle'] = function (test) {
    var style = ReactDOM.renderToString(
        React.createElement(ApTextStyle, {})
    );
    console.log(style);
    test.ok(style);
    test.done();
};

