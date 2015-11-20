/**
 * apeman react package text component.
 * @constructor ApText
 */

"use strict";

const React = require('react'),
    types = React.PropTypes;

/** @lends ApText */
const ApText = React.createClass({


    //--------------------
    // Specs
    //--------------------

    propTypes : {
    name: types.string,
    value: types.string,
    placeholder: types.string,
    rows: types.number
},

    getInitialState: function () {
        return {}
    },

    getDefaultProps: function () {
        return {
            name: '',
            value: '',
            placeholder: '',
            rows: 1
        }
    },

    render: function() {
        let s = this;
        let props = s.props;
        let multiline = props.rows > 1;
        if (multiline) {
            return (<textarea className="ap-text ap-text-multiple"
                {...props}></textarea>)
        } else {
            return (
                <input className="ap-text"
                       type="text" {...props} />
            )
        }
    }

});

module.exports = ApText;

