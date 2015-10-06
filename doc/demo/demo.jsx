"use strict";

var React = require('react'),
    html = require('apeman-react-html'),
    ApText = require('../../lib/ap_text'),
    ApTextStyle = require('../../lib/ap_text_style');

class DemoTexts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'This if foo'
        };
    }
    handleChange(e){
        var s = this;
        s.setState({
            value: e.target.value
        });
    }
    render () {
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

        React.render(
            React.createElement(DemoTexts, {}),
            document.getElementById('demo')
        );

        React.render(
            React.createElement(ApTextStyle, {}),
            document.getElementById('demo-style')
        );
    };
})(window);


