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
    prefix: '',
    data: {
        '.ap-text': {
            'display': 'block',
            'padding': '4px 8px',
            'border': '1px solid #AAA',
            'margin': '4px'
        },
        '.ap-text-multiple': {}
    }
};

