(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';var _react=require('react');var _react2=_interopRequireDefault(_react);var _ap_text=require('../../lib/ap_text');var _ap_text2=_interopRequireDefault(_ap_text);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}module.exports=_react2.default.createClass({displayName:'exports',getInitialState:function getInitialState(){return {value:'ban'}},handleChange:function handleChange(e){var s=this;s.setState({value:e.target.value})},render:function render(){var s=this;var state=s.state;return _react2.default.createElement('div',null,_react2.default.createElement(_ap_text2.default,{onChange:s.handleChange,value:state.value}),_react2.default.createElement(_ap_text2.default,{onChange:s.handleChange,value:state.value,rows:2}),_react2.default.createElement(_ap_text2.default,{onChange:s.handleChange,value:state.value,candidates:['banana','orange','apple']}))}});

},{"../../lib/ap_text":3,"react":"react"}],2:[function(require,module,exports){
'use strict'

const React = require('react')
const ReactDOM = require('react-dom')

const Demo = require('./demo.component.js')

window.addEventListener('load', function onLoad () {
  window.React = React
  let DemoFactory = React.createFactory(Demo)
  ReactDOM.render(DemoFactory(), document.getElementById('demo-wrap'))
})

},{"./demo.component.js":1,"react":"react","react-dom":"react-dom"}],3:[function(require,module,exports){
/**
 * apeman react package text component.
 * @constructor ApText
 */

'use strict';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NS4zLjAvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvb2t1bmlzaGluaXNoaS9Qcm9qZWN0cy9hcGVtYW4tcHJvamVjdHMvYXBlbWFuLXJlYWN0LXRleHQvZG9jL2RlbW8vZGVtby5jb21wb25lbnQuanN4IiwiZG9jL2RlbW8vZGVtby5ub2RlLmpzIiwiL1VzZXJzL29rdW5pc2hpbmlzaGkvUHJvamVjdHMvYXBlbWFuLXByb2plY3RzL2FwZW1hbi1yZWFjdC10ZXh0L2xpYi9hcF90ZXh0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLGFBRUEsdUVBQ0EsMktBRUEsT0FBTyxPQUFQLENBQWlCLGdCQUFNLFdBQU4sQ0FBa0IsdUJBQ2pDLDBDQUFtQixDQUNqQixPQUFPLENBQ0wsTUFBTyxLQUFQLENBREYsQ0FEaUIsQ0FLbkIsbUNBQWEsRUFBRyxDQUNkLElBQU0sRUFBSSxJQUFKLENBRFEsQ0FFZCxDQUFFLFFBQUYsQ0FBVyxDQUNULE1BQU8sRUFBRSxNQUFGLENBQVMsS0FBVCxDQURULEVBRmMsQ0FNaEIsd0JBQVUsQ0FDUixJQUFNLEVBQUksSUFBSixDQURFLElBRUYsTUFBVSxFQUFWLE1BRkUsT0FJTix5Q0FDRSxpREFBUSxTQUFXLEVBQUUsWUFBRixDQUFpQixNQUFRLE1BQU0sS0FBTixDQUE1QyxDQURGLENBRUUsaURBQVEsU0FBVyxFQUFFLFlBQUYsQ0FBaUIsTUFBUSxNQUFNLEtBQU4sQ0FBYyxLQUFNLENBQU4sQ0FBMUQsQ0FGRixDQUdFLGlEQUFRLFNBQVcsRUFBRSxZQUFGLENBQWlCLE1BQVEsTUFBTSxLQUFOLENBQ3BDLFdBQVksQ0FDWixRQURZLENBRVosUUFGWSxDQUdaLE9BSFksQ0FBWixDQURSLENBSEYsQ0FERixDQUhRLENBWkssQ0FBakI7OztBQ0xBO0FBQ0E7QUFDQTtB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cEIsQ0FBWixFQUFwQjtVQUdFOztjQUFHLFNBQVMsRUFBRSxlQUFGO0FBQ1Qsa0NBQWtCLFNBQWxCO0FBQ0EsNEJBQVksU0FBWixFQUZIO1lBRTJCLFNBRjNCO1dBSEY7O09BRGEsQ0FGbkI7S0FERixDQWY4RDtHQTVNakM7Q0FBbEIsQ0FBVDs7QUE2T04sT0FBTyxPQUFQLEdBQWlCLE1BQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgQXBUZXh0IGZyb20gJy4uLy4uL2xpYi9hcF90ZXh0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6ICdiYW4nXG4gICAgfVxuICB9LFxuICBoYW5kbGVDaGFuZ2UoZSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgcy5zZXRTdGF0ZSh7XG4gICAgICB2YWx1ZTogZS50YXJnZXQudmFsdWVcbiAgICB9KVxuICB9LFxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgc3RhdGUgfSA9IHNcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEFwVGV4dCBvbkNoYW5nZT17IHMuaGFuZGxlQ2hhbmdlIH0gdmFsdWU9eyBzdGF0ZS52YWx1ZSB9Lz5cbiAgICAgICAgPEFwVGV4dCBvbkNoYW5nZT17IHMuaGFuZGxlQ2hhbmdlIH0gdmFsdWU9eyBzdGF0ZS52YWx1ZSB9IHJvd3M9ezJ9Lz5cbiAgICAgICAgPEFwVGV4dCBvbkNoYW5nZT17IHMuaGFuZGxlQ2hhbmdlIH0gdmFsdWU9eyBzdGF0ZS52YWx1ZSB9XG4gICAgICAgICAgICAgICAgY2FuZGlkYXRlcz17W1xuICAgICAgICAgICAgICAgICdiYW5hbmEnLFxuICAgICAgICAgICAgICAgICdvcmFuZ2UnLFxuICAgICAgICAgICAgICAgICdhcHBsZSdcbiAgICAgICAgICAgICAgICBdfS8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn0pXG5cblxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxuY29uc3QgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKVxuXG5jb25zdCBEZW1vID0gcmVxdWlyZSgnLi9kZW1vLmNvbXBvbmVudC5qcycpXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gb25Mb2FkICgpIHtcbiAgd2luZG93LlJlYWN0ID0gUmVhY3RcbiAgbGV0IERlbW9GYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShEZW1vKVxuICBSZWFjdERPTS5yZW5kZXIoRGVtb0ZhY3RvcnkoKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbW8td3JhcCcpKVxufSlcbiIsIi8qKlxuICogYXBlbWFuIHJlYWN0IHBhY2thZ2UgdGV4dCBjb21wb25lbnQuXG4gKiBAY29uc3RydWN0b3IgQXBUZXh0XG4gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlcyBhcyB0eXBlc30gZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcblxuLyoqIEBsZW5kcyBBcFRleHQgKi9cbmNvbnN0IEFwVGV4dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTcGVjc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHByb3BUeXBlczoge1xuICAgIC8qKiBOYW1lIG9mIHRleHQgaW5wdXQgKi9cbiAgICBuYW1lOiB0eXBlcy5zdHJpbmcsXG4gICAgLyoqIFZhbHVlIG9mIHRleHQgaW5wdXQgKi9cbiAgICB2YWx1ZTogdHlwZXMuc3RyaW5nLFxuICAgIC8qKiBQbGFjZWhvZGVyIHRleHQgKi9cbiAgICBwbGFjZWhvbGRlcjogdHlwZXMuc3RyaW5nLFxuICAgIC8qKiBOdW1iZXIgb2Ygcm93cyAqL1xuICAgIHJvd3M6IHR5cGVzLm51bWJlcixcbiAgICAvKiogU2VsZWN0YWJsZSBjYW5kaWRhdGUgdGV4dCAqL1xuICAgIGNhbmRpZGF0ZXM6IHR5cGVzLmFycmF5T2YodHlwZXMuc3RyaW5nKVxuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Z2dlc3Rpbmc6IGZhbHNlLFxuICAgICAgY2FuZGlkYXRlczogbnVsbCxcbiAgICAgIHNlbGVjdGVkQ2FuZGlkYXRlOiBudWxsXG4gICAgfVxuICB9LFxuXG4gIGdldERlZmF1bHRQcm9wcyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBwbGFjZWhvbGRlcjogJycsXG4gICAgICByb3dzOiAxLFxuICAgICAgY2FuZGlkYXRlczogbnVsbFxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgc3RhdGUsIHByb3BzIH0gPSBzXG4gICAgbGV0IHZhbHVlID0gcHJvcHMudmFsdWUgfHwgbnVsbFxuICAgIGxldCBoYXNWYWwgPSAhIXZhbHVlXG5cbiAgICBsZXQgbXVsdGlsaW5lID0gcHJvcHMucm93cyA+IDFcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW4gY2xhc3NOYW1lPXsgY2xhc3NuYW1lcygnYXAtdGV4dC13cmFwJywgeyAnYXAtdGV4dC13cmFwLWVtcHR5JzogIWhhc1ZhbCB9KSB9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG11bHRpbGluZSA/IHMuX3JlbmRlclRleHRBcmVhKHZhbHVlKSA6IHMuX3JlbmRlclRleHRJbnB1dCh2YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0ZS5zdWdnZXN0aW5nID8gcy5fcmVuZGVyQ2FuZGlkYXRlTGlzdChzdGF0ZS5jYW5kaWRhdGVzLCBzdGF0ZS5zZWxlY3RlZENhbmRpZGF0ZSwgbXVsdGlsaW5lKSA6IG51bGxcbiAgICAgICAgfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgIClcbiAgfSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDdXN0b21cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBoYW5kbGVDYW5kaWRhdGUgKGUpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgZS50YXJnZXQudmFsdWUgPSBlLnRhcmdldC52YWx1ZSB8fCBlLnRhcmdldC5kYXRhc2V0LnZhbHVlXG4gICAgcy5zZXRTdGF0ZSh7IHN1Z2dlc3Rpbmc6IGZhbHNlIH0pXG4gICAgaWYgKHByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICBwcm9wcy5vbkNoYW5nZShlKVxuICAgIH1cbiAgfSxcblxuICBoYW5kbGVGb2N1cyAoZSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICBzLnNldFN0YXRlKHsgc3VnZ2VzdGluZzogdHJ1ZSB9KVxuICAgIHMudXBkYXRlQ2FuZGlkYXRlcygpXG4gICAgaWYgKHByb3BzLm9uRm9jdXMpIHtcbiAgICAgIHByb3BzLm9uRm9jdXMoZSlcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlQ2hhbmdlIChlKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuICAgIHMuc2V0U3RhdGUoeyBzdWdnZXN0aW5nOiB0cnVlIH0pXG4gICAgaWYgKHByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICBwcm9wcy5vbkNoYW5nZShlKVxuICAgIH1cbiAgfSxcblxuICBoYW5kbGVCbHVyIChlKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuICAgIGlmIChwcm9wcy5vbkJsdXIpIHtcbiAgICAgIHByb3BzLm9uQmx1cihlKVxuICAgIH1cbiAgfSxcblxuICBoYW5kbGVLZXlVcCAoZSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICBzLnVwZGF0ZUNhbmRpZGF0ZXMoKVxuICAgIGlmIChwcm9wcy5vbktleVVwKSB7XG4gICAgICBwcm9wcy5vbktleVVwKGUpXG4gICAgfVxuICB9LFxuXG4gIGhhbmRsZUtleURvd24gKGUpIHtcbiAgICBjb25zdCBzID0gdGhpc1xuICAgIGxldCB7IHByb3BzIH0gPSBzXG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzg6IC8vIFVQXG4gICAgICAgIHMubW92ZUNhbmRpZGF0ZUluZGV4KC0xKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA0MDogLy8gRE9XTlxuICAgICAgICBzLm1vdmVDYW5kaWRhdGVJbmRleCgrMSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMTM6IC8vIEVudGVyXG4gICAgICAgIHMuZW50ZXJDYW5kaWRhdGUoKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcy5zZXRTdGF0ZSh7IHN1Z2dlc3Rpbmc6IHRydWUgfSlcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgaWYgKHByb3BzLm9uS2V5RG93bikge1xuICAgICAgcHJvcHMub25LZXlEb3duKGUpXG4gICAgfVxuICB9LFxuXG4gIG1vdmVDYW5kaWRhdGVJbmRleCAoYW1vdW50KSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBjYW5kaWRhdGVzLCBzZWxlY3RlZENhbmRpZGF0ZSB9ID0gcy5zdGF0ZVxuICAgIGlmICghY2FuZGlkYXRlcykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCBpbmRleCA9IGNhbmRpZGF0ZXMuaW5kZXhPZihzZWxlY3RlZENhbmRpZGF0ZSkgKyBhbW91bnRcbiAgICBsZXQgb3ZlciA9IChpbmRleCA9PT0gLTEpIHx8IChpbmRleCA9PT0gY2FuZGlkYXRlcy5sZW5ndGgpXG4gICAgaWYgKG92ZXIpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkQ2FuZGlkYXRlOiBjYW5kaWRhdGVzWyBpbmRleCBdIHx8IG51bGxcbiAgICB9KVxuICB9LFxuXG4gIHVwZGF0ZUNhbmRpZGF0ZXMgKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICBsZXQgdmFsdWUgPSBwcm9wcy52YWx1ZVxuICAgIGxldCBjYW5kaWRhdGVzID0gKHByb3BzLmNhbmRpZGF0ZXMgfHwgW10pXG4gICAgICAuZmlsdGVyKChjYW5kaWRhdGUpID0+ICEhY2FuZGlkYXRlKVxuICAgICAgLm1hcCgoY2FuZGlkYXRlKSA9PiBTdHJpbmcoY2FuZGlkYXRlKS50cmltKCkpXG4gICAgICAuZmlsdGVyKChjYW5kaWRhdGUpID0+ICF2YWx1ZSB8fCBjYW5kaWRhdGUubWF0Y2godmFsdWUpKVxuXG4gICAgbGV0IGhpdCA9IChjYW5kaWRhdGVzLmxlbmd0aCA9PT0gMSkgJiYgKGNhbmRpZGF0ZXNbIDAgXSA9PT0gdmFsdWUpXG4gICAgaWYgKGhpdCkge1xuICAgICAgY2FuZGlkYXRlcyA9IG51bGxcbiAgICB9XG4gICAgcy5zZXRTdGF0ZSh7IGNhbmRpZGF0ZXMgfSlcbiAgfSxcblxuICBlbnRlckNhbmRpZGF0ZSAoKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuICAgIGxldCB7IGNhbmRpZGF0ZXMsIHNlbGVjdGVkQ2FuZGlkYXRlIH0gPSBzLnN0YXRlXG4gICAgbGV0IHZhbGlkID0gY2FuZGlkYXRlcyAmJiAhIX5jYW5kaWRhdGVzLmluZGV4T2Yoc2VsZWN0ZWRDYW5kaWRhdGUpXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICBsZXQgdGFyZ2V0ID0gUmVhY3RET00uZmluZERPTU5vZGUocy5yZWZzWyBgY2FuZGlkYXRlLSR7c2VsZWN0ZWRDYW5kaWRhdGV9YCBdKVxuICAgICAgdGFyZ2V0LnZhbHVlID0gc2VsZWN0ZWRDYW5kaWRhdGVcbiAgICAgIGlmIChwcm9wcy5vbkNoYW5nZSkge1xuICAgICAgICBwcm9wcy5vbkNoYW5nZSh7IHRhcmdldCB9KVxuICAgICAgfVxuICAgICAgcy5zZXRTdGF0ZSh7IHN1Z2dlc3Rpbmc6IGZhbHNlIH0pXG4gICAgfVxuICB9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFByaXZhdGVcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgX3JlbmRlclRleHRBcmVhICh2YWx1ZSkge1xuICAgIGNvbnN0IHMgPSB0aGlzXG4gICAgbGV0IHsgcHJvcHMgfSA9IHNcbiAgICByZXR1cm4gKFxuICAgICAgPHRleHRhcmVhIGNsYXNzTmFtZT17IGNsYXNzbmFtZXMoJ2FwLXRleHQgYXAtdGV4dC1tdWx0aXBsZScsIHByb3BzLmNsYXNzTmFtZSkgfVxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgICAgICAgIG9uRm9jdXM9XCJcIlxuICAgICAgICB7IC4uLnByb3BzIH0+XG4gICAgICAgICAgICAgICAgPC90ZXh0YXJlYT5cbiAgICApXG4gIH0sXG4gIF9yZW5kZXJUZXh0SW5wdXQgKHZhbHVlKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXQgY2xhc3NOYW1lPXsgY2xhc3NuYW1lcygnYXAtdGV4dCcsIHByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgICAgdmFsdWU9eyB2YWx1ZSB9XG4gICAgICAgICAgICAgb25Gb2N1cz17IHMuaGFuZGxlRm9jdXMgfVxuICAgICAgICAgICAgIG9uS2V5VXA9eyBzLmhhbmRsZUtleVVwIH1cbiAgICAgICAgICAgICBvbkNoYW5nZT17IHMuaGFuZGxlQ2hhbmdlIH1cbiAgICAgICAgICAgICBvbkJsdXI9eyBzLmhhbmRsZUJsdXIgfVxuICAgICAgICAgICAgIG9uS2V5RG93bj17IHMuaGFuZGxlS2V5RG93biB9XG4gICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICB7IC4uLnByb3BzIH0gLz5cbiAgICApXG4gIH0sXG4gIF9yZW5kZXJDYW5kaWRhdGVMaXN0IChjYW5kaWRhdGVzLCBzZWxlY3RlZENhbmRpZGF0ZSwgbXVsdGlsaW5lKSB7XG4gICAgY29uc3QgcyA9IHRoaXNcbiAgICBsZXQgeyBwcm9wcyB9ID0gc1xuICAgIGlmIChtdWx0aWxpbmUpIHtcbiAgICAgIGNvbnNvbGUud2FybignW0FwVGV4dF0gQ2FuIG5vdCB1c2UgY2FuZGlkYXRlcyB3aXRoIG11bHRpbGluZSBpbnB1dC4nKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBpZiAoIWNhbmRpZGF0ZXMpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgaWYgKCFjYW5kaWRhdGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJhcC10ZXh0LWNhbmRpZGF0ZS1saXN0XCI+XG4gICAgICAgIHtcbiAgICAgICAgICBjYW5kaWRhdGVzLm1hcCgoY2FuZGlkYXRlKSA9PlxuICAgICAgICAgICAgPGxpIGtleT17Y2FuZGlkYXRlfSBjbGFzc05hbWU9eyBjbGFzc25hbWVzKFwiYXAtdGV4dC1jYW5kaWRhdGUtbGlzdC1pdGVtXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhcC10ZXh0LWNhbmRpZGF0ZS1saXN0LWl0ZW0tc2VsZWN0ZWQnOiBjYW5kaWRhdGUgPT09IHNlbGVjdGVkQ2FuZGlkYXRlXG4gICAgICAgICAgICAgICAgICAgICAgfSkgfT5cbiAgICAgICAgICAgICAgPGEgb25DbGljaz17cy5oYW5kbGVDYW5kaWRhdGV9XG4gICAgICAgICAgICAgICAgIHJlZj17YGNhbmRpZGF0ZS0ke2NhbmRpZGF0ZX1gfVxuICAgICAgICAgICAgICAgICBkYXRhLXZhbHVlPXtjYW5kaWRhdGV9PntjYW5kaWRhdGV9PC9hPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIDwvdWw+XG4gICAgKVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFwVGV4dFxuIl19
