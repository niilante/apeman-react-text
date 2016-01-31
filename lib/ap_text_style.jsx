/**
 * Style for ApText.
 * @constructor ApTextStyle
 */

"use strict";

import React, {PropTypes as types} from 'react';
import {ApStyle} from 'apeman-react-style';

/** @lends ApTextStyle */
let ApTextStyle = React.createClass({
    propTypes: {
        scoped: types.bool,
        type: types.string,
        style: types.object,
        highlightColor: types.string,
        maxWidth: types.number
    },
    getDefaultProps() {
        return {
            scoped: false,
            type: 'text/css',
            style: {},
            maxWidth: 480,
            highlightColor: ApStyle.DEFAULT_HIGHLIGHT_COLOR
        }
    },
    render() {
        let s = this,
            props = s.props;

        let {highlightColor, maxWidth} = props;

        let data = {
                '.ap-text': {
                    display: `block`,
                    padding: `4px 8px`,
                    border: `1px solid #AAA`,
                    margin: `4px`,
                    width: `100%`,
                    maxWidth: `${maxWidth}px`,
                    verticalAlign: `middle`,
                    borderRadius: `2px`,
                    outlineColor: `${highlightColor}`,
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
                     data={Object.assign(data, props.style)}
                     smallMediaData={smallMediaData}
                     mediumMediaData={mediumMediaData}
                     largeMediaData={largeMediaData}
            >{props.children}</ApStyle>
        );
    }
});
module.exports = ApTextStyle;


