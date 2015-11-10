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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzeC9hcF90ZXh0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUtBLFlBQVksQ0FBQzs7OztBQUViLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTOzs7QUFBQyxBQUc1QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7Ozs7QUFPM0IsYUFBUyxFQUFHO0FBQ1osWUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO0FBQ2xCLGFBQUssRUFBRSxLQUFLLENBQUMsTUFBTTtBQUNuQixtQkFBVyxFQUFFLEtBQUssQ0FBQyxNQUFNO0FBQ3pCLFlBQUksRUFBRSxLQUFLLENBQUMsTUFBTTtLQUNyQjs7QUFFRyxtQkFBZSxFQUFFLFlBQVk7QUFDekIsZUFBTyxFQUFFLENBQUE7S0FDWjs7QUFFRCxtQkFBZSxFQUFFLFlBQVk7QUFDekIsZUFBTztBQUNILGdCQUFJLEVBQUUsRUFBRTtBQUNSLGlCQUFLLEVBQUUsRUFBRTtBQUNULHVCQUFXLEVBQUUsRUFBRTtBQUNmLGdCQUFJLEVBQUUsQ0FBQztTQUNWLENBQUE7S0FDSjs7QUFFRCxVQUFNLEVBQUUsWUFBVztBQUNmLFlBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNiLFlBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDcEIsWUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7QUFDL0IsWUFBSSxTQUFTLEVBQUU7QUFDWCxtQkFBUSwyQ0FBVSxTQUFTLEVBQUMsMEJBQTBCO2VBQzlDLEtBQUssRUFBYSxDQUFDO1NBQzlCLE1BQU07QUFDSCxtQkFDSSx3Q0FBTyxTQUFTLEVBQUMsU0FBUztBQUNuQixvQkFBSSxFQUFDLE1BQU0sSUFBSyxLQUFLLEVBQUksQ0FDbkM7U0FDSjtLQUNKOztDQUVKLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyIsImZpbGUiOiJhcF90ZXh0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9va3VuaXNoaXRha2EvcHJvamVjdHMvYXBlbWFuLXJlYWN0LWxhYm8vYXBlbWFuLXJlYWN0LXRleHQvbGliL2pzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogYXBlbWFuIHJlYWN0IHBhY2thZ2UgdGV4dCBjb21wb25lbnQuXG4gKiBAY29uc3RydWN0b3IgQXBUZXh0XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgdHlwZXMgPSBSZWFjdC5Qcm9wVHlwZXM7XG5cbi8qKiBAbGVuZHMgQXBUZXh0ICovXG52YXIgQXBUZXh0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gU3BlY3NcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBwcm9wVHlwZXMgOiB7XG4gICAgbmFtZTogdHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlOiB0eXBlcy5zdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IHR5cGVzLnN0cmluZyxcbiAgICByb3dzOiB0eXBlcy5udW1iZXJcbn0sXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHt9XG4gICAgfSxcblxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJycsXG4gICAgICAgICAgICByb3dzOiAxXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHMgPSB0aGlzO1xuICAgICAgICB2YXIgcHJvcHMgPSBzLnByb3BzO1xuICAgICAgICB2YXIgbXVsdGlsaW5lID0gcHJvcHMucm93cyA+IDE7XG4gICAgICAgIGlmIChtdWx0aWxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAoPHRleHRhcmVhIGNsYXNzTmFtZT1cImFwLXRleHQgYXAtdGV4dC1tdWx0aXBsZVwiXG4gICAgICAgICAgICAgICAgey4uLnByb3BzfT48L3RleHRhcmVhPilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImFwLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIHsuLi5wcm9wc30gLz5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXBUZXh0O1xuXG4iXX0=