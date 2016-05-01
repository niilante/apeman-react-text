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
    /** Placehoder text */
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

},{"classnames":"classnames","react":"react","react-dom":"react-dom"}],4:[function(require,module,exports){
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
    scoped: _react.PropTypes.bool,
    type: _react.PropTypes.string,
    style: _react.PropTypes.object,
    highlightColor: _react.PropTypes.string,
    maxWidth: _react.PropTypes.number
  },
  getDefaultProps: function getDefaultProps() {
    return {
      scoped: false,
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
      { scoped: props.scoped,
        data: Object.assign(data, props.style),
        smallMediaData: smallMediaData,
        mediumMediaData: mediumMediaData,
        largeMediaData: largeMediaData
      },
      props.children
    );
  }
});
exports.default = ApTextStyle;

},{"apeman-react-style":"apeman-react-style","react":"react"}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni4wLjAvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkb2MvZGVtby9kZW1vLmJyb3dzZXIuanMiLCIvVXNlcnMvb2t1bmlzaGluaXNoaS9Qcm9qZWN0cy9hcGVtYW4tcHJvamVjdHMvYXBlbWFuLXJlYWN0LXRleHQvZG9jL2RlbW8vZGVtby5jb21wb25lbnQuanN4IiwiL1VzZXJzL29rdW5pc2hpbmlzaGkvUHJvamVjdHMvYXBlbWFuLXByb2plY3RzL2FwZW1hbi1yZWFjdC10ZXh0L2xpYi9hcF90ZXh0LmpzeCIsIi9Vc2Vycy9va3VuaXNoaW5pc2hpL1Byb2plY3RzL2FwZW1hbi1wcm9qZWN0cy9hcGVtYW4tcmVhY3QtdGV4dC9saWIvYXBfdGV4dF9zdHlsZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQSxhLHlEQUVBLDRCLDJDQUNBLDBDLCtDQUNBLHNELDZKQUVlLGdCQUFNLFdBQU4sQ0FBa0IsOEJBQy9CLGVBRCtCLDJCQUNaLENBQ2pCLE9BQU8sQ0FDTCxNQUFPLEtBREYsQ0FBUCxBQUdELENBTDhCLENBTS9CLFlBTitCLHVCQU1qQixDQU5pQixDQU1kLENBQ2YsSUFBTSxFQUFJLElBQVYsQ0FDQSxFQUFFLFFBQUYsQ0FBVyxDQUNULE1BQU8sRUFBRSxNQUFGLENBQVMsS0FEUCxDQUFYLENBR0QsQ0FYOEIsQ0FZL0IsTUFaK0Isa0JBWXJCLENBQ1IsSUFBTSxFQUFJLElBQVYsQ0FEUSxJQUVGLEtBRkUsQ0FFUSxDQUZSLENBRUYsS0FGRSxDQUdSLE9BQ0UseUNBQ0UsdURBQWEsZUFBZSxTQUE1QixFQURGLENBRUUsaURBQVEsU0FBVyxFQUFFLFlBQXJCLENBQW9DLE1BQVEsTUFB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QUFnRFQsK0NBQXlDO0FBQ3ZDLG9CQUFZO0FBRDJCLE9BaERoQztBQW1EVCxpREFBMkM7QUFDekMsb0JBQVksMEJBQVEsVUFBUixDQUFtQixjQUFuQixFQUFtQyxJQUFuQztBQUQ2QixPQW5EbEM7QUFzRFQsdURBQWlEO0FBQy9DLG9CQUFZLDBCQUFRLFVBQVIsQ0FBbUIsY0FBbkIsRUFBbUMsR0FBbkM7QUFEbUMsT0F0RHhDO0FBeURULHdEQUFrRDtBQUNoRCxvQkFBWSwwQkFBUSxVQUFSLENBQW1CLGNBQW5CLEVBQW1DLEdBQW5DO0FBRG9DO0FBekR6QyxLQUFYO0FBNkRBLFFBQUksaUJBQWlCLEVBQXJCO0FBQ0EsUUFBSSxrQkFBa0IsRUFBdEI7QUFDQSxRQUFJLGlCQUFpQixFQUFyQjtBQUNBLFdBQ0U7QUFBQTtNQUFBLEVBQVMsUUFBUyxNQUFNLE1BQXhCO0FBQ1MsY0FBTyxPQUFPLE1BQVAsQ0FBYyxJQUFkLEVBQW9CLE1BQU0sS0FBMUIsQ0FEaEI7QUFFUyx3QkFBaUIsY0FGMUI7QUFHUyx5QkFBa0IsZUFIM0I7QUFJUyx3QkFBaUI7QUFKMUI7TUFLRyxNQUFNO0FBTFQsS0FERjtBQVFEO0FBL0ZtQyxDQUFsQixDQUFwQjtrQkFpR2UsVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcblxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG5jb25zdCBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpXG5cbmNvbnN0IERlbW8gPSByZXF1aXJlKCcuL2RlbW8uY29tcG9uZW50LmpzJykuZGVmYXVsdFxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uIG9uTG9hZCAoKSB7XG4gIHdpbmRvdy5SZWFjdCA9IFJlYWN0XG4gIGxldCBEZW1vRmFjdG9yeSA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoRGVtbylcbiAgUmVhY3RET00ucmVuZGVyKERlbW9GYWN0b3J5KCksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZW1vLXdyYXAnKSlcbn0pXG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEFwVGV4dCBmcm9tICcuLi8uLi9saWIvYXBfdGV4dCdcbmltcG9ydCBBcFRleHRTdHlsZSBmcm9tICcuLi8uLi9saWIvYXBfdGV4dF9zdHlsZSdcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJ2JhbidcbiAgICB9XG4gIH0sXG4gIGhhbmRsZUNoYW5nZSAoZSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgcy5zZXRTdGF0ZSh7XG4gICAgICB2YWx1ZTogZS50YXJnZXQudmFsdWVcbiAgICB9KVxuICB9LFxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgc3RhdGUgfSA9IHNcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEFwVGV4dFN0eWxlIGhpZ2hsaWdodENvbG9yPVwiI2IzNTYwMFwiLz5cbiAgICAgICAgPEFwVGV4dCBvbkNoYW5nZT17IHMuaGFuZGxlQ2hhbmdlIH0gdmFsdWU9eyBzdGF0ZS52YWx1ZSB9Lz5cbiAgICAgICAgPEFwVGV4dCBvbkNoYW5nZT17IHMuaGFuZGxlQ2hhbmdlIH0gdmFsdWU9eyBzdGF0ZS52YWx1ZSB9IHJvd3M9ezJ9Lz5cbiAgICAgICAgPEFwVGV4dCBvbkNoYW5nZT17IHMuaGFuZGxlQ2hhbmdlIH0gdmFsdWU9eyBzdGF0ZS52YWx1ZSB9XG4gICAgICAgICAgICAgICAgY2FuZGlkYXRlcz17IFsgJ2JhbmFuYScsICdvcmFuZ2UnLCAnYXBwbGUnIF0gfS8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn0pXG4iLCIvKipcbiAqIGFwZW1hbiByZWFjdCBwYWNrYWdlIHRleHQgY29tcG9uZW50LlxuICogQGNsYXNzIEFwVGV4dFxuICovXG5cbid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXMgYXMgdHlwZXN9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5cbi8qKiBAbGVuZHMgQXBUZXh0ICovXG5jb25zdCBBcFRleHQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU3BlY3NcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBwcm9wVHlwZXM6IHtcbiAgICAvKiogTmFtZSBvZiB0ZXh0IGlucHV0ICovXG4gICAgbmFtZTogdHlwZXMuc3RyaW5nLFxuICAgIC8qKiBWYWx1ZSBvZiB0ZXh0IGlucHV0ICovXG4gICAgdmFsdWU6IHR5cGVzLnN0cmluZyxcbiAgICAvKiogUGxhY2Vob2RlciB0ZXh0ICovXG4gICAgcGxhY2Vob2xkZXI6IHR5cGVzLnN0cmluZyxcbiAgICAvKiogTnVtYmVyIG9mIHJvd3MgKi9cbiAgICByb3dzOiB0eXBlcy5udW1iZXIsXG4gICAgLyoqIFNlbGVjdGFibGUgY2FuZGlkYXRlIHRleHQgKi9cbiAgICBjYW5kaWRhdGVzOiB0eXBlcy5hcnJheU9mKHR5cGVzLnN0cmluZylcbiAgfSxcblxuICBnZXRJbml0aWFsU3RhdGUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdWdnZXN0aW5nOiBmYWxzZSxcbiAgICAgIGNhbmRpZGF0ZXM6IG51bGwsXG4gICAgICBzZWxlY3RlZENhbmRpZGF0ZTogbnVsbFxuICAgIH1cbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnJyxcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgICAgcm93czogMSxcbiAgICAgIGNhbmRpZGF0ZXM6IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHN0YXRlLCBwcm9wcyB9ID0gc1xuICAgIGxldCB2YWx1ZSA9IHByb3BzLnZhbHVlIHx8IG51bGxcbiAgICBsZXQgaGFzVmFsID0gISF2YWx1ZVxuXG4gICAgbGV0IG11bHRpbGluZSA9IHByb3BzLnJvd3MgPiAxXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17IGNsYXNzbmFtZXMoJ2FwLXRleHQtd3JhcCcsIHsgJ2FwLXRleHQtd3JhcC1lbXB0eSc6ICFoYXNWYWwgfSkgfT5cbiAgICAgICAge1xuICAgICAgICAgIG11bHRpbGluZSA/IHMuX3JlbmRlclRleHRBcmVhKHZhbHVlKSA6IHMuX3JlbmRlclRleHRJbnB1dCh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGUuc3VnZ2VzdGluZyA/IHMuX3JlbmRlckNhbmRpZGF0ZUxpc3Qoc3RhdGUuY2FuZGlkYXRlcywgc3RhdGUuc2VsZWN0ZWRDYW5kaWRhdGUsIG11bHRpbGluZSkgOiBudWxsXG4gICAgICAgIH1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICApXG4gIH0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ3VzdG9tXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgaGFuZGxlQ2FuZGlkYXRlIChlKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuICAgIGUudGFyZ2V0LnZhbHVlID0gZS50YXJnZXQudmFsdWUgfHwgZS50YXJnZXQuZGF0YXNldC52YWx1ZVxuICAgIHMuc2V0U3RhdGUoeyBzdWdnZXN0aW5nOiBmYWxzZSB9KVxuICAgIGlmIChwcm9wcy5vbkNoYW5nZSkge1xuICAgICAgcHJvcHMub25DaGFuZ2UoZSlcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlRm9jdXMgKGUpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgcy5zZXRTdGF0ZSh7IHN1Z2dlc3Rpbmc6IHRydWUgfSlcbiAgICBzLnVwZGF0ZUNhbmRpZGF0ZXMoKVxuICAgIGlmIChwcm9wcy5vbkZvY3VzKSB7XG4gICAgICBwcm9wcy5vbkZvY3VzKGUpXG4gICAgfVxuICB9LFxuXG4gIGhhbmRsZUNoYW5nZSAoZSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICBzLnNldFN0YXRlKHsgc3VnZ2VzdGluZzogdHJ1ZSB9KVxuICAgIGlmIChwcm9wcy5vbkNoYW5nZSkge1xuICAgICAgcHJvcHMub25DaGFuZ2UoZSlcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlQmx1ciAoZSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICBpZiAocHJvcHMub25CbHVyKSB7XG4gICAgICBwcm9wcy5vbkJsdXIoZSlcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlS2V5VXAgKGUpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgcy51cGRhdGVDYW5kaWRhdGVzKClcbiAgICBpZiAocHJvcHMub25LZXlVcCkge1xuICAgICAgcHJvcHMub25LZXlVcChlKVxuICAgIH1cbiAgfSxcblxuICBoYW5kbGVLZXlEb3duIChlKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDM4OiAvLyBVUFxuICAgICAgICBzLm1vdmVDYW5kaWRhdGVJbmRleCgtMSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNDA6IC8vIERPV05cbiAgICAgICAgcy5tb3ZlQ2FuZGlkYXRlSW5kZXgoKzEpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDEzOiAvLyBFbnRlclxuICAgICAgICBzLmVudGVyQ2FuZGlkYXRlKClcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHMuc2V0U3RhdGUoeyBzdWdnZXN0aW5nOiB0cnVlIH0pXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICAgIGlmIChwcm9wcy5vbktleURvd24pIHtcbiAgICAgIHByb3BzLm9uS2V5RG93bihlKVxuICAgIH1cbiAgfSxcblxuICBtb3ZlQ2FuZGlkYXRlSW5kZXggKGFtb3VudCkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgY2FuZGlkYXRlcywgc2VsZWN0ZWRDYW5kaWRhdGUgfSA9IHMuc3RhdGVcbiAgICBpZiAoIWNhbmRpZGF0ZXMpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgaW5kZXggPSBjYW5kaWRhdGVzLmluZGV4T2Yoc2VsZWN0ZWRDYW5kaWRhdGUpICsgYW1vdW50XG4gICAgbGV0IG92ZXIgPSAoaW5kZXggPT09IC0xKSB8fCAoaW5kZXggPT09IGNhbmRpZGF0ZXMubGVuZ3RoKVxuICAgIGlmIChvdmVyKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZENhbmRpZGF0ZTogY2FuZGlkYXRlc1sgaW5kZXggXSB8fCBudWxsXG4gICAgfSlcbiAgfSxcblxuICB1cGRhdGVDYW5kaWRhdGVzICgpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgbGV0IHZhbHVlID0gcHJvcHMudmFsdWVcbiAgICBsZXQgY2FuZGlkYXRlcyA9IChwcm9wcy5jYW5kaWRhdGVzIHx8IFtdKVxuICAgICAgLmZpbHRlcigoY2FuZGlkYXRlKSA9PiAhIWNhbmRpZGF0ZSlcbiAgICAgIC5tYXAoKGNhbmRpZGF0ZSkgPT4gU3RyaW5nKGNhbmRpZGF0ZSkudHJpbSgpKVxuICAgICAgLmZpbHRlcigoY2FuZGlkYXRlKSA9PiAhdmFsdWUgfHwgY2FuZGlkYXRlLm1hdGNoKHZhbHVlKSlcblxuICAgIGxldCBoaXQgPSAoY2FuZGlkYXRlcy5sZW5ndGggPT09IDEpICYmIChjYW5kaWRhdGVzWyAwIF0gPT09IHZhbHVlKVxuICAgIGlmIChoaXQpIHtcbiAgICAgIGNhbmRpZGF0ZXMgPSBudWxsXG4gICAgfVxuICAgIHMuc2V0U3RhdGUoeyBjYW5kaWRhdGVzIH0pXG4gIH0sXG5cbiAgZW50ZXJDYW5kaWRhdGUgKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICBsZXQgeyBjYW5kaWRhdGVzLCBzZWxlY3RlZENhbmRpZGF0ZSB9ID0gcy5zdGF0ZVxuICAgIGxldCB2YWxpZCA9IGNhbmRpZGF0ZXMgJiYgISF+Y2FuZGlkYXRlcy5pbmRleE9mKHNlbGVjdGVkQ2FuZGlkYXRlKVxuICAgIGlmICh2YWxpZCkge1xuICAgICAgbGV0IHRhcmdldCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHMucmVmc1sgYGNhbmRpZGF0ZS0ke3NlbGVjdGVkQ2FuZGlkYXRlfWAgXSlcbiAgICAgIHRhcmdldC52YWx1ZSA9IHNlbGVjdGVkQ2FuZGlkYXRlXG4gICAgICBpZiAocHJvcHMub25DaGFuZ2UpIHtcbiAgICAgICAgcHJvcHMub25DaGFuZ2UoeyB0YXJnZXQgfSlcbiAgICAgIH1cbiAgICAgIHMuc2V0U3RhdGUoeyBzdWdnZXN0aW5nOiBmYWxzZSB9KVxuICAgIH1cbiAgfSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQcml2YXRlXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIF9yZW5kZXJUZXh0QXJlYSAodmFsdWUpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgcmV0dXJuIChcbiAgICAgIDx0ZXh0YXJlYSBjbGFzc05hbWU9eyBjbGFzc25hbWVzKCdhcC10ZXh0IGFwLXRleHQtbXVsdGlwbGUnLCBwcm9wcy5jbGFzc05hbWUpIH1cbiAgICAgICAgICAgICAgICB2YWx1ZT17IHZhbHVlIH1cbiAgICAgICAgICAgICAgICBvbkZvY3VzPVwiXCJcbiAgICAgICAgeyAuLi5wcm9wcyB9PlxuICAgICAgICAgICAgICAgIDwvdGV4dGFyZWE+XG4gICAgKVxuICB9LFxuICBfcmVuZGVyVGV4dElucHV0ICh2YWx1ZSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0IGNsYXNzTmFtZT17IGNsYXNzbmFtZXMoJ2FwLXRleHQnLCBwcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgICAgIG9uRm9jdXM9eyBzLmhhbmRsZUZvY3VzIH1cbiAgICAgICAgICAgICBvbktleVVwPXsgcy5oYW5kbGVLZXlVcCB9XG4gICAgICAgICAgICAgb25DaGFuZ2U9eyBzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgICAgb25CbHVyPXsgcy5oYW5kbGVCbHVyIH1cbiAgICAgICAgICAgICBvbktleURvd249eyBzLmhhbmRsZUtleURvd24gfVxuICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgeyAuLi5wcm9wcyB9IC8+XG4gICAgKVxuICB9LFxuICBfcmVuZGVyQ2FuZGlkYXRlTGlzdCAoY2FuZGlkYXRlcywgc2VsZWN0ZWRDYW5kaWRhdGUsIG11bHRpbGluZSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICBpZiAobXVsdGlsaW5lKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1tBcFRleHRdIENhbiBub3QgdXNlIGNhbmRpZGF0ZXMgd2l0aCBtdWx0aWxpbmUgaW5wdXQuJylcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgaWYgKCFjYW5kaWRhdGVzKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGlmICghY2FuZGlkYXRlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiYXAtdGV4dC1jYW5kaWRhdGUtbGlzdFwiPlxuICAgICAgICB7XG4gICAgICAgICAgY2FuZGlkYXRlcy5tYXAoKGNhbmRpZGF0ZSkgPT5cbiAgICAgICAgICAgIDxsaSBrZXk9eyBjYW5kaWRhdGUgfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IGNsYXNzbmFtZXMoJ2FwLXRleHQtY2FuZGlkYXRlLWxpc3QtaXRlbScsIHtcbiAgICAgICAgICAgICAgICAgICdhcC10ZXh0LWNhbmRpZGF0ZS1saXN0LWl0ZW0tc2VsZWN0ZWQnOiBjYW5kaWRhdGUgPT09IHNlbGVjdGVkQ2FuZGlkYXRlXG4gICAgICAgICAgICAgICAgfSkgfT5cbiAgICAgICAgICAgICAgPGEgb25DbGljaz17cy5oYW5kbGVDYW5kaWRhdGV9XG4gICAgICAgICAgICAgICAgIHJlZj17YGNhbmRpZGF0ZS0ke2NhbmRpZGF0ZX1gfVxuICAgICAgICAgICAgICAgICBkYXRhLXZhbHVlPXsgY2FuZGlkYXRlIH0+eyBjYW5kaWRhdGUgfTwvYT5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICA8L3VsPlxuICAgIClcbiAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQXBUZXh0XG4iLCIvKipcbiAqIFN0eWxlIGZvciBBcFRleHQuXG4gKiBAY2xhc3MgQXBUZXh0U3R5bGVcbiAqL1xuXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzIGFzIHR5cGVzfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7QXBTdHlsZX0gZnJvbSAnYXBlbWFuLXJlYWN0LXN0eWxlJ1xuXG4vKiogQGxlbmRzIEFwVGV4dFN0eWxlICovXG5jb25zdCBBcFRleHRTdHlsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcHJvcFR5cGVzOiB7XG4gICAgc2NvcGVkOiB0eXBlcy5ib29sLFxuICAgIHR5cGU6IHR5cGVzLnN0cmluZyxcbiAgICBzdHlsZTogdHlwZXMub2JqZWN0LFxuICAgIGhpZ2hsaWdodENvbG9yOiB0eXBlcy5zdHJpbmcsXG4gICAgbWF4V2lkdGg6IHR5cGVzLm51bWJlclxuICB9LFxuICBnZXREZWZhdWx0UHJvcHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzY29wZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogJ3RleHQvY3NzJyxcbiAgICAgIHN0eWxlOiB7fSxcbiAgICAgIG1heFdpZHRoOiBBcFN0eWxlLkNPTlRFTlRfV0lEVEgsXG4gICAgICBoaWdobGlnaHRDb2xvcjogQXBTdHlsZS5ERUZBVUxUX0hJR0hMSUdIVF9DT0xPUlxuICAgIH1cbiAgfSxcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG5cbiAgICBsZXQgeyBoaWdobGlnaHRDb2xvciwgbWF4V2lkdGggfSA9IHByb3BzXG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgICcuYXAtdGV4dCc6IHtcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgcGFkZGluZzogJzRweCA4cHgnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI0FBQScsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIG1heFdpZHRoOiBgJHttYXhXaWR0aH1weGAsXG4gICAgICAgIGJvcmRlclJhZGl1czogJzJweCcsXG4gICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICBvdXRsaW5lQ29sb3I6IGAke2hpZ2hsaWdodENvbG9yfWAsXG4gICAgICAgIGJveFNoYWRvdzogJzFweCAxcHggMXB4IHJnYmEoMCwwLDAsLjA1KSBpbnNldCdcbiAgICAgIH0sXG4gICAgICAnLmFwLXRleHQtd3JhcCc6IHtcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIG1hcmdpbjogJzRweCcsXG4gICAgICAgIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAgICAgICBtYXhXaWR0aDogYCR7bWF4V2lkdGh9cHhgLFxuICAgICAgICBkaXNwbGF5OiAnYmxvY2snXG4gICAgICB9LFxuICAgICAgJy5hcC10ZXh0LW11bHRpcGxlJzoge1xuICAgICAgICBvdmVyZmxvdzogJ2F1dG8nXG4gICAgICB9LFxuICAgICAgJy5hcC10ZXh0LWNhbmRpZGF0ZS1saXN0Jzoge1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgcmlnaHQ6ICcxcHgnLFxuICAgICAgICB0b3A6ICcxMDAlJyxcbiAgICAgICAgekluZGV4OiA0LFxuICAgICAgICBwYWRkaW5nOiAnNHB4IDAnLFxuICAgICAgICBtYXJnaW46ICcwIDFweCcsXG4gICAgICAgIGJveFNoYWRvdzogJzFweCAxcHggMnB4IHJnYmEoMCwwLDAsMC4zMyknLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94J1xuICAgICAgfSxcbiAgICAgICcuYXAtdGV4dC1jYW5kaWRhdGUtbGlzdC1pdGVtJzoge1xuICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICBtYXJnaW46IDBcbiAgICAgIH0sXG4gICAgICAnLmFwLXRleHQtY2FuZGlkYXRlLWxpc3QtaXRlbSBhJzoge1xuICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICBwYWRkaW5nOiAnNHB4IDhweCdcbiAgICAgIH0sXG4gICAgICAnLmFwLXRleHQtY2FuZGlkYXRlLWxpc3QtaXRlbSBhOmhvdmVyJzoge1xuICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgYmFja2dyb3VuZDogJyNGQUZBRkEnXG4gICAgICB9LFxuICAgICAgJy5hcC10ZXh0LWNhbmRpZGF0ZS1saXN0LWl0ZW0gYTphY3RpdmUnOiB7XG4gICAgICAgIGJhY2tncm91bmQ6ICcjRjVGNUY1J1xuICAgICAgfSxcbiAgICAgICcuYXAtdGV4dC1jYW5kaWRhdGUtbGlzdC1pdGVtLXNlbGVjdGVkIGEnOiB7XG4gICAgICAgIGJhY2tncm91bmQ6IEFwU3R5bGUuY29sb3JBbHBoYShoaWdobGlnaHRDb2xvciwgMC4zMylcbiAgICAgIH0sXG4gICAgICAnLmFwLXRleHQtY2FuZGlkYXRlLWxpc3QtaXRlbS1zZWxlY3RlZCBhOmhvdmVyJzoge1xuICAgICAgICBiYWNrZ3JvdW5kOiBBcFN0eWxlLmNvbG9yQWxwaGEoaGlnaGxpZ2h0Q29sb3IsIDAuNSlcbiAgICAgIH0sXG4gICAgICAnLmFwLXRleHQtY2FuZGlkYXRlLWxpc3QtaXRlbS1zZWxlY3RlZCBhOmFjdGl2ZSc6IHtcbiAgICAgICAgYmFja2dyb3VuZDogQXBTdHlsZS5jb2xvckFscGhhKGhpZ2hsaWdodENvbG9yLCAwLjIpXG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzbWFsbE1lZGlhRGF0YSA9IHt9XG4gICAgbGV0IG1lZGl1bU1lZGlhRGF0YSA9IHt9XG4gICAgbGV0IGxhcmdlTWVkaWFEYXRhID0ge31cbiAgICByZXR1cm4gKFxuICAgICAgPEFwU3R5bGUgc2NvcGVkPXsgcHJvcHMuc2NvcGVkIH1cbiAgICAgICAgICAgICAgIGRhdGE9eyBPYmplY3QuYXNzaWduKGRhdGEsIHByb3BzLnN0eWxlKSB9XG4gICAgICAgICAgICAgICBzbWFsbE1lZGlhRGF0YT17IHNtYWxsTWVkaWFEYXRhIH1cbiAgICAgICAgICAgICAgIG1lZGl1bU1lZGlhRGF0YT17IG1lZGl1bU1lZGlhRGF0YSB9XG4gICAgICAgICAgICAgICBsYXJnZU1lZGlhRGF0YT17IGxhcmdlTWVkaWFEYXRhIH1cbiAgICAgID57IHByb3BzLmNoaWxkcmVuIH08L0FwU3R5bGU+XG4gICAgKVxuICB9XG59KVxuZXhwb3J0IGRlZmF1bHQgQXBUZXh0U3R5bGVcbiJdfQ==
