/**
 * Style for ApText.
 * @augments ApStyle
 * @constructor ApTextStyle
 */

"use strict";

var React = require('react'),
    ApStyle = require('apeman-react-style')['ApStyle'];

/** @lends ApTextStyle */
export default class ApTextStyle extends ApStyle {

}

ApTextStyle.propTypes = ApStyle.propTypes;

ApTextStyle.defaultProps = {
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
};

