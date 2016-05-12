(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

const React = require('react')
const ReactDOM = require('react-dom')

const Demo = require('./demo.component.js').default

window.addEventListener('load', function onLoad () {
  window.React = React
  let DemoFactory = React.createFactory(Demo)
  ReactDOM.render(DemoFactory(), document.getElementById('demo-wrap'))
})

},{"./demo.component.js":2,"react":"react","react-dom":"react-dom"}],2:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _react=require('react');var _react2=_interopRequireDefault(_react);var _ap_text=require('../../lib/ap_text');var _ap_text2=_interopRequireDefault(_ap_text);var _ap_text_style=require('../../lib/ap_text_style');var _ap_text_style2=_interopRequireDefault(_ap_text_style);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=_react2.default.createClass({displayName:'demo.component',getInitialState:function getInitialState(){return {value:'ban'}},handleChange:function handleChange(e){var s=this;s.setState({value:e.target.value})},render:function render(){var s=this;var state=s.state;return _react2.default.createElement('div',null,_react2.default.createElement(_ap_text_style2.default,{highlightColor:'#b35600'}),_react2.default.createElement(_ap_text2.default,{onChange:s.handleChange,value:state.value}),_react2.default.createElement(_ap_text2.default,{onChange:s.handleChange,value:state.value,rows:2}),_react2.default.createElement(_ap_text2.default,{onChange:s.handleChange,value:state.value,candidates:['banana','orange','apple']}))}});

},{"../../lib/ap_text":3,"../../lib/ap_text_style":4,"react":"react"}],3:[function(require,module,exports){
/**
 * apeman react package text component.
 * @class ApText
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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


  // --------------------
  // Specs
  // --------------------

  propTypes: {
    /** Name of text input */
    name: _react.PropTypes.string,
    /** Value of text input */
    value: _react.PropTypes.string,
    /** Placeholder text */
    placeholder: _react.PropTypes.string,
    /** Number of rows */
    rows: _react.PropTypes.number,
    /** Selectable candidate text */
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
      value: '',
      placeholder: '',
      rows: 1,
      candidates: null
    };
  },
  render: function render() {
    var s = this;
    var state = s.state;
    var props = s.props;
    var value = props.value;

    var hasVal = !!value;

    var multiline = props.rows > 1;
    return _react2.default.createElement(
      'span',
      { className: (0, _classnames2.default)('ap-text-wrap', { 'ap-text-wrap-empty': !hasVal }) },
      multiline ? s._renderTextArea(value) : s._renderTextInput(value),
      state.suggesting ? s._renderCandidateList(state.candidates, state.selectedCandidate, multiline) : null
    );
  },


  // --------------------
  // Custom
  // --------------------

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

    var value = props.value;
    var candidates = (props.candidates || []).filter(function (candidate) {
      return !!candidate;
    }).map(function (candidate) {
      return String(candidate).trim();
    }).filter(function (candidate) {
      return !value || candidate.match(value);
    });

    var hit = candidates.length === 1 && candidates[0] === value;
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


  // --------------------
  // Private
  // --------------------
  _renderTextArea: function _renderTextArea(value) {
    var s = this;
    var props = s.props;

    return _react2.default.createElement('textarea', _extends({}, props, {
      className: (0, _classnames2.default)('ap-text ap-text-multiple', props.className),
      value: value,
      onFocus: ''
    }));
  },
  _renderTextInput: function _renderTextInput(value) {
    var s = this;
    var props = s.props;

    return _react2.default.createElement('input', _extends({}, props, {
      className: (0, _classnames2.default)('ap-text', props.className),
      value: value,
      onFocus: s.handleFocus,
      onKeyUp: s.handleKeyUp,
      onChange: s.handleChange,
      onBlur: s.handleBlur,
      onKeyDown: s.handleKeyDown,
      type: 'text'
    }));
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
          { key: candidate,
            className: (0, _classnames2.default)('ap-text-candidate-list-item', {
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

exports.default = ApText;

},{"classnames":5,"react":"react","react-dom":"react-dom"}],4:[function(require,module,exports){
/**
 * Style for ApText.
 * @class ApTextStyle
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _apemanReactStyle = require('apeman-react-style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @lends ApTextStyle */
var ApTextStyle = _react2.default.createClass({
  displayName: 'ApTextStyle',

  propTypes: {
    type: _react.PropTypes.string,
    style: _react.PropTypes.object,
    highlightColor: _react.PropTypes.string,
    maxWidth: _react.PropTypes.number
  },
  getDefaultProps: function getDefaultProps() {
    return {
      type: 'text/css',
      style: {},
      maxWidth: _apemanReactStyle.ApStyle.CONTENT_WIDTH,
      highlightColor: _apemanReactStyle.ApStyle.DEFAULT_HIGHLIGHT_COLOR
    };
  },
  render: function render() {
    var s = this;
    var props = s.props;
    var highlightColor = props.highlightColor;
    var maxWidth = props.maxWidth;


    var data = {
      '.ap-text': {
        display: 'block',
        padding: '4px 8px',
        border: '1px solid #AAA',
        width: '100%',
        maxWidth: maxWidth + 'px',
        borderRadius: '2px',
        boxSizing: 'border-box',
        outlineColor: '' + highlightColor,
        boxShadow: '1px 1px 1px rgba(0,0,0,.05) inset'
      },
      '.ap-text-wrap': {
        position: 'relative',
        width: '100%',
        margin: '4px',
        verticalAlign: 'middle',
        maxWidth: maxWidth + 'px',
        display: 'block'
      },
      '.ap-text-multiple': {
        overflow: 'auto'
      },
      '.ap-text-candidate-list': {
        position: 'absolute',
        left: 0,
        right: '1px',
        top: '100%',
        zIndex: 4,
        padding: '4px 0',
        margin: '0 1px',
        boxShadow: '1px 1px 2px rgba(0,0,0,0.33)',
        background: 'white',
        boxSizing: 'border-box'
      },
      '.ap-text-candidate-list-item': {
        display: 'block',
        padding: 0,
        margin: 0
      },
      '.ap-text-candidate-list-item a': {
        display: 'block',
        padding: '4px 8px'
      },
      '.ap-text-candidate-list-item a:hover': {
        cursor: 'pointer',
        background: '#FAFAFA'
      },
      '.ap-text-candidate-list-item a:active': {
        background: '#F5F5F5'
      },
      '.ap-text-candidate-list-item-selected a': {
        background: _apemanReactStyle.ApStyle.colorAlpha(highlightColor, 0.33)
      },
      '.ap-text-candidate-list-item-selected a:hover': {
        background: _apemanReactStyle.ApStyle.colorAlpha(highlightColor, 0.5)
      },
      '.ap-text-candidate-list-item-selected a:active': {
        background: _apemanReactStyle.ApStyle.colorAlpha(highlightColor, 0.2)
      }
    };
    var smallMediaData = {};
    var mediumMediaData = {};
    var largeMediaData = {};
    return _react2.default.createElement(
      _apemanReactStyle.ApStyle,
      { data: Object.assign(data, props.style),
        smallMediaData: smallMediaData,
        mediumMediaData: mediumMediaData,
        largeMediaData: largeMediaData
      },
      props.children
    );
  }
});
exports.default = ApTextStyle;

},{"apeman-react-style":"apeman-react-style","react":"react"}],5:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni4wLjAvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkb2MvZGVtby9kZW1vLmJyb3dzZXIuanMiLCIvVXNlcnMvb2t1bmlzaGluaXNoaS9Qcm9qZWN0cy9hcGVtYW4tcHJvamVjdHMvYXBlbWFuLXJlYWN0LXRleHQvZG9jL2RlbW8vZGVtby5jb21wb25lbnQuanN4IiwiL1VzZXJzL29rdW5pc2hpbmlzaGkvUHJvamVjdHMvYXBlbWFuLXByb2plY3RzL2FwZW1hbi1yZWFjdC10ZXh0L2xpYi9hcF90ZXh0LmpzeCIsIi9Vc2Vycy9va3VuaXNoaW5pc2hpL1Byb2plY3RzL2FwZW1hbi1wcm9qZWN0cy9hcGVtYW4tcmVhY3QtdGV4dC9saWIvYXBfdGV4dF9zdHlsZS5qc3giLCJub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBLGEseURBRUEsNEIsMkNBQ0EsMEMsK0NBQ0Esc0QsNkpBRWUsZ0JBQU0sV0FBTixDQUFrQiw4QkFDL0IsZUFEK0IsMkJBQ1osQ0FDakIsT0FBTyxDQUNMLE1BQU8sS0FERixDQUFQLEFBR0QsQ0FMOEIsQ0FNL0IsWUFOK0IsdUJBTWpCLENBTmlCLENBTWQsQ0FDZixJQUFNLEVBQUksSUFBVixDQUNBLEVBQUUsUUFBRixDQUFXLENBQ1QsTUFBTyxFQUFFLE1BQUYsQ0FBUyxLQURQLENBQVgsQ0FHRCxDQVg4QixDQVkvQixNQVorQixrQkFZckIsQ0FDUixJQUFNLEVBQUksSUFBVixDQURRLElBRUYsS0FGRSxDQUVRLENBRlIsQ0FFRixLQUZFLENBR1IsT0FDRSx5Q0FDRSx1REFBYSxlQUFlLFNBQTVCLEVBREYsQ0FFRSxp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O0FBQ3ZDLG9CQUFZO0FBRDJCLE9BaERoQztBQW1EVCxpREFBMkM7QUFDekMsb0JBQVksMEJBQVEsVUFBUixDQUFtQixjQUFuQixFQUFtQyxJQUFuQztBQUQ2QixPQW5EbEM7QUFzRFQsdURBQWlEO0FBQy9DLG9CQUFZLDBCQUFRLFVBQVIsQ0FBbUIsY0FBbkIsRUFBbUMsR0FBbkM7QUFEbUMsT0F0RHhDO0FBeURULHdEQUFrRDtBQUNoRCxvQkFBWSwwQkFBUSxVQUFSLENBQW1CLGNBQW5CLEVBQW1DLEdBQW5DO0FBRG9DO0FBekR6QyxLQUFYO0FBNkRBLFFBQUksaUJBQWlCLEVBQXJCO0FBQ0EsUUFBSSxrQkFBa0IsRUFBdEI7QUFDQSxRQUFJLGlCQUFpQixFQUFyQjtBQUNBLFdBQ0U7QUFBQTtNQUFBLEVBQVMsTUFBTyxPQUFPLE1BQVAsQ0FBYyxJQUFkLEVBQW9CLE1BQU0sS0FBMUIsQ0FBaEI7QUFDUyx3QkFBaUIsY0FEMUI7QUFFUyx5QkFBa0IsZUFGM0I7QUFHUyx3QkFBaUI7QUFIMUI7TUFJRyxNQUFNO0FBSlQsS0FERjtBQU9EO0FBNUZtQyxDQUFsQixDQUFwQjtrQkE4RmUsVzs7O0FDekdmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcbmNvbnN0IFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJylcblxuY29uc3QgRGVtbyA9IHJlcXVpcmUoJy4vZGVtby5jb21wb25lbnQuanMnKS5kZWZhdWx0XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gb25Mb2FkICgpIHtcbiAgd2luZG93LlJlYWN0ID0gUmVhY3RcbiAgbGV0IERlbW9GYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShEZW1vKVxuICBSZWFjdERPTS5yZW5kZXIoRGVtb0ZhY3RvcnkoKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbW8td3JhcCcpKVxufSlcbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgQXBUZXh0IGZyb20gJy4uLy4uL2xpYi9hcF90ZXh0J1xuaW1wb3J0IEFwVGV4dFN0eWxlIGZyb20gJy4uLy4uL2xpYi9hcF90ZXh0X3N0eWxlJ1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiAnYmFuJ1xuICAgIH1cbiAgfSxcbiAgaGFuZGxlQ2hhbmdlIChlKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlOiBlLnRhcmdldC52YWx1ZVxuICAgIH0pXG4gIH0sXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBzdGF0ZSB9ID0gc1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QXBUZXh0U3R5bGUgaGlnaGxpZ2h0Q29sb3I9XCIjYjM1NjAwXCIvPlxuICAgICAgICA8QXBUZXh0IG9uQ2hhbmdlPXsgcy5oYW5kbGVDaGFuZ2UgfSB2YWx1ZT17IHN0YXRlLnZhbHVlIH0vPlxuICAgICAgICA8QXBUZXh0IG9uQ2hhbmdlPXsgcy5oYW5kbGVDaGFuZ2UgfSB2YWx1ZT17IHN0YXRlLnZhbHVlIH0gcm93cz17Mn0vPlxuICAgICAgICA8QXBUZXh0IG9uQ2hhbmdlPXsgcy5oYW5kbGVDaGFuZ2UgfSB2YWx1ZT17IHN0YXRlLnZhbHVlIH1cbiAgICAgICAgICAgICAgICBjYW5kaWRhdGVzPXsgWyAnYmFuYW5hJywgJ29yYW5nZScsICdhcHBsZScgXSB9Lz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSlcbiIsIi8qKlxuICogYXBlbWFuIHJlYWN0IHBhY2thZ2UgdGV4dCBjb21wb25lbnQuXG4gKiBAY2xhc3MgQXBUZXh0XG4gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlcyBhcyB0eXBlc30gZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcblxuLyoqIEBsZW5kcyBBcFRleHQgKi9cbmNvbnN0IEFwVGV4dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTcGVjc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHByb3BUeXBlczoge1xuICAgIC8qKiBOYW1lIG9mIHRleHQgaW5wdXQgKi9cbiAgICBuYW1lOiB0eXBlcy5zdHJpbmcsXG4gICAgLyoqIFZhbHVlIG9mIHRleHQgaW5wdXQgKi9cbiAgICB2YWx1ZTogdHlwZXMuc3RyaW5nLFxuICAgIC8qKiBQbGFjZWhvbGRlciB0ZXh0ICovXG4gICAgcGxhY2Vob2xkZXI6IHR5cGVzLnN0cmluZyxcbiAgICAvKiogTnVtYmVyIG9mIHJvd3MgKi9cbiAgICByb3dzOiB0eXBlcy5udW1iZXIsXG4gICAgLyoqIFNlbGVjdGFibGUgY2FuZGlkYXRlIHRleHQgKi9cbiAgICBjYW5kaWRhdGVzOiB0eXBlcy5hcnJheU9mKHR5cGVzLnN0cmluZylcbiAgfSxcblxuICBnZXRJbml0aWFsU3RhdGUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdWdnZXN0aW5nOiBmYWxzZSxcbiAgICAgIGNhbmRpZGF0ZXM6IG51bGwsXG4gICAgICBzZWxlY3RlZENhbmRpZGF0ZTogbnVsbFxuICAgIH1cbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnJyxcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnJyxcbiAgICAgIHJvd3M6IDEsXG4gICAgICBjYW5kaWRhdGVzOiBudWxsXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBzdGF0ZSwgcHJvcHMgfSA9IHNcbiAgICBsZXQgeyB2YWx1ZSB9ID0gcHJvcHNcbiAgICBsZXQgaGFzVmFsID0gISF2YWx1ZVxuXG4gICAgbGV0IG11bHRpbGluZSA9IHByb3BzLnJvd3MgPiAxXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17IGNsYXNzbmFtZXMoJ2FwLXRleHQtd3JhcCcsIHsgJ2FwLXRleHQtd3JhcC1lbXB0eSc6ICFoYXNWYWwgfSkgfT5cbiAgICAgICAge1xuICAgICAgICAgIG11bHRpbGluZSA/IHMuX3JlbmRlclRleHRBcmVhKHZhbHVlKSA6IHMuX3JlbmRlclRleHRJbnB1dCh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGUuc3VnZ2VzdGluZyA/IHMuX3JlbmRlckNhbmRpZGF0ZUxpc3Qoc3RhdGUuY2FuZGlkYXRlcywgc3RhdGUuc2VsZWN0ZWRDYW5kaWRhdGUsIG11bHRpbGluZSkgOiBudWxsXG4gICAgICAgIH1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICApXG4gIH0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ3VzdG9tXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgaGFuZGxlQ2FuZGlkYXRlIChlKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuICAgIGUudGFyZ2V0LnZhbHVlID0gZS50YXJnZXQudmFsdWUgfHwgZS50YXJnZXQuZGF0YXNldC52YWx1ZVxuICAgIHMuc2V0U3RhdGUoeyBzdWdnZXN0aW5nOiBmYWxzZSB9KVxuICAgIGlmIChwcm9wcy5vbkNoYW5nZSkge1xuICAgICAgcHJvcHMub25DaGFuZ2UoZSlcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlRm9jdXMgKGUpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgcy5zZXRTdGF0ZSh7IHN1Z2dlc3Rpbmc6IHRydWUgfSlcbiAgICBzLnVwZGF0ZUNhbmRpZGF0ZXMoKVxuICAgIGlmIChwcm9wcy5vbkZvY3VzKSB7XG4gICAgICBwcm9wcy5vbkZvY3VzKGUpXG4gICAgfVxuICB9LFxuXG4gIGhhbmRsZUNoYW5nZSAoZSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICBzLnNldFN0YXRlKHsgc3VnZ2VzdGluZzogdHJ1ZSB9KVxuICAgIGlmIChwcm9wcy5vbkNoYW5nZSkge1xuICAgICAgcHJvcHMub25DaGFuZ2UoZSlcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlQmx1ciAoZSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICBpZiAocHJvcHMub25CbHVyKSB7XG4gICAgICBwcm9wcy5vbkJsdXIoZSlcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlS2V5VXAgKGUpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgcy51cGRhdGVDYW5kaWRhdGVzKClcbiAgICBpZiAocHJvcHMub25LZXlVcCkge1xuICAgICAgcHJvcHMub25LZXlVcChlKVxuICAgIH1cbiAgfSxcblxuICBoYW5kbGVLZXlEb3duIChlKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDM4OiAvLyBVUFxuICAgICAgICBzLm1vdmVDYW5kaWRhdGVJbmRleCgtMSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNDA6IC8vIERPV05cbiAgICAgICAgcy5tb3ZlQ2FuZGlkYXRlSW5kZXgoKzEpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDEzOiAvLyBFbnRlclxuICAgICAgICBzLmVudGVyQ2FuZGlkYXRlKClcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHMuc2V0U3RhdGUoeyBzdWdnZXN0aW5nOiB0cnVlIH0pXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICAgIGlmIChwcm9wcy5vbktleURvd24pIHtcbiAgICAgIHByb3BzLm9uS2V5RG93bihlKVxuICAgIH1cbiAgfSxcblxuICBtb3ZlQ2FuZGlkYXRlSW5kZXggKGFtb3VudCkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgY2FuZGlkYXRlcywgc2VsZWN0ZWRDYW5kaWRhdGUgfSA9IHMuc3RhdGVcbiAgICBpZiAoIWNhbmRpZGF0ZXMpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgaW5kZXggPSBjYW5kaWRhdGVzLmluZGV4T2Yoc2VsZWN0ZWRDYW5kaWRhdGUpICsgYW1vdW50XG4gICAgbGV0IG92ZXIgPSAoaW5kZXggPT09IC0xKSB8fCAoaW5kZXggPT09IGNhbmRpZGF0ZXMubGVuZ3RoKVxuICAgIGlmIChvdmVyKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZENhbmRpZGF0ZTogY2FuZGlkYXRlc1sgaW5kZXggXSB8fCBudWxsXG4gICAgfSlcbiAgfSxcblxuICB1cGRhdGVDYW5kaWRhdGVzICgpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgbGV0IHZhbHVlID0gcHJvcHMudmFsdWVcbiAgICBsZXQgY2FuZGlkYXRlcyA9IChwcm9wcy5jYW5kaWRhdGVzIHx8IFtdKVxuICAgICAgLmZpbHRlcigoY2FuZGlkYXRlKSA9PiAhIWNhbmRpZGF0ZSlcbiAgICAgIC5tYXAoKGNhbmRpZGF0ZSkgPT4gU3RyaW5nKGNhbmRpZGF0ZSkudHJpbSgpKVxuICAgICAgLmZpbHRlcigoY2FuZGlkYXRlKSA9PiAhdmFsdWUgfHwgY2FuZGlkYXRlLm1hdGNoKHZhbHVlKSlcblxuICAgIGxldCBoaXQgPSAoY2FuZGlkYXRlcy5sZW5ndGggPT09IDEpICYmIChjYW5kaWRhdGVzWyAwIF0gPT09IHZhbHVlKVxuICAgIGlmIChoaXQpIHtcbiAgICAgIGNhbmRpZGF0ZXMgPSBudWxsXG4gICAgfVxuICAgIHMuc2V0U3RhdGUoeyBjYW5kaWRhdGVzIH0pXG4gIH0sXG5cbiAgZW50ZXJDYW5kaWRhdGUgKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICBsZXQgeyBjYW5kaWRhdGVzLCBzZWxlY3RlZENhbmRpZGF0ZSB9ID0gcy5zdGF0ZVxuICAgIGxldCB2YWxpZCA9IGNhbmRpZGF0ZXMgJiYgISF+Y2FuZGlkYXRlcy5pbmRleE9mKHNlbGVjdGVkQ2FuZGlkYXRlKVxuICAgIGlmICh2YWxpZCkge1xuICAgICAgbGV0IHRhcmdldCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHMucmVmc1sgYGNhbmRpZGF0ZS0ke3NlbGVjdGVkQ2FuZGlkYXRlfWAgXSlcbiAgICAgIHRhcmdldC52YWx1ZSA9IHNlbGVjdGVkQ2FuZGlkYXRlXG4gICAgICBpZiAocHJvcHMub25DaGFuZ2UpIHtcbiAgICAgICAgcHJvcHMub25DaGFuZ2UoeyB0YXJnZXQgfSlcbiAgICAgIH1cbiAgICAgIHMuc2V0U3RhdGUoeyBzdWdnZXN0aW5nOiBmYWxzZSB9KVxuICAgIH1cbiAgfSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQcml2YXRlXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIF9yZW5kZXJUZXh0QXJlYSAodmFsdWUpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgcmV0dXJuIChcbiAgICAgIDx0ZXh0YXJlYSB7IC4uLnByb3BzIH1cbiAgICAgICAgY2xhc3NOYW1lPXsgY2xhc3NuYW1lcygnYXAtdGV4dCBhcC10ZXh0LW11bHRpcGxlJywgcHJvcHMuY2xhc3NOYW1lKSB9XG4gICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICBvbkZvY3VzPVwiXCJcbiAgICAgID5cbiAgICAgICAgICAgICAgICA8L3RleHRhcmVhPlxuICAgIClcbiAgfSxcbiAgX3JlbmRlclRleHRJbnB1dCAodmFsdWUpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dCB7IC4uLnByb3BzIH1cbiAgICAgICAgY2xhc3NOYW1lPXsgY2xhc3NuYW1lcygnYXAtdGV4dCcsIHByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICBvbkZvY3VzPXsgcy5oYW5kbGVGb2N1cyB9XG4gICAgICAgIG9uS2V5VXA9eyBzLmhhbmRsZUtleVVwIH1cbiAgICAgICAgb25DaGFuZ2U9eyBzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgIG9uQmx1cj17IHMuaGFuZGxlQmx1ciB9XG4gICAgICAgIG9uS2V5RG93bj17IHMuaGFuZGxlS2V5RG93biB9XG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgIC8+XG4gICAgKVxuICB9LFxuICBfcmVuZGVyQ2FuZGlkYXRlTGlzdCAoY2FuZGlkYXRlcywgc2VsZWN0ZWRDYW5kaWRhdGUsIG11bHRpbGluZSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICBpZiAobXVsdGlsaW5lKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1tBcFRleHRdIENhbiBub3QgdXNlIGNhbmRpZGF0ZXMgd2l0aCBtdWx0aWxpbmUgaW5wdXQuJylcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgaWYgKCFjYW5kaWRhdGVzKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGlmICghY2FuZGlkYXRlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiYXAtdGV4dC1jYW5kaWRhdGUtbGlzdFwiPlxuICAgICAgICB7XG4gICAgICAgICAgY2FuZGlkYXRlcy5tYXAoKGNhbmRpZGF0ZSkgPT5cbiAgICAgICAgICAgIDxsaSBrZXk9eyBjYW5kaWRhdGUgfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IGNsYXNzbmFtZXMoJ2FwLXRleHQtY2FuZGlkYXRlLWxpc3QtaXRlbScsIHtcbiAgICAgICAgICAgICAgICAgICdhcC10ZXh0LWNhbmRpZGF0ZS1saXN0LWl0ZW0tc2VsZWN0ZWQnOiBjYW5kaWRhdGUgPT09IHNlbGVjdGVkQ2FuZGlkYXRlXG4gICAgICAgICAgICAgICAgfSkgfT5cbiAgICAgICAgICAgICAgPGEgb25DbGljaz17cy5oYW5kbGVDYW5kaWRhdGV9XG4gICAgICAgICAgICAgICAgIHJlZj17YGNhbmRpZGF0ZS0ke2NhbmRpZGF0ZX1gfVxuICAgICAgICAgICAgICAgICBkYXRhLXZhbHVlPXsgY2FuZGlkYXRlIH0+eyBjYW5kaWRhdGUgfTwvYT5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICA8L3VsPlxuICAgIClcbiAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQXBUZXh0XG4iLCIvKipcbiAqIFN0eWxlIGZvciBBcFRleHQuXG4gKiBAY2xhc3MgQXBUZXh0U3R5bGVcbiAqL1xuXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzIGFzIHR5cGVzfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7QXBTdHlsZX0gZnJvbSAnYXBlbWFuLXJlYWN0LXN0eWxlJ1xuXG4vKiogQGxlbmRzIEFwVGV4dFN0eWxlICovXG5jb25zdCBBcFRleHRTdHlsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcHJvcFR5cGVzOiB7XG4gICAgdHlwZTogdHlwZXMuc3RyaW5nLFxuICAgIHN0eWxlOiB0eXBlcy5vYmplY3QsXG4gICAgaGlnaGxpZ2h0Q29sb3I6IHR5cGVzLnN0cmluZyxcbiAgICBtYXhXaWR0aDogdHlwZXMubnVtYmVyXG4gIH0sXG4gIGdldERlZmF1bHRQcm9wcyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICd0ZXh0L2NzcycsXG4gICAgICBzdHlsZToge30sXG4gICAgICBtYXhXaWR0aDogQXBTdHlsZS5DT05URU5UX1dJRFRILFxuICAgICAgaGlnaGxpZ2h0Q29sb3I6IEFwU3R5bGUuREVGQVVMVF9ISUdITElHSFRfQ09MT1JcbiAgICB9XG4gIH0sXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuXG4gICAgbGV0IHsgaGlnaGxpZ2h0Q29sb3IsIG1heFdpZHRoIH0gPSBwcm9wc1xuXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICAnLmFwLXRleHQnOiB7XG4gICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgIHBhZGRpbmc6ICc0cHggOHB4JyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNBQUEnLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBtYXhXaWR0aDogYCR7bWF4V2lkdGh9cHhgLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICcycHgnLFxuICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgb3V0bGluZUNvbG9yOiBgJHtoaWdobGlnaHRDb2xvcn1gLFxuICAgICAgICBib3hTaGFkb3c6ICcxcHggMXB4IDFweCByZ2JhKDAsMCwwLC4wNSkgaW5zZXQnXG4gICAgICB9LFxuICAgICAgJy5hcC10ZXh0LXdyYXAnOiB7XG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBtYXJnaW46ICc0cHgnLFxuICAgICAgICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbiAgICAgICAgbWF4V2lkdGg6IGAke21heFdpZHRofXB4YCxcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgICAgfSxcbiAgICAgICcuYXAtdGV4dC1tdWx0aXBsZSc6IHtcbiAgICAgICAgb3ZlcmZsb3c6ICdhdXRvJ1xuICAgICAgfSxcbiAgICAgICcuYXAtdGV4dC1jYW5kaWRhdGUtbGlzdCc6IHtcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAnMXB4JyxcbiAgICAgICAgdG9wOiAnMTAwJScsXG4gICAgICAgIHpJbmRleDogNCxcbiAgICAgICAgcGFkZGluZzogJzRweCAwJyxcbiAgICAgICAgbWFyZ2luOiAnMCAxcHgnLFxuICAgICAgICBib3hTaGFkb3c6ICcxcHggMXB4IDJweCByZ2JhKDAsMCwwLDAuMzMpJyxcbiAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcbiAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCdcbiAgICAgIH0sXG4gICAgICAnLmFwLXRleHQtY2FuZGlkYXRlLWxpc3QtaXRlbSc6IHtcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgbWFyZ2luOiAwXG4gICAgICB9LFxuICAgICAgJy5hcC10ZXh0LWNhbmRpZGF0ZS1saXN0LWl0ZW0gYSc6IHtcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgcGFkZGluZzogJzRweCA4cHgnXG4gICAgICB9LFxuICAgICAgJy5hcC10ZXh0LWNhbmRpZGF0ZS1saXN0LWl0ZW0gYTpob3Zlcic6IHtcbiAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgIGJhY2tncm91bmQ6ICcjRkFGQUZBJ1xuICAgICAgfSxcbiAgICAgICcuYXAtdGV4dC1jYW5kaWRhdGUtbGlzdC1pdGVtIGE6YWN0aXZlJzoge1xuICAgICAgICBiYWNrZ3JvdW5kOiAnI0Y1RjVGNSdcbiAgICAgIH0sXG4gICAgICAnLmFwLXRleHQtY2FuZGlkYXRlLWxpc3QtaXRlbS1zZWxlY3RlZCBhJzoge1xuICAgICAgICBiYWNrZ3JvdW5kOiBBcFN0eWxlLmNvbG9yQWxwaGEoaGlnaGxpZ2h0Q29sb3IsIDAuMzMpXG4gICAgICB9LFxuICAgICAgJy5hcC10ZXh0LWNhbmRpZGF0ZS1saXN0LWl0ZW0tc2VsZWN0ZWQgYTpob3Zlcic6IHtcbiAgICAgICAgYmFja2dyb3VuZDogQXBTdHlsZS5jb2xvckFscGhhKGhpZ2hsaWdodENvbG9yLCAwLjUpXG4gICAgICB9LFxuICAgICAgJy5hcC10ZXh0LWNhbmRpZGF0ZS1saXN0LWl0ZW0tc2VsZWN0ZWQgYTphY3RpdmUnOiB7XG4gICAgICAgIGJhY2tncm91bmQ6IEFwU3R5bGUuY29sb3JBbHBoYShoaWdobGlnaHRDb2xvciwgMC4yKVxuICAgICAgfVxuICAgIH1cbiAgICBsZXQgc21hbGxNZWRpYURhdGEgPSB7fVxuICAgIGxldCBtZWRpdW1NZWRpYURhdGEgPSB7fVxuICAgIGxldCBsYXJnZU1lZGlhRGF0YSA9IHt9XG4gICAgcmV0dXJuIChcbiAgICAgIDxBcFN0eWxlIGRhdGE9eyBPYmplY3QuYXNzaWduKGRhdGEsIHByb3BzLnN0eWxlKSB9XG4gICAgICAgICAgICAgICBzbWFsbE1lZGlhRGF0YT17IHNtYWxsTWVkaWFEYXRhIH1cbiAgICAgICAgICAgICAgIG1lZGl1bU1lZGlhRGF0YT17IG1lZGl1bU1lZGlhRGF0YSB9XG4gICAgICAgICAgICAgICBsYXJnZU1lZGlhRGF0YT17IGxhcmdlTWVkaWFEYXRhIH1cbiAgICAgID57IHByb3BzLmNoaWxkcmVuIH08L0FwU3R5bGU+XG4gICAgKVxuICB9XG59KVxuZXhwb3J0IGRlZmF1bHQgQXBUZXh0U3R5bGVcbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIl19
