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
      {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni4wLjAvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkb2MvZGVtby9kZW1vLmJyb3dzZXIuanMiLCIvVXNlcnMvb2t1bmlzaGluaXNoaS9Qcm9qZWN0cy9hcGVtYW4tcHJvamVjdHMvYXBlbWFuLXJlYWN0LXRleHQvZG9jL2RlbW8vZGVtby5jb21wb25lbnQuanN4IiwiL1VzZXJzL29rdW5pc2hpbmlzaGkvUHJvamVjdHMvYXBlbWFuLXByb2plY3RzL2FwZW1hbi1yZWFjdC10ZXh0L2xpYi9hcF90ZXh0LmpzeCIsIi9Vc2Vycy9va3VuaXNoaW5pc2hpL1Byb2plY3RzL2FwZW1hbi1wcm9qZWN0cy9hcGVtYW4tcmVhY3QtdGV4dC9saWIvYXBfdGV4dF9zdHlsZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQSxhLHlEQUVBLDRCLDJDQUNBLDBDLCtDQUNBLHNELDZKQUVlLGdCQUFNLFdBQU4sQ0FBa0IsOEJBQy9CLGVBRCtCLDJCQUNaLENBQ2pCLE9BQU8sQ0FDTCxNQUFPLEtBREYsQ0FBUCxBQUdELENBTDhCLENBTS9CLFlBTitCLHVCQU1qQixDQU5pQixDQU1kLENBQ2YsSUFBTSxFQUFJLElBQVYsQ0FDQSxFQUFFLFFBQUYsQ0FBVyxDQUNULE1BQU8sRUFBRSxNQUFGLENBQVMsS0FEUCxDQUFYLENBR0QsQ0FYOEIsQ0FZL0IsTUFaK0Isa0JBWXJCLENBQ1IsSUFBTSxFQUFJLElBQVYsQ0FEUSxJQUVGLEtBRkUsQ0FFUSxDQUZSLENBRUYsS0FGRSxDQUdSLE9BQ0UseUNBQ0UsdURBQWEsZUFBZSxTQUE1QixFQURGLENBRUUsaURBQVEsU0FBVyxFQUFFLFlBQXJCLENBQW9DLE1BQVEsTUFB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RGhDO0FBbURULGlEQUEyQztBQUN6QyxvQkFBWSwwQkFBUSxVQUFSLENBQW1CLGNBQW5CLEVBQW1DLElBQW5DO0FBRDZCLE9BbkRsQztBQXNEVCx1REFBaUQ7QUFDL0Msb0JBQVksMEJBQVEsVUFBUixDQUFtQixjQUFuQixFQUFtQyxHQUFuQztBQURtQyxPQXREeEM7QUF5RFQsd0RBQWtEO0FBQ2hELG9CQUFZLDBCQUFRLFVBQVIsQ0FBbUIsY0FBbkIsRUFBbUMsR0FBbkM7QUFEb0M7QUF6RHpDLEtBQVg7QUE2REEsUUFBSSxpQkFBaUIsRUFBckI7QUFDQSxRQUFJLGtCQUFrQixFQUF0QjtBQUNBLFFBQUksaUJBQWlCLEVBQXJCO0FBQ0EsV0FDRTtBQUFBO01BQUE7QUFDUyxjQUFPLE9BQU8sTUFBUCxDQUFjLElBQWQsRUFBb0IsTUFBTSxLQUExQixDQURoQjtBQUVTLHdCQUFpQixjQUYxQjtBQUdTLHlCQUFrQixlQUgzQjtBQUlTLHdCQUFpQjtBQUoxQjtNQUtHLE1BQU07QUFMVCxLQURGO0FBUUQ7QUEvRm1DLENBQWxCLENBQXBCO2tCQWlHZSxXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcbmNvbnN0IFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJylcblxuY29uc3QgRGVtbyA9IHJlcXVpcmUoJy4vZGVtby5jb21wb25lbnQuanMnKS5kZWZhdWx0XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gb25Mb2FkICgpIHtcbiAgd2luZG93LlJlYWN0ID0gUmVhY3RcbiAgbGV0IERlbW9GYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShEZW1vKVxuICBSZWFjdERPTS5yZW5kZXIoRGVtb0ZhY3RvcnkoKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbW8td3JhcCcpKVxufSlcbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgQXBUZXh0IGZyb20gJy4uLy4uL2xpYi9hcF90ZXh0J1xuaW1wb3J0IEFwVGV4dFN0eWxlIGZyb20gJy4uLy4uL2xpYi9hcF90ZXh0X3N0eWxlJ1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiAnYmFuJ1xuICAgIH1cbiAgfSxcbiAgaGFuZGxlQ2hhbmdlIChlKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlOiBlLnRhcmdldC52YWx1ZVxuICAgIH0pXG4gIH0sXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBzdGF0ZSB9ID0gc1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QXBUZXh0U3R5bGUgaGlnaGxpZ2h0Q29sb3I9XCIjYjM1NjAwXCIvPlxuICAgICAgICA8QXBUZXh0IG9uQ2hhbmdlPXsgcy5oYW5kbGVDaGFuZ2UgfSB2YWx1ZT17IHN0YXRlLnZhbHVlIH0vPlxuICAgICAgICA8QXBUZXh0IG9uQ2hhbmdlPXsgcy5oYW5kbGVDaGFuZ2UgfSB2YWx1ZT17IHN0YXRlLnZhbHVlIH0gcm93cz17Mn0vPlxuICAgICAgICA8QXBUZXh0IG9uQ2hhbmdlPXsgcy5oYW5kbGVDaGFuZ2UgfSB2YWx1ZT17IHN0YXRlLnZhbHVlIH1cbiAgICAgICAgICAgICAgICBjYW5kaWRhdGVzPXsgWyAnYmFuYW5hJywgJ29yYW5nZScsICdhcHBsZScgXSB9Lz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSlcbiIsIi8qKlxuICogYXBlbWFuIHJlYWN0IHBhY2thZ2UgdGV4dCBjb21wb25lbnQuXG4gKiBAY2xhc3MgQXBUZXh0XG4gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlcyBhcyB0eXBlc30gZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcblxuLyoqIEBsZW5kcyBBcFRleHQgKi9cbmNvbnN0IEFwVGV4dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTcGVjc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHByb3BUeXBlczoge1xuICAgIC8qKiBOYW1lIG9mIHRleHQgaW5wdXQgKi9cbiAgICBuYW1lOiB0eXBlcy5zdHJpbmcsXG4gICAgLyoqIFZhbHVlIG9mIHRleHQgaW5wdXQgKi9cbiAgICB2YWx1ZTogdHlwZXMuc3RyaW5nLFxuICAgIC8qKiBQbGFjZWhvbGRlciB0ZXh0ICovXG4gICAgcGxhY2Vob2xkZXI6IHR5cGVzLnN0cmluZyxcbiAgICAvKiogTnVtYmVyIG9mIHJvd3MgKi9cbiAgICByb3dzOiB0eXBlcy5udW1iZXIsXG4gICAgLyoqIFNlbGVjdGFibGUgY2FuZGlkYXRlIHRleHQgKi9cbiAgICBjYW5kaWRhdGVzOiB0eXBlcy5hcnJheU9mKHR5cGVzLnN0cmluZylcbiAgfSxcblxuICBnZXRJbml0aWFsU3RhdGUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdWdnZXN0aW5nOiBmYWxzZSxcbiAgICAgIGNhbmRpZGF0ZXM6IG51bGwsXG4gICAgICBzZWxlY3RlZENhbmRpZGF0ZTogbnVsbFxuICAgIH1cbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnJyxcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnJyxcbiAgICAgIHJvd3M6IDEsXG4gICAgICBjYW5kaWRhdGVzOiBudWxsXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBzdGF0ZSwgcHJvcHMgfSA9IHNcbiAgICBsZXQgdmFsdWUgPSBwcm9wcy52YWx1ZSB8fCBudWxsXG4gICAgbGV0IGhhc1ZhbCA9ICEhdmFsdWVcblxuICAgIGxldCBtdWx0aWxpbmUgPSBwcm9wcy5yb3dzID4gMVxuICAgIHJldHVybiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9eyBjbGFzc25hbWVzKCdhcC10ZXh0LXdyYXAnLCB7ICdhcC10ZXh0LXdyYXAtZW1wdHknOiAhaGFzVmFsIH0pIH0+XG4gICAgICAgIHtcbiAgICAgICAgICBtdWx0aWxpbmUgPyBzLl9yZW5kZXJUZXh0QXJlYSh2YWx1ZSkgOiBzLl9yZW5kZXJUZXh0SW5wdXQodmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAge1xuICAgICAgICAgIHN0YXRlLnN1Z2dlc3RpbmcgPyBzLl9yZW5kZXJDYW5kaWRhdGVMaXN0KHN0YXRlLmNhbmRpZGF0ZXMsIHN0YXRlLnNlbGVjdGVkQ2FuZGlkYXRlLCBtdWx0aWxpbmUpIDogbnVsbFxuICAgICAgICB9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgKVxuICB9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEN1c3RvbVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIGhhbmRsZUNhbmRpZGF0ZSAoZSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICBlLnRhcmdldC52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlIHx8IGUudGFyZ2V0LmRhdGFzZXQudmFsdWVcbiAgICBzLnNldFN0YXRlKHsgc3VnZ2VzdGluZzogZmFsc2UgfSlcbiAgICBpZiAocHJvcHMub25DaGFuZ2UpIHtcbiAgICAgIHByb3BzLm9uQ2hhbmdlKGUpXG4gICAgfVxuICB9LFxuXG4gIGhhbmRsZUZvY3VzIChlKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuICAgIHMuc2V0U3RhdGUoeyBzdWdnZXN0aW5nOiB0cnVlIH0pXG4gICAgcy51cGRhdGVDYW5kaWRhdGVzKClcbiAgICBpZiAocHJvcHMub25Gb2N1cykge1xuICAgICAgcHJvcHMub25Gb2N1cyhlKVxuICAgIH1cbiAgfSxcblxuICBoYW5kbGVDaGFuZ2UgKGUpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgcy5zZXRTdGF0ZSh7IHN1Z2dlc3Rpbmc6IHRydWUgfSlcbiAgICBpZiAocHJvcHMub25DaGFuZ2UpIHtcbiAgICAgIHByb3BzLm9uQ2hhbmdlKGUpXG4gICAgfVxuICB9LFxuXG4gIGhhbmRsZUJsdXIgKGUpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgaWYgKHByb3BzLm9uQmx1cikge1xuICAgICAgcHJvcHMub25CbHVyKGUpXG4gICAgfVxuICB9LFxuXG4gIGhhbmRsZUtleVVwIChlKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuICAgIHMudXBkYXRlQ2FuZGlkYXRlcygpXG4gICAgaWYgKHByb3BzLm9uS2V5VXApIHtcbiAgICAgIHByb3BzLm9uS2V5VXAoZSlcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlS2V5RG93biAoZSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgY2FzZSAzODogLy8gVVBcbiAgICAgICAgcy5tb3ZlQ2FuZGlkYXRlSW5kZXgoLTEpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDQwOiAvLyBET1dOXG4gICAgICAgIHMubW92ZUNhbmRpZGF0ZUluZGV4KCsxKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAxMzogLy8gRW50ZXJcbiAgICAgICAgcy5lbnRlckNhbmRpZGF0ZSgpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzLnNldFN0YXRlKHsgc3VnZ2VzdGluZzogdHJ1ZSB9KVxuICAgICAgICBicmVha1xuICAgIH1cbiAgICBpZiAocHJvcHMub25LZXlEb3duKSB7XG4gICAgICBwcm9wcy5vbktleURvd24oZSlcbiAgICB9XG4gIH0sXG5cbiAgbW92ZUNhbmRpZGF0ZUluZGV4IChhbW91bnQpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IGNhbmRpZGF0ZXMsIHNlbGVjdGVkQ2FuZGlkYXRlIH0gPSBzLnN0YXRlXG4gICAgaWYgKCFjYW5kaWRhdGVzKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IGluZGV4ID0gY2FuZGlkYXRlcy5pbmRleE9mKHNlbGVjdGVkQ2FuZGlkYXRlKSArIGFtb3VudFxuICAgIGxldCBvdmVyID0gKGluZGV4ID09PSAtMSkgfHwgKGluZGV4ID09PSBjYW5kaWRhdGVzLmxlbmd0aClcbiAgICBpZiAob3Zlcikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRDYW5kaWRhdGU6IGNhbmRpZGF0ZXNbIGluZGV4IF0gfHwgbnVsbFxuICAgIH0pXG4gIH0sXG5cbiAgdXBkYXRlQ2FuZGlkYXRlcyAoKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuICAgIGxldCB2YWx1ZSA9IHByb3BzLnZhbHVlXG4gICAgbGV0IGNhbmRpZGF0ZXMgPSAocHJvcHMuY2FuZGlkYXRlcyB8fCBbXSlcbiAgICAgIC5maWx0ZXIoKGNhbmRpZGF0ZSkgPT4gISFjYW5kaWRhdGUpXG4gICAgICAubWFwKChjYW5kaWRhdGUpID0+IFN0cmluZyhjYW5kaWRhdGUpLnRyaW0oKSlcbiAgICAgIC5maWx0ZXIoKGNhbmRpZGF0ZSkgPT4gIXZhbHVlIHx8IGNhbmRpZGF0ZS5tYXRjaCh2YWx1ZSkpXG5cbiAgICBsZXQgaGl0ID0gKGNhbmRpZGF0ZXMubGVuZ3RoID09PSAxKSAmJiAoY2FuZGlkYXRlc1sgMCBdID09PSB2YWx1ZSlcbiAgICBpZiAoaGl0KSB7XG4gICAgICBjYW5kaWRhdGVzID0gbnVsbFxuICAgIH1cbiAgICBzLnNldFN0YXRlKHsgY2FuZGlkYXRlcyB9KVxuICB9LFxuXG4gIGVudGVyQ2FuZGlkYXRlICgpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgbGV0IHsgY2FuZGlkYXRlcywgc2VsZWN0ZWRDYW5kaWRhdGUgfSA9IHMuc3RhdGVcbiAgICBsZXQgdmFsaWQgPSBjYW5kaWRhdGVzICYmICEhfmNhbmRpZGF0ZXMuaW5kZXhPZihzZWxlY3RlZENhbmRpZGF0ZSlcbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIGxldCB0YXJnZXQgPSBSZWFjdERPTS5maW5kRE9NTm9kZShzLnJlZnNbIGBjYW5kaWRhdGUtJHtzZWxlY3RlZENhbmRpZGF0ZX1gIF0pXG4gICAgICB0YXJnZXQudmFsdWUgPSBzZWxlY3RlZENhbmRpZGF0ZVxuICAgICAgaWYgKHByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICAgIHByb3BzLm9uQ2hhbmdlKHsgdGFyZ2V0IH0pXG4gICAgICB9XG4gICAgICBzLnNldFN0YXRlKHsgc3VnZ2VzdGluZzogZmFsc2UgfSlcbiAgICB9XG4gIH0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUHJpdmF0ZVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBfcmVuZGVyVGV4dEFyZWEgKHZhbHVlKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuICAgIHJldHVybiAoXG4gICAgICA8dGV4dGFyZWEgY2xhc3NOYW1lPXsgY2xhc3NuYW1lcygnYXAtdGV4dCBhcC10ZXh0LW11bHRpcGxlJywgcHJvcHMuY2xhc3NOYW1lKSB9XG4gICAgICAgICAgICAgICAgdmFsdWU9eyB2YWx1ZSB9XG4gICAgICAgICAgICAgICAgb25Gb2N1cz1cIlwiXG4gICAgICAgIHsgLi4ucHJvcHMgfT5cbiAgICAgICAgICAgICAgICA8L3RleHRhcmVhPlxuICAgIClcbiAgfSxcbiAgX3JlbmRlclRleHRJbnB1dCAodmFsdWUpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dCBjbGFzc05hbWU9eyBjbGFzc25hbWVzKCdhcC10ZXh0JywgcHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICB2YWx1ZT17IHZhbHVlIH1cbiAgICAgICAgICAgICBvbkZvY3VzPXsgcy5oYW5kbGVGb2N1cyB9XG4gICAgICAgICAgICAgb25LZXlVcD17IHMuaGFuZGxlS2V5VXAgfVxuICAgICAgICAgICAgIG9uQ2hhbmdlPXsgcy5oYW5kbGVDaGFuZ2UgfVxuICAgICAgICAgICAgIG9uQmx1cj17IHMuaGFuZGxlQmx1ciB9XG4gICAgICAgICAgICAgb25LZXlEb3duPXsgcy5oYW5kbGVLZXlEb3duIH1cbiAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIHsgLi4ucHJvcHMgfSAvPlxuICAgIClcbiAgfSxcbiAgX3JlbmRlckNhbmRpZGF0ZUxpc3QgKGNhbmRpZGF0ZXMsIHNlbGVjdGVkQ2FuZGlkYXRlLCBtdWx0aWxpbmUpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgaWYgKG11bHRpbGluZSkge1xuICAgICAgY29uc29sZS53YXJuKCdbQXBUZXh0XSBDYW4gbm90IHVzZSBjYW5kaWRhdGVzIHdpdGggbXVsdGlsaW5lIGlucHV0LicpXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGlmICghY2FuZGlkYXRlcykge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBpZiAoIWNhbmRpZGF0ZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT1cImFwLXRleHQtY2FuZGlkYXRlLWxpc3RcIj5cbiAgICAgICAge1xuICAgICAgICAgIGNhbmRpZGF0ZXMubWFwKChjYW5kaWRhdGUpID0+XG4gICAgICAgICAgICA8bGkga2V5PXsgY2FuZGlkYXRlIH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBjbGFzc25hbWVzKCdhcC10ZXh0LWNhbmRpZGF0ZS1saXN0LWl0ZW0nLCB7XG4gICAgICAgICAgICAgICAgICAnYXAtdGV4dC1jYW5kaWRhdGUtbGlzdC1pdGVtLXNlbGVjdGVkJzogY2FuZGlkYXRlID09PSBzZWxlY3RlZENhbmRpZGF0ZVxuICAgICAgICAgICAgICAgIH0pIH0+XG4gICAgICAgICAgICAgIDxhIG9uQ2xpY2s9e3MuaGFuZGxlQ2FuZGlkYXRlfVxuICAgICAgICAgICAgICAgICByZWY9e2BjYW5kaWRhdGUtJHtjYW5kaWRhdGV9YH1cbiAgICAgICAgICAgICAgICAgZGF0YS12YWx1ZT17IGNhbmRpZGF0ZSB9PnsgY2FuZGlkYXRlIH08L2E+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgPC91bD5cbiAgICApXG4gIH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEFwVGV4dFxuIiwiLyoqXG4gKiBTdHlsZSBmb3IgQXBUZXh0LlxuICogQGNsYXNzIEFwVGV4dFN0eWxlXG4gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlcyBhcyB0eXBlc30gZnJvbSAncmVhY3QnXG5pbXBvcnQge0FwU3R5bGV9IGZyb20gJ2FwZW1hbi1yZWFjdC1zdHlsZSdcblxuLyoqIEBsZW5kcyBBcFRleHRTdHlsZSAqL1xuY29uc3QgQXBUZXh0U3R5bGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHByb3BUeXBlczoge1xuICAgIFxuICAgIHR5cGU6IHR5cGVzLnN0cmluZyxcbiAgICBzdHlsZTogdHlwZXMub2JqZWN0LFxuICAgIGhpZ2hsaWdodENvbG9yOiB0eXBlcy5zdHJpbmcsXG4gICAgbWF4V2lkdGg6IHR5cGVzLm51bWJlclxuICB9LFxuICBnZXREZWZhdWx0UHJvcHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBcbiAgICAgIHR5cGU6ICd0ZXh0L2NzcycsXG4gICAgICBzdHlsZToge30sXG4gICAgICBtYXhXaWR0aDogQXBTdHlsZS5DT05URU5UX1dJRFRILFxuICAgICAgaGlnaGxpZ2h0Q29sb3I6IEFwU3R5bGUuREVGQVVMVF9ISUdITElHSFRfQ09MT1JcbiAgICB9XG4gIH0sXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuXG4gICAgbGV0IHsgaGlnaGxpZ2h0Q29sb3IsIG1heFdpZHRoIH0gPSBwcm9wc1xuXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICAnLmFwLXRleHQnOiB7XG4gICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgIHBhZGRpbmc6ICc0cHggOHB4JyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNBQUEnLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBtYXhXaWR0aDogYCR7bWF4V2lkdGh9cHhgLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICcycHgnLFxuICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgb3V0bGluZUNvbG9yOiBgJHtoaWdobGlnaHRDb2xvcn1gLFxuICAgICAgICBib3hTaGFkb3c6ICcxcHggMXB4IDFweCByZ2JhKDAsMCwwLC4wNSkgaW5zZXQnXG4gICAgICB9LFxuICAgICAgJy5hcC10ZXh0LXdyYXAnOiB7XG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBtYXJnaW46ICc0cHgnLFxuICAgICAgICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbiAgICAgICAgbWF4V2lkdGg6IGAke21heFdpZHRofXB4YCxcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgICAgfSxcbiAgICAgICcuYXAtdGV4dC1tdWx0aXBsZSc6IHtcbiAgICAgICAgb3ZlcmZsb3c6ICdhdXRvJ1xuICAgICAgfSxcbiAgICAgICcuYXAtdGV4dC1jYW5kaWRhdGUtbGlzdCc6IHtcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAnMXB4JyxcbiAgICAgICAgdG9wOiAnMTAwJScsXG4gICAgICAgIHpJbmRleDogNCxcbiAgICAgICAgcGFkZGluZzogJzRweCAwJyxcbiAgICAgICAgbWFyZ2luOiAnMCAxcHgnLFxuICAgICAgICBib3hTaGFkb3c6ICcxcHggMXB4IDJweCByZ2JhKDAsMCwwLDAuMzMpJyxcbiAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcbiAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCdcbiAgICAgIH0sXG4gICAgICAnLmFwLXRleHQtY2FuZGlkYXRlLWxpc3QtaXRlbSc6IHtcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgbWFyZ2luOiAwXG4gICAgICB9LFxuICAgICAgJy5hcC10ZXh0LWNhbmRpZGF0ZS1saXN0LWl0ZW0gYSc6IHtcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgcGFkZGluZzogJzRweCA4cHgnXG4gICAgICB9LFxuICAgICAgJy5hcC10ZXh0LWNhbmRpZGF0ZS1saXN0LWl0ZW0gYTpob3Zlcic6IHtcbiAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgIGJhY2tncm91bmQ6ICcjRkFGQUZBJ1xuICAgICAgfSxcbiAgICAgICcuYXAtdGV4dC1jYW5kaWRhdGUtbGlzdC1pdGVtIGE6YWN0aXZlJzoge1xuICAgICAgICBiYWNrZ3JvdW5kOiAnI0Y1RjVGNSdcbiAgICAgIH0sXG4gICAgICAnLmFwLXRleHQtY2FuZGlkYXRlLWxpc3QtaXRlbS1zZWxlY3RlZCBhJzoge1xuICAgICAgICBiYWNrZ3JvdW5kOiBBcFN0eWxlLmNvbG9yQWxwaGEoaGlnaGxpZ2h0Q29sb3IsIDAuMzMpXG4gICAgICB9LFxuICAgICAgJy5hcC10ZXh0LWNhbmRpZGF0ZS1saXN0LWl0ZW0tc2VsZWN0ZWQgYTpob3Zlcic6IHtcbiAgICAgICAgYmFja2dyb3VuZDogQXBTdHlsZS5jb2xvckFscGhhKGhpZ2hsaWdodENvbG9yLCAwLjUpXG4gICAgICB9LFxuICAgICAgJy5hcC10ZXh0LWNhbmRpZGF0ZS1saXN0LWl0ZW0tc2VsZWN0ZWQgYTphY3RpdmUnOiB7XG4gICAgICAgIGJhY2tncm91bmQ6IEFwU3R5bGUuY29sb3JBbHBoYShoaWdobGlnaHRDb2xvciwgMC4yKVxuICAgICAgfVxuICAgIH1cbiAgICBsZXQgc21hbGxNZWRpYURhdGEgPSB7fVxuICAgIGxldCBtZWRpdW1NZWRpYURhdGEgPSB7fVxuICAgIGxldCBsYXJnZU1lZGlhRGF0YSA9IHt9XG4gICAgcmV0dXJuIChcbiAgICAgIDxBcFN0eWxlIFxuICAgICAgICAgICAgICAgZGF0YT17IE9iamVjdC5hc3NpZ24oZGF0YSwgcHJvcHMuc3R5bGUpIH1cbiAgICAgICAgICAgICAgIHNtYWxsTWVkaWFEYXRhPXsgc21hbGxNZWRpYURhdGEgfVxuICAgICAgICAgICAgICAgbWVkaXVtTWVkaWFEYXRhPXsgbWVkaXVtTWVkaWFEYXRhIH1cbiAgICAgICAgICAgICAgIGxhcmdlTWVkaWFEYXRhPXsgbGFyZ2VNZWRpYURhdGEgfVxuICAgICAgPnsgcHJvcHMuY2hpbGRyZW4gfTwvQXBTdHlsZT5cbiAgICApXG4gIH1cbn0pXG5leHBvcnQgZGVmYXVsdCBBcFRleHRTdHlsZVxuIl19
