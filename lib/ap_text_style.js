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
        let s = this,
            props = s.props;
        return React.createElement(
            ApStyle,
            props,
            props.children
        );
    }
});
module.exports = ApTextStyle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzeC9hcF90ZXh0X3N0eWxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUtBLFlBQVksQ0FBQzs7QUFFYixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO01BQzFCLE9BQU8sR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxTQUFTLENBQUM7OztBQUFDLEFBR3ZELElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUNoQyxhQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7QUFDNUIsbUJBQWUsRUFBRSxZQUFZO0FBQ3pCLGVBQU87QUFDSCxnQkFBSSxFQUFFO0FBQ0YsMEJBQVUsRUFBRTtBQUNSLDZCQUFTLEVBQUUsT0FBTztBQUNsQiw2QkFBUyxFQUFFLFNBQVM7QUFDcEIsNEJBQVEsRUFBRSxnQkFBZ0I7QUFDMUIsNEJBQVEsRUFBRSxLQUFLO0FBQ2YsMkJBQU8sRUFBRSxNQUFNO0FBQ2YsOEJBQVUsRUFBRSxPQUFPO0FBQ25CLGtDQUFjLEVBQUUsS0FBSztBQUNyQiwrQkFBVyxFQUFFLG1DQUFtQztpQkFDbkQ7QUFDRCxtQ0FBbUIsRUFBRTtBQUNqQiw4QkFBVSxFQUFFLE1BQU07aUJBQ3JCO2FBQ0o7U0FDSixDQUFBO0tBQ0o7QUFDRCxVQUFNLEVBQUUsWUFBWTtBQUNoQixZQUFJLENBQUMsR0FBRyxJQUFJO1lBQ1IsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDcEIsZUFBTztBQUFDLG1CQUFPO1lBQUssS0FBSztZQUFHLEtBQUssQ0FBQyxRQUFRO1NBQVcsQ0FBQztLQUN6RDtDQUNKLENBQUMsQ0FBQztBQUNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDIiwiZmlsZSI6ImFwX3RleHRfc3R5bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL29rdW5pc2hpdGFrYS9wcm9qZWN0cy9hcGVtYW4tcmVhY3QtbGFiby9hcGVtYW4tcmVhY3QtdGV4dC9saWIvanN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTdHlsZSBmb3IgQXBUZXh0LlxuICogQGNvbnN0cnVjdG9yIEFwVGV4dFN0eWxlXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBBcFN0eWxlID0gcmVxdWlyZSgnYXBlbWFuLXJlYWN0LXN0eWxlJylbJ0FwU3R5bGUnXTtcblxuLyoqIEBsZW5kcyBBcFRleHRTdHlsZSAqL1xubGV0IEFwVGV4dFN0eWxlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHByb3BUeXBlczogQXBTdHlsZS5wcm9wVHlwZXMsXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgJy5hcC10ZXh0Jzoge1xuICAgICAgICAgICAgICAgICAgICAnZGlzcGxheSc6ICdibG9jaycsXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nJzogJzRweCA4cHgnLFxuICAgICAgICAgICAgICAgICAgICAnYm9yZGVyJzogJzFweCBzb2xpZCAjQUFBJyxcbiAgICAgICAgICAgICAgICAgICAgJ21hcmdpbic6ICc0cHgnLFxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICdtYXhXaWR0aCc6ICc0ODBweCcsXG4gICAgICAgICAgICAgICAgICAgICdib3JkZXJSYWRpdXMnOiAnMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2JveFNoYWRvdyc6ICcxcHggMXB4IDFweCByZ2JhKDAsMCwwLC4wNSkgaW5zZXQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnLmFwLXRleHQtbXVsdGlwbGUnOiB7XG4gICAgICAgICAgICAgICAgICAgICdvdmVyZmxvdyc6ICdhdXRvJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzID0gdGhpcyxcbiAgICAgICAgICAgIHByb3BzID0gcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIDxBcFN0eWxlIHsuLi5wcm9wc30+e3Byb3BzLmNoaWxkcmVufTwvQXBTdHlsZT47XG4gICAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IEFwVGV4dFN0eWxlO1xuXG5cbiJdfQ==