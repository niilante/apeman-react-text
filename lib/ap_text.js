/**
 * apeman react package text component.
 * @constructor ApText
 */

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const React = require('react'),
      types = React.PropTypes;

/** @lends ApText */
const ApText = React.createClass({
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
        let s = this;
        let props = s.props;
        let multiline = props.rows > 1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzeC9hcF90ZXh0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUtBLFlBQVksQ0FBQzs7OztBQUViLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7TUFDMUIsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTOzs7QUFBQyxBQUc1QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0FBTzdCLGFBQVMsRUFBRztBQUNaLFlBQUksRUFBRSxLQUFLLENBQUMsTUFBTTtBQUNsQixhQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU07QUFDbkIsbUJBQVcsRUFBRSxLQUFLLENBQUMsTUFBTTtBQUN6QixZQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU07S0FDckI7O0FBRUcsbUJBQWUsRUFBRSxZQUFZO0FBQ3pCLGVBQU8sRUFBRSxDQUFBO0tBQ1o7O0FBRUQsbUJBQWUsRUFBRSxZQUFZO0FBQ3pCLGVBQU87QUFDSCxnQkFBSSxFQUFFLEVBQUU7QUFDUixpQkFBSyxFQUFFLEVBQUU7QUFDVCx1QkFBVyxFQUFFLEVBQUU7QUFDZixnQkFBSSxFQUFFLENBQUM7U0FDVixDQUFBO0tBQ0o7O0FBRUQsVUFBTSxFQUFFLFlBQVc7QUFDZixZQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDYixZQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3BCLFlBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLFlBQUksU0FBUyxFQUFFO0FBQ1gsbUJBQVEsMkNBQVUsU0FBUyxFQUFDLDBCQUEwQjtlQUM5QyxLQUFLLEVBQWEsQ0FBQztTQUM5QixNQUFNO0FBQ0gsbUJBQ0ksd0NBQU8sU0FBUyxFQUFDLFNBQVM7QUFDbkIsb0JBQUksRUFBQyxNQUFNLElBQUssS0FBSyxFQUFJLENBQ25DO1NBQ0o7S0FDSjs7Q0FFSixDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMiLCJmaWxlIjoiYXBfdGV4dC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvb2t1bmlzaGl0YWthL3Byb2plY3RzL2FwZW1hbi1yZWFjdC1sYWJvL2FwZW1hbi1yZWFjdC10ZXh0L2xpYi9qc3giLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGFwZW1hbiByZWFjdCBwYWNrYWdlIHRleHQgY29tcG9uZW50LlxuICogQGNvbnN0cnVjdG9yIEFwVGV4dFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgdHlwZXMgPSBSZWFjdC5Qcm9wVHlwZXM7XG5cbi8qKiBAbGVuZHMgQXBUZXh0ICovXG5jb25zdCBBcFRleHQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBTcGVjc1xuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHByb3BUeXBlcyA6IHtcbiAgICBuYW1lOiB0eXBlcy5zdHJpbmcsXG4gICAgdmFsdWU6IHR5cGVzLnN0cmluZyxcbiAgICBwbGFjZWhvbGRlcjogdHlwZXMuc3RyaW5nLFxuICAgIHJvd3M6IHR5cGVzLm51bWJlclxufSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge31cbiAgICB9LFxuXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnJyxcbiAgICAgICAgICAgIHJvd3M6IDFcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcyA9IHRoaXM7XG4gICAgICAgIGxldCBwcm9wcyA9IHMucHJvcHM7XG4gICAgICAgIGxldCBtdWx0aWxpbmUgPSBwcm9wcy5yb3dzID4gMTtcbiAgICAgICAgaWYgKG11bHRpbGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICg8dGV4dGFyZWEgY2xhc3NOYW1lPVwiYXAtdGV4dCBhcC10ZXh0LW11bHRpcGxlXCJcbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9PjwvdGV4dGFyZWE+KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYXAtdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgey4uLnByb3BzfSAvPlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcFRleHQ7XG5cbiJdfQ==