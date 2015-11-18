"use strict";

var React = require('react'),
    ApText = require('../../lib/ap_text');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            value: 'This if foo'
        };
    },
    handleChange: function (e) {
        var s = this;
        s.setState({
            value: e.target.value
        });
        console.debug(e);
    },
    render: function () {
        let s = this,
            state = s.state;
        return (
            <div>
                <ApText onChange={s.handleChange} value={state.value}></ApText>
                <ApText onChange={s.handleChange} value={state.value} rows={2}></ApText>
            </div>
        );
    }
});


