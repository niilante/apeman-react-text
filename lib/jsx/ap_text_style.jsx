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
        '.ap-text': {}
    }
};

