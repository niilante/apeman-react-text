(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';var _react=require('react');var _react2=_interopRequireDefault(_react);var _ap_text=require('../../lib/ap_text');var _ap_text2=_interopRequireDefault(_ap_text);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}module.exports=_react2.default.createClass({displayName:'exports',getInitialState:function getInitialState(){return {value:'ban'}},handleChange:function handleChange(e){var s=this;s.setState({value:e.target.value})},render:function render(){var s=this,state=s.state;return _react2.default.createElement('div',null,_react2.default.createElement(_ap_text2.default,{onChange:s.handleChange,value:state.value}),_react2.default.createElement(_ap_text2.default,{onChange:s.handleChange,value:state.value,rows:2}),_react2.default.createElement(_ap_text2.default,{onChange:s.handleChange,value:state.value,candidates:['banana','orange','apple']}))}});

},{"../../lib/ap_text":3,"react":"react"}],2:[function(require,module,exports){
"use strict";

const React = require('react'),
    ReactDOM = require('react-dom');

const Demo = require('./demo.component.js');

window.addEventListener('load', function onLoad() {
    window.React = React;
    let DemoFactory = React.createFactory(Demo);
    ReactDOM.render(DemoFactory(), document.getElementById('demo-wrap'));
});

},{"./demo.component.js":1,"react":"react","react-dom":"react-dom"}],3:[function(require,module,exports){
/**
 * apeman react package text component.
 * @constructor ApText
 */

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @lends ApText */
var ApText = _react2.default.createClass({
    displayName: 'ApText',

    //--------------------
    // Specs
    //--------------------

    propTypes: {
        name: _react.PropTypes.string,
        value: _react.PropTypes.string,
        placeholder: _react.PropTypes.string,
        rows: _react.PropTypes.number,
        candidates: _react.PropTypes.arrayOf(_react.PropTypes.string)
    },

    getInitialState: function getInitialState() {
        return {
            suggesting: false,
            candidates: null,
            selectedCandidate: null
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: '',
            value: null,
            placeholder: '',
            rows: 1,
            candidates: null
        };
    },
    render: function render() {
        var s = this;
        var state = s.state;
        var props = s.props;
        var value = props.value || null;
        var hasVal = !!value;

        var multiline = props.rows > 1;
        return _react2.default.createElement(
            'span',
            { className: (0, _classnames2.default)('ap-text-wrap', {
                    'ap-text-wrap-empty': !hasVal
                }) },
            multiline ? s._renderTextArea(value) : s._renderTextInput(value),
            state.suggesting ? s._renderCandidateList(state.candidates, state.selectedCandidate, multiline) : null
        );
    },

    //--------------------
    // Custom
    //--------------------

    handleCandidate: function handleCandidate(e) {
        var s = this;
        var props = s.props;

        e.target.value = e.target.value || e.target.dataset.value;
        s.setState({ suggesting: false });
        if (props.onChange) {
            props.onChange(e);
        }
    },
    handleFocus: function handleFocus(e) {
        var s = this;
        var props = s.props;

        s.setState({ suggesting: true });
        s.updateCandidates();
        if (props.onFocus) {
            props.onFocus(e);
        }
    },
    handleChange: function handleChange(e) {
        var s = this;
        var props = s.props;

        s.setState({ suggesting: true });
        if (props.onChange) {
            props.onChange(e);
        }
    },
    handleBlur: function handleBlur(e) {
        var s = this;
        var props = s.props;

        if (props.onBlur) {
            props.onBlur(e);
        }
    },
    handleKeyUp: function handleKeyUp(e) {
        var s = this;
        var props = s.props;

        s.updateCandidates();
        if (props.onKeyUp) {
            props.onKeyUp(e);
        }
    },
    handleKeyDown: function handleKeyDown(e) {
        var s = this;
        var props = s.props;

        switch (e.keyCode) {
            case 38:
                // UP
                s.moveCandidateIndex(-1);
                break;
            case 40:
                // DOWN
                s.moveCandidateIndex(+1);
                break;
            case 13:
                // Enter
                s.enterCandidate();
                break;
            default:
                s.setState({ suggesting: true });
                break;
        }
        if (props.onKeyDown) {
            props.onKeyDown(e);
        }
    },
    moveCandidateIndex: function moveCandidateIndex(amount) {
        var s = this;
        var _s$state = s.state;
        var candidates = _s$state.candidates;
        var selectedCandidate = _s$state.selectedCandidate;

        if (!candidates) {
            return;
        }
        var index = candidates.indexOf(selectedCandidate) + amount;
        var over = index === -1 || index === candidates.length;
        if (over) {
            return;
        }
        s.setState({
            selectedCandidate: candidates[index] || null
        });
    },
    updateCandidates: function updateCandidates() {
        var s = this;
        var props = s.props;

        var value = props.value,
            candidates = (props.candidates || []).filter(function (candidate) {
            return !!candidate;
        }).map(function (candidate) {
            return String(candidate).trim();
        }).filter(function (candidate) {
            return !value || candidate.match(value);
        });

        var hit = candidates.length == 1 && candidates[0] === value;
        if (hit) {
            candidates = null;
        }
        s.setState({ candidates: candidates });
    },
    enterCandidate: function enterCandidate() {
        var s = this;
        var props = s.props;
        var _s$state2 = s.state;
        var candidates = _s$state2.candidates;
        var selectedCandidate = _s$state2.selectedCandidate;

        var valid = candidates && !! ~candidates.indexOf(selectedCandidate);
        if (valid) {
            var target = _reactDom2.default.findDOMNode(s.refs['candidate-' + selectedCandidate]);
            target.value = selectedCandidate;
            if (props.onChange) {
                props.onChange({ target: target });
            }
            s.setState({ suggesting: false });
        }
    },

    //--------------------
    // Private
    //--------------------
    _renderTextArea: function _renderTextArea(value) {
        var s = this;
        var props = s.props;

        return _react2.default.createElement('textarea', _extends({ className: (0, _classnames2.default)('ap-text ap-text-multiple', props.className),
            value: value,
            onFocus: ''
        }, props));
    },
    _renderTextInput: function _renderTextInput(value) {
        var s = this;
        var props = s.props;

        return _react2.default.createElement('input', _extends({ className: (0, _classnames2.default)('ap-text', props.className),
            value: value,
            onFocus: s.handleFocus,
            onKeyUp: s.handleKeyUp,
            onChange: s.handleChange,
            onBlur: s.handleBlur,
            onKeyDown: s.handleKeyDown,
            type: 'text'
        }, props));
    },
    _renderCandidateList: function _renderCandidateList(candidates, selectedCandidate, multiline) {
        var s = this;
        var props = s.props;

        if (multiline) {
            console.warn('[ApText] Can not use candidates with multiline input.');
            return null;
        }

        if (!candidates) {
            return null;
        }

        if (!candidates.length) {
            return null;
        }
        return _react2.default.createElement(
            'ul',
            { className: 'ap-text-candidate-list' },
            candidates.map(function (candidate) {
                return _react2.default.createElement(
                    'li',
                    { key: candidate, className: (0, _classnames2.default)("ap-text-candidate-list-item", {
                            'ap-text-candidate-list-item-selected': candidate === selectedCandidate
                        }) },
                    _react2.default.createElement(
                        'a',
                        { onClick: s.handleCandidate,
                            ref: 'candidate-' + candidate,
                            'data-value': candidate },
                        candidate
                    )
                );
            })
        );
    }
});

module.exports = ApText;

},{"classnames":"classnames","react":"react","react-dom":"react-dom"}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NS4zLjAvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvb2t1bmlzaGluaXNoaS9Qcm9qZWN0cy9hcGVtYW4tcHJvamVjdHMvYXBlbWFuLXJlYWN0LXRleHQvZG9jL2RlbW8vZGVtby5jb21wb25lbnQuanN4IiwiZG9jL2RlbW8vZGVtby5ub2RlLmpzIiwiL1VzZXJzL29rdW5pc2hpbmlzaGkvUHJvamVjdHMvYXBlbWFuLXByb2plY3RzL2FwZW1hbi1yZWFjdC10ZXh0L2xpYi9hcF90ZXh0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLCtQQUtBLE9BQU8sT0FBUCxDQUFpQixnQkFBTSxXQUFOLENBQWtCLHVCQUMvQiwwQ0FBa0IsQ0FDZCxPQUFPLENBQ0gsTUFBTyxLQUFQLENBREosQ0FEYyxDQUtsQixtQ0FBYSxFQUFHLENBQ1osSUFBSSxFQUFJLElBQUosQ0FEUSxDQUVaLENBQUUsUUFBRixDQUFXLENBQ1AsTUFBTyxFQUFFLE1BQUYsQ0FBUyxLQUFULENBRFgsRUFGWSxDQU1oQix3QkFBUyxDQUNMLElBQUksRUFBSSxJQUFKLENBQ0EsTUFBUSxFQUFFLEtBQUYsQ0FGUCxPQUlELHlDQUNJLGlEQUFRLFNBQVUsRUFBRSxZQUFGLENBQWdCLE1BQU8sTUFBTSxLQUFOLENBQXpDLENBREosQ0FFSSxpREFBUSxTQUFVLEVBQUUsWUFBRixDQUFnQixNQUFPLE1BQU0sS0FBTixDQUFhLEtBQU0sQ0FBTixDQUF0RCxDQUZKLENBR0ksaURBQVEsU0FBVSxFQUFFLFlBQUYsQ0FBZ0IsTUFBTyxNQUFNLEtBQU4sQ0FDakMsV0FBWSxDQUNwQixRQURvQixDQUVwQixRQUZvQixDQUdwQixPQUhvQixDQUFaLENBRFIsQ0FISixDQURKLENBSEssQ0FaSSxDQUFqQjs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFD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YUFEVyxDQUZ2QjtTQURKLENBZjBEO0tBM01qQztDQUFsQixDQUFUOztBQTZPTixPQUFPLE9BQVAsR0FBaUIsTUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQXBUZXh0IGZyb20gJy4uLy4uL2xpYi9hcF90ZXh0JztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6ICdiYW4nXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBoYW5kbGVDaGFuZ2UoZSkge1xuICAgICAgICBsZXQgcyA9IHRoaXM7XG4gICAgICAgIHMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdmFsdWU6IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgcyA9IHRoaXMsXG4gICAgICAgICAgICBzdGF0ZSA9IHMuc3RhdGU7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxBcFRleHQgb25DaGFuZ2U9e3MuaGFuZGxlQ2hhbmdlfSB2YWx1ZT17c3RhdGUudmFsdWV9Lz5cbiAgICAgICAgICAgICAgICA8QXBUZXh0IG9uQ2hhbmdlPXtzLmhhbmRsZUNoYW5nZX0gdmFsdWU9e3N0YXRlLnZhbHVlfSByb3dzPXsyfS8+XG4gICAgICAgICAgICAgICAgPEFwVGV4dCBvbkNoYW5nZT17cy5oYW5kbGVDaGFuZ2V9IHZhbHVlPXtzdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXM9e1tcbiAgICAgICAgICAgICAgICAnYmFuYW5hJyxcbiAgICAgICAgICAgICAgICAnb3JhbmdlJyxcbiAgICAgICAgICAgICAgICAnYXBwbGUnXG4gICAgICAgICAgICAgICAgXX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuXG5jb25zdCBEZW1vID0gcmVxdWlyZSgnLi9kZW1vLmNvbXBvbmVudC5qcycpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICB3aW5kb3cuUmVhY3QgPSBSZWFjdDtcbiAgICBsZXQgRGVtb0ZhY3RvcnkgPSBSZWFjdC5jcmVhdGVGYWN0b3J5KERlbW8pO1xuICAgIFJlYWN0RE9NLnJlbmRlcihEZW1vRmFjdG9yeSgpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtby13cmFwJykpO1xufSk7XG4iLCIvKipcbiAqIGFwZW1hbiByZWFjdCBwYWNrYWdlIHRleHQgY29tcG9uZW50LlxuICogQGNvbnN0cnVjdG9yIEFwVGV4dFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXMgYXMgdHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbi8qKiBAbGVuZHMgQXBUZXh0ICovXG5jb25zdCBBcFRleHQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBTcGVjc1xuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBuYW1lOiB0eXBlcy5zdHJpbmcsXG4gICAgICAgIHZhbHVlOiB0eXBlcy5zdHJpbmcsXG4gICAgICAgIHBsYWNlaG9sZGVyOiB0eXBlcy5zdHJpbmcsXG4gICAgICAgIHJvd3M6IHR5cGVzLm51bWJlcixcbiAgICAgICAgY2FuZGlkYXRlczogdHlwZXMuYXJyYXlPZih0eXBlcy5zdHJpbmcpXG4gICAgfSxcblxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Z2dlc3Rpbmc6IGZhbHNlLFxuICAgICAgICAgICAgY2FuZGlkYXRlczogbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdGVkQ2FuZGlkYXRlOiBudWxsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnJyxcbiAgICAgICAgICAgIHJvd3M6IDEsXG4gICAgICAgICAgICBjYW5kaWRhdGVzOiBudWxsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgcyA9IHRoaXM7XG4gICAgICAgIGxldCB7c3RhdGUsIHByb3BzfSA9IHMsXG4gICAgICAgICAgICB2YWx1ZSA9IHByb3BzLnZhbHVlIHx8IG51bGwsXG4gICAgICAgICAgICBoYXNWYWwgPSAhIXZhbHVlO1xuXG4gICAgICAgIGxldCBtdWx0aWxpbmUgPSBwcm9wcy5yb3dzID4gMTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnYXAtdGV4dC13cmFwJywge1xuICAgICAgICAgICAgICAgICdhcC10ZXh0LXdyYXAtZW1wdHknOiAhaGFzVmFsXG4gICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtdWx0aWxpbmUgPyBzLl9yZW5kZXJUZXh0QXJlYSh2YWx1ZSkgOiBzLl9yZW5kZXJUZXh0SW5wdXQodmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuc3VnZ2VzdGluZyA/IHMuX3JlbmRlckNhbmRpZGF0ZUxpc3Qoc3RhdGUuY2FuZGlkYXRlcywgc3RhdGUuc2VsZWN0ZWRDYW5kaWRhdGUsIG11bHRpbGluZSkgOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ3VzdG9tXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgaGFuZGxlQ2FuZGlkYXRlKGUpe1xuICAgICAgICBsZXQgcyA9IHRoaXMsXG4gICAgICAgICAgICB7cHJvcHN9ID0gcztcbiAgICAgICAgZS50YXJnZXQudmFsdWUgPSBlLnRhcmdldC52YWx1ZSB8fCBlLnRhcmdldC5kYXRhc2V0LnZhbHVlO1xuICAgICAgICBzLnNldFN0YXRlKHtzdWdnZXN0aW5nOiBmYWxzZX0pO1xuICAgICAgICBpZiAocHJvcHMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHByb3BzLm9uQ2hhbmdlKGUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhbmRsZUZvY3VzKGUpe1xuICAgICAgICBsZXQgcyA9IHRoaXMsXG4gICAgICAgICAgICB7cHJvcHN9ID0gcztcbiAgICAgICAgcy5zZXRTdGF0ZSh7c3VnZ2VzdGluZzogdHJ1ZX0pO1xuICAgICAgICBzLnVwZGF0ZUNhbmRpZGF0ZXMoKTtcbiAgICAgICAgaWYgKHByb3BzLm9uRm9jdXMpIHtcbiAgICAgICAgICAgIHByb3BzLm9uRm9jdXMoZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFuZGxlQ2hhbmdlKGUpe1xuICAgICAgICBsZXQgcyA9IHRoaXMsXG4gICAgICAgICAgICB7cHJvcHN9ID0gcztcbiAgICAgICAgcy5zZXRTdGF0ZSh7c3VnZ2VzdGluZzogdHJ1ZX0pO1xuICAgICAgICBpZiAocHJvcHMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHByb3BzLm9uQ2hhbmdlKGUpO1xuICAgICAgICB9XG4gICAgfSxcblxuXG4gICAgaGFuZGxlQmx1cihlKXtcbiAgICAgICAgbGV0IHMgPSB0aGlzLFxuICAgICAgICAgICAge3Byb3BzfSA9IHM7XG4gICAgICAgIGlmIChwcm9wcy5vbkJsdXIpIHtcbiAgICAgICAgICAgIHByb3BzLm9uQmx1cihlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYW5kbGVLZXlVcChlKXtcbiAgICAgICAgbGV0IHMgPSB0aGlzLFxuICAgICAgICAgICAge3Byb3BzfSA9IHM7XG4gICAgICAgIHMudXBkYXRlQ2FuZGlkYXRlcygpO1xuICAgICAgICBpZiAocHJvcHMub25LZXlVcCkge1xuICAgICAgICAgICAgcHJvcHMub25LZXlVcChlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYW5kbGVLZXlEb3duKGUpe1xuICAgICAgICBsZXQgcyA9IHRoaXMsXG4gICAgICAgICAgICB7cHJvcHN9ID0gcztcbiAgICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgMzg6IC8vIFVQXG4gICAgICAgICAgICAgICAgcy5tb3ZlQ2FuZGlkYXRlSW5kZXgoLTEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0MDogLy8gRE9XTlxuICAgICAgICAgICAgICAgIHMubW92ZUNhbmRpZGF0ZUluZGV4KCsxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTM6IC8vIEVudGVyXG4gICAgICAgICAgICAgICAgcy5lbnRlckNhbmRpZGF0ZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBzLnNldFN0YXRlKHtzdWdnZXN0aW5nOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLm9uS2V5RG93bikge1xuICAgICAgICAgICAgcHJvcHMub25LZXlEb3duKGUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG1vdmVDYW5kaWRhdGVJbmRleChhbW91bnQpe1xuICAgICAgICBsZXQgcyA9IHRoaXMsXG4gICAgICAgICAgICB7Y2FuZGlkYXRlcywgc2VsZWN0ZWRDYW5kaWRhdGV9ID0gcy5zdGF0ZTtcbiAgICAgICAgaWYgKCFjYW5kaWRhdGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGluZGV4ID0gY2FuZGlkYXRlcy5pbmRleE9mKHNlbGVjdGVkQ2FuZGlkYXRlKSArIGFtb3VudDtcbiAgICAgICAgbGV0IG92ZXIgPSAoaW5kZXggPT09IC0xKSB8fCAoaW5kZXggPT09IGNhbmRpZGF0ZXMubGVuZ3RoKTtcbiAgICAgICAgaWYgKG92ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkQ2FuZGlkYXRlOiBjYW5kaWRhdGVzW2luZGV4XSB8fCBudWxsXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB1cGRhdGVDYW5kaWRhdGVzKCl7XG4gICAgICAgIGxldCBzID0gdGhpcyxcbiAgICAgICAgICAgIHtwcm9wc30gPSBzO1xuICAgICAgICBsZXQgdmFsdWUgPSBwcm9wcy52YWx1ZSxcbiAgICAgICAgICAgIGNhbmRpZGF0ZXMgPSAocHJvcHMuY2FuZGlkYXRlcyB8fCBbXSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGNhbmRpZGF0ZSA9PiAhIWNhbmRpZGF0ZSlcbiAgICAgICAgICAgICAgICAubWFwKGNhbmRpZGF0ZSA9PiBTdHJpbmcoY2FuZGlkYXRlKS50cmltKCkpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihjYW5kaWRhdGUgPT4gIXZhbHVlIHx8IGNhbmRpZGF0ZS5tYXRjaCh2YWx1ZSkpO1xuXG4gICAgICAgIGxldCBoaXQgPSAoY2FuZGlkYXRlcy5sZW5ndGggPT0gMSkgJiYgKGNhbmRpZGF0ZXNbMF0gPT09IHZhbHVlKTtcbiAgICAgICAgaWYgKGhpdCkge1xuICAgICAgICAgICAgY2FuZGlkYXRlcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcy5zZXRTdGF0ZSh7Y2FuZGlkYXRlc30pO1xuICAgIH0sXG5cbiAgICBlbnRlckNhbmRpZGF0ZSgpe1xuICAgICAgICBsZXQgcyA9IHRoaXMsXG4gICAgICAgICAgICB7cHJvcHN9ID0gcyxcbiAgICAgICAgICAgIHtjYW5kaWRhdGVzLCBzZWxlY3RlZENhbmRpZGF0ZX0gPSBzLnN0YXRlO1xuICAgICAgICBsZXQgdmFsaWQgPSBjYW5kaWRhdGVzICYmICEhfmNhbmRpZGF0ZXMuaW5kZXhPZihzZWxlY3RlZENhbmRpZGF0ZSk7XG4gICAgICAgIGlmICh2YWxpZCkge1xuICAgICAgICAgICAgbGV0IHRhcmdldCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHMucmVmc1tgY2FuZGlkYXRlLSR7c2VsZWN0ZWRDYW5kaWRhdGV9YF0pO1xuICAgICAgICAgICAgdGFyZ2V0LnZhbHVlID0gc2VsZWN0ZWRDYW5kaWRhdGU7XG4gICAgICAgICAgICBpZiAocHJvcHMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICBwcm9wcy5vbkNoYW5nZSh7dGFyZ2V0fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLnNldFN0YXRlKHtzdWdnZXN0aW5nOiBmYWxzZX0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQcml2YXRlXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIF9yZW5kZXJUZXh0QXJlYSh2YWx1ZSl7XG4gICAgICAgIGxldCBzID0gdGhpcyxcbiAgICAgICAgICAgIHtwcm9wc30gPSBzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnYXAtdGV4dCBhcC10ZXh0LW11bHRpcGxlJywgcHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz1cIlwiXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfT5cbiAgICAgICAgICAgICAgICA8L3RleHRhcmVhPlxuICAgICAgICApO1xuICAgIH0sXG4gICAgX3JlbmRlclRleHRJbnB1dCh2YWx1ZSl7XG4gICAgICAgIGxldCBzID0gdGhpcyxcbiAgICAgICAgICAgIHtwcm9wc30gPSBzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnYXAtdGV4dCcsIHByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3MuaGFuZGxlRm9jdXN9XG4gICAgICAgICAgICAgICAgICAgb25LZXlVcD17cy5oYW5kbGVLZXlVcH1cbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17cy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgb25CbHVyPXtzLmhhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIF9yZW5kZXJDYW5kaWRhdGVMaXN0KGNhbmRpZGF0ZXMsIHNlbGVjdGVkQ2FuZGlkYXRlLCBtdWx0aWxpbmUpe1xuICAgICAgICBsZXQgcyA9IHRoaXMsXG4gICAgICAgICAgICB7cHJvcHN9ID0gcztcbiAgICAgICAgaWYgKG11bHRpbGluZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdbQXBUZXh0XSBDYW4gbm90IHVzZSBjYW5kaWRhdGVzIHdpdGggbXVsdGlsaW5lIGlucHV0LicpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNhbmRpZGF0ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjYW5kaWRhdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJhcC10ZXh0LWNhbmRpZGF0ZS1saXN0XCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzLm1hcChjYW5kaWRhdGUgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2NhbmRpZGF0ZX0gY2xhc3NOYW1lPXtjbGFzc25hbWVzKFwiYXAtdGV4dC1jYW5kaWRhdGUtbGlzdC1pdGVtXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhcC10ZXh0LWNhbmRpZGF0ZS1saXN0LWl0ZW0tc2VsZWN0ZWQnOiBjYW5kaWRhdGUgPT09IHNlbGVjdGVkQ2FuZGlkYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgb25DbGljaz17cy5oYW5kbGVDYW5kaWRhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtgY2FuZGlkYXRlLSR7Y2FuZGlkYXRlfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS12YWx1ZT17Y2FuZGlkYXRlfT57Y2FuZGlkYXRlfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICApXG4gICAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcFRleHQ7XG5cbiJdfQ==
