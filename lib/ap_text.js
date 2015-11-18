/**
 * apeman react package text component.
 * @constructor ApText
 */

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react'),
    types = React.PropTypes;

/** @lends ApText */
var ApText = React.createClass({
    displayName: 'ApText',

    //--------------------
    // Specs
    //--------------------

    propTypes: {
        name: types.string,
        value: types.string,
        placeholder: types.string,
        rows: types.number
    },

    getInitialState: function () {
        return {};
    },

    getDefaultProps: function () {
        return {
            name: '',
            value: '',
            placeholder: '',
            rows: 1
        };
    },

    render: function () {
        var s = this;
        var props = s.props;
        var multiline = props.rows > 1;
        if (multiline) {
            return React.createElement('textarea', _extends({ className: 'ap-text ap-text-multiple'
            }, props));
        } else {
            return React.createElement('input', _extends({ className: 'ap-text',
                type: 'text' }, props));
        }
    }

});

module.exports = ApText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzeC9hcF90ZXh0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUtBLFlBQVksQ0FBQzs7OztBQUViLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTOzs7QUFBQyxBQUc1QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0FBTzNCLGFBQVMsRUFBRztBQUNaLFlBQUksRUFBRSxLQUFLLENBQUMsTUFBTTtBQUNsQixhQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU07QUFDbkIsbUJBQVcsRUFBRSxLQUFLLENBQUMsTUFBTTtBQUN6QixZQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU07S0FDckI7O0FBRUcsbUJBQWUsRUFBRSxZQUFZO0FBQ3pCLGVBQU8sRUFBRSxDQUFBO0tBQ1o7O0FBRUQsbUJBQWUsRUFBRSxZQUFZO0FBQ3pCLGVBQU87QUFDSCxnQkFBSSxFQUFFLEVBQUU7QUFDUixpQkFBSyxFQUFFLEVBQUU7QUFDVCx1QkFBVyxFQUFFLEVBQUU7QUFDZixnQkFBSSxFQUFFLENBQUM7U0FDVixDQUFBO0tBQ0o7O0FBRUQsVUFBTSxFQUFFLFlBQVc7QUFDZixZQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDYixZQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3BCLFlBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLFlBQUksU0FBUyxFQUFFO0FBQ1gsbUJBQVEsMkNBQVUsU0FBUyxFQUFDLDBCQUEwQjtlQUM5QyxLQUFLLEVBQWEsQ0FBQztTQUM5QixNQUFNO0FBQ0gsbUJBQ0ksd0NBQU8sU0FBUyxFQUFDLFNBQVM7QUFDbkIsb0JBQUksRUFBQyxNQUFNLElBQUssS0FBSyxFQUFJLENBQ25DO1NBQ0o7S0FDSjs7Q0FFSixDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMiLCJmaWxlIjoiYXBfdGV4dC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvb2t1bmlzaGl0YWthL3Byb2plY3RzL2FwZW1hbi1yZWFjdC1sYWJvL2FwZW1hbi1yZWFjdC10ZXh0L2xpYi9qc3giLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGFwZW1hbiByZWFjdCBwYWNrYWdlIHRleHQgY29tcG9uZW50LlxuICogQGNvbnN0cnVjdG9yIEFwVGV4dFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIHR5cGVzID0gUmVhY3QuUHJvcFR5cGVzO1xuXG4vKiogQGxlbmRzIEFwVGV4dCAqL1xudmFyIEFwVGV4dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFNwZWNzXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgcHJvcFR5cGVzIDoge1xuICAgIG5hbWU6IHR5cGVzLnN0cmluZyxcbiAgICB2YWx1ZTogdHlwZXMuc3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiB0eXBlcy5zdHJpbmcsXG4gICAgcm93czogdHlwZXMubnVtYmVyXG59LFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7fVxuICAgIH0sXG5cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgICAgICAgICAgcm93czogMVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzID0gdGhpcztcbiAgICAgICAgdmFyIHByb3BzID0gcy5wcm9wcztcbiAgICAgICAgdmFyIG11bHRpbGluZSA9IHByb3BzLnJvd3MgPiAxO1xuICAgICAgICBpZiAobXVsdGlsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gKDx0ZXh0YXJlYSBjbGFzc05hbWU9XCJhcC10ZXh0IGFwLXRleHQtbXVsdGlwbGVcIlxuICAgICAgICAgICAgICAgIHsuLi5wcm9wc30+PC90ZXh0YXJlYT4pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJhcC10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiB7Li4ucHJvcHN9IC8+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwVGV4dDtcblxuIl19