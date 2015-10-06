/**
 * apeman react package text component.
 * @augments ApComponent
 * @constructor ApText
 */

"use strict";

var React = require('react'),
    types = React.PropTypes,
    ApComponent = require('apeman-react-component')['ApComponent'];

/** @lends ApText */
export default class ApText extends ApComponent {


    //--------------------
    // Specs
    //--------------------

    constructor(props) {
        super(props);
        var s = this;
        s.state = {};
    }

    render() {
        var s = this;
        let {props, state} = s;
        var multiline = props.rows > 1;
        if (multiline) {
            return (<textarea {...props}></textarea>)
        } else {
            return (
                <input className="ap-text"
                       type="text" {...props} />
            )
        }
    }


    //--------------------
    // Lifecycle
    //--------------------

    componentWillMount() {
        var s = this;
    }

    componentDidMount() {
        var s = this;
    }

    componentWillReceiveProps(nextProps) {
        var s = this;
    }

    shouldComponentUpdate(nextProps, nextState) {
        var s = this;
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        var s = this;
    }

    componentDidUpdate(prevProps, prevState) {
        var s = this;
    }

    componentWillUnmount() {
        var s = this;
    }


    //------------------
    // Helper
    //------------------


    //------------------
    // Private
    //------------------


}

//------------------
// Class properties
//------------------

ApText.propTypes = {
    name: types.string,
    value: types.string,
    placeholder: types.string,
    rows: types.number
};

ApText.defaultProps = {
    name: '',
    value: '',
    placeholder: '',
    rows: 1
};

ApText.autobind = true;
