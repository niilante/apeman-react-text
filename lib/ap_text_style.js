/**
 * Style for ApText.
 * @constructor ApTextStyle
 */

"use strict";

const React = require('react'),
      ApStyle = require('apeman-react-style')['ApStyle'];

/** @lends ApTextStyle */
let ApTextStyle = React.createClass({
    displayName: 'ApTextStyle',

    propTypes: ApStyle.propTypes,
    getDefaultProps: function () {
        return {
            data: {
                '.ap-text': {
                    'display': 'block',
                    'padding': '4px 8px',
                    'border': '1px solid #AAA',
                    'margin': '4px',
                    'width': '100%',
                    'maxWidth': '480px',
                    'borderRadius': '2px',
                    'boxShadow': '1px 1px 1px rgba(0,0,0,.05) inset'
                },
                '.ap-text-multiple': {
                    'overflow': 'auto'
                }
            }
        };
    },
    render: function () {
        let s = this;
        return React.createElement(ApStyle, s.props);
    }
});
module.exports = ApTextStyle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzeC9hcF90ZXh0X3N0eWxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUtBLFlBQVksQ0FBQzs7QUFFYixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO01BQzFCLE9BQU8sR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxTQUFTLENBQUM7OztBQUFDLEFBR3ZELElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUNoQyxhQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7QUFDNUIsbUJBQWUsRUFBRSxZQUFZO0FBQ3pCLGVBQU87QUFDSCxnQkFBSSxFQUFFO0FBQ0YsMEJBQVUsRUFBRTtBQUNSLDZCQUFTLEVBQUUsT0FBTztBQUNsQiw2QkFBUyxFQUFFLFNBQVM7QUFDcEIsNEJBQVEsRUFBRSxnQkFBZ0I7QUFDMUIsNEJBQVEsRUFBRSxLQUFLO0FBQ2YsMkJBQU8sRUFBRSxNQUFNO0FBQ2YsOEJBQVUsRUFBRSxPQUFPO0FBQ25CLGtDQUFjLEVBQUUsS0FBSztBQUNyQiwrQkFBVyxFQUFFLG1DQUFtQztpQkFDbkQ7QUFDRCxtQ0FBbUIsRUFBRTtBQUNqQiw4QkFBVSxFQUFFLE1BQU07aUJBQ3JCO2FBQ0o7U0FDSixDQUFBO0tBQ0o7QUFDRCxVQUFNLEVBQUUsWUFBWTtBQUNoQixZQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDYixlQUFPLG9CQUFDLE9BQU8sRUFBSyxDQUFDLENBQUMsS0FBSyxDQUFZLENBQUE7S0FDMUM7Q0FDSixDQUFDLENBQUM7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyIsImZpbGUiOiJhcF90ZXh0X3N0eWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9va3VuaXNoaXRha2EvcHJvamVjdHMvYXBlbWFuLXJlYWN0LWxhYm8vYXBlbWFuLXJlYWN0LXRleHQvbGliL2pzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU3R5bGUgZm9yIEFwVGV4dC5cbiAqIEBjb25zdHJ1Y3RvciBBcFRleHRTdHlsZVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgQXBTdHlsZSA9IHJlcXVpcmUoJ2FwZW1hbi1yZWFjdC1zdHlsZScpWydBcFN0eWxlJ107XG5cbi8qKiBAbGVuZHMgQXBUZXh0U3R5bGUgKi9cbmxldCBBcFRleHRTdHlsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBwcm9wVHlwZXM6IEFwU3R5bGUucHJvcFR5cGVzLFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICcuYXAtdGV4dCc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXknOiAnYmxvY2snLFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZyc6ICc0cHggOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlcic6ICcxcHggc29saWQgI0FBQScsXG4gICAgICAgICAgICAgICAgICAgICdtYXJnaW4nOiAnNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAnbWF4V2lkdGgnOiAnNDgwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnYm9yZGVyUmFkaXVzJzogJzJweCcsXG4gICAgICAgICAgICAgICAgICAgICdib3hTaGFkb3cnOiAnMXB4IDFweCAxcHggcmdiYSgwLDAsMCwuMDUpIGluc2V0J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJy5hcC10ZXh0LW11bHRpcGxlJzoge1xuICAgICAgICAgICAgICAgICAgICAnb3ZlcmZsb3cnOiAnYXV0bydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiA8QXBTdHlsZSB7Li4ucy5wcm9wc30+PC9BcFN0eWxlPlxuICAgIH1cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBBcFRleHRTdHlsZTtcblxuXG4iXX0=