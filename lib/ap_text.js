/**
 * apeman react package text component.
 * @augments ApComponent
 * @constructor ApText
 */

"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react'),
    types = React.PropTypes,
    ApComponent = require('apeman-react-component')['ApComponent'];

/** @lends ApText */

var ApText = (function (_ApComponent) {
    _inherits(ApText, _ApComponent);

    //--------------------
    // Specs
    //--------------------

    function ApText(props) {
        _classCallCheck(this, ApText);

        _get(Object.getPrototypeOf(ApText.prototype), 'constructor', this).call(this, props);
        var s = this;
        s.state = {};
    }

    //------------------
    // Class properties
    //------------------

    _createClass(ApText, [{
        key: 'render',
        value: function render() {
            var s = this;
            var props = s.props;
            var state = s.state;

            var multiline = props.rows > 1;
            if (multiline) {
                return React.createElement('textarea', props);
            } else {
                return React.createElement('input', _extends({ className: 'ap-text',
                    type: 'text' }, props));
            }
        }

        //--------------------
        // Lifecycle
        //--------------------

    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var s = this;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var s = this;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var s = this;
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var s = this;
            return true;
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            var s = this;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var s = this;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var s = this;
        }

        //------------------
        // Helper
        //------------------

        //------------------
        // Private
        //------------------

    }]);

    return ApText;
})(ApComponent);

exports['default'] = ApText;
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
module.exports = exports['default'];
