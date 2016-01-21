"use strict";

import React from 'react';
import ApText from '../../lib/ap_text';

module.exports = React.createClass({
    getInitialState() {
        return {
            value: 'This if foo'
        };
    },
    handleChange(e) {
        let s = this;
        s.setState({
            value: e.target.value
        });
        console.debug(e);
    },
    render() {
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


