/**
 * apeman react package text component.
 * @constructor ApText
 */

"use strict";

var React = require('react'),
    types = React.PropTypes;

/** @lends ApText */
var ApText = React.createClass({


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
        var s = this;
        var props = s.props;
        var multiline = props.rows > 1;
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

