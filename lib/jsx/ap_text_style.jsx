/**
 * Style for ApText.
 * @constructor ApTextStyle
 */

"use strict";

var React = require('react'),
    ApStyle = require('apeman-react-style')['ApStyle'];

/** @lends ApTextStyle */
var ApTextStyle = React.createClass({
    propTypes: ApStyle.propTypes,
    getDefaultProps: function () {
        return {
            data: {
                '.ap-text': {
                    'display': 'block',
                    'padding': '4px 8px',
                    'border': '1px solid #AAA',
                    'margin': '4px',
                    'width': '100%',
                    'maxWidth': '480px',
                    'borderRadius': '2px',
                    'boxShadow': '1px 1px 1px rgba(0,0,0,.05) inset'
                },
                '.ap-text-multiple': {
                    'overflow': 'auto'
                }
            }
        }
    },
    render: function () {
        var s = this;
        return React.createElement(ApStyle, s.props);
    }
});
module.exports = ApTextStyle;


