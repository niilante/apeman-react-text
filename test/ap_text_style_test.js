/**
 * Test case for component style.
 * Runs with nodeunit.
 */

var ApTextStyle = require('../lib/ap_text_style.js'),
    React = require('react');

exports.setUp = function (done) {
    done();
};

exports.tearDown = function (done) {
    done();
};

exports['ApTextStyle'] = function (test) {
    var style = React.renderToString(
        React.createElement(ApTextStyle, {})
    );
    console.log(style);
    test.ok(style);
    test.done();
};

