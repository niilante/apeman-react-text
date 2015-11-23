/**
 * Style for ApText.
 * @constructor ApTextStyle
 */

"use strict";

const React = require('react'),
    types = React.PropTypes,
    extend = require('extend'),
    ApStyle = require('apeman-react-style')['ApStyle'];

/** @lends ApTextStyle */
let ApTextStyle = React.createClass({
    propTypes: {
        scoped: types.bool,
        type: types.string,
        style: types.object,
        maxWidth:types.number
    },
    getDefaultProps: function () {
        return {
            scoped: false,
            type: 'text/css',
            style: {},
            maxWidth: 480
        }
    },
    render: function () {
        let s = this,
            props = s.props;

        let maxWidth = props.maxWidth;

        let data = {
                '.ap-text': {
                    display: `block`,
                    padding: `4px 8px`,
                    border: `1px solid #AAA`,
                    margin: `4px`,
                    width: `100%`,
                    maxWidth: `${maxWidth}px`,
                    borderRadius: `2px`,
                    boxShadow: `1px 1px 1px rgba(0,0,0,.05) inset`
                },
                '.ap-text-multiple': {
                    overflow: `auto`
                }
            },
            smallMediaData = {},
            mediumMediaData = {},
            largeMediaData = {};
        return (
            <ApStyle scoped={props.scoped}
                     data={extend(data, props.style)}
                     smallMediaData={smallMediaData}
                     mediumMediaData={mediumMediaData}
                     largeMediaData={largeMediaData}
            >{props.children}</ApStyle>
        );
    }
});
module.exports = ApTextStyle;


