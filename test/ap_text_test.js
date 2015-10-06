/**
 * Test case for component.
 * Runs with nodeunit.
 */

var ApText = require('../lib/ap_text.js'),
    React = require('react');

exports.setUp = function (done) {
    done();
};

exports.tearDown = function (done) {
    done();
};

exports['ApText'] = function (test) {
    var html = React.renderToString(
        React.createElement('html',
            {},
            React.createElement(ApText, {})
        )
    );
    console.log(html);
    test.ok(html);
    test.done();
};

