"use strict";

var React = require('react'),
    ReactDOM = require('react-dom'),
    html = require('apeman-react-html'),
    ApText = require('../../lib/ap_text'),
    ApTextStyle = require('../../lib/ap_text_style');

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'This if foo'
        };
    }

    handleChange(e) {
        var s = this;
        s.setState({
            value: e.target.value
        });
    }

    render() {
        var s = this;
        let state = s.state || {};
        return (
            <div>
                <ApText onChange={s.handleChange.bind(s)} value={state.value}></ApText>
                <ApText onChange={s.handleChange.bind(s)} value={state.value} rows={2}></ApText>
            </div>
        )
    }
}

(function (window) {
    window.onload = function () {

        ReactDOM.render(
            React.createElement(Demo, {}),
            document.getElementById('demo')
        );

        ReactDOM.render(
            React.createElement(ApTextStyle, {}),
            document.getElementById('demo-style')
        );
    };
})(window);


