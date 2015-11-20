"use strict";

const React = require('react'),
      pkg = require('../../package.json'),
      links = require('../links.json'),
      fs = require('fs'),
      apeHighlighting = require('ape-highlighting'),
      highlightJsx = apeHighlighting.highlightJsx,
      stylesheets = require('apeman-asset-stylesheets');

const Demo = require('./demo.component.js'),
      ApTextStyle = require('../../lib/ap_text_style'),
      basic = require('apeman-react-basic'),
      ApStyle = basic.ApStyle,
      ApHead = basic.ApHead,
      ApLinks = basic.ApLinks,
      ApHtml = basic.ApHtml;

const FAVICON_URL = "https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/favicon/react-favicon.png";

module.exports = React.createElement(
    ApHtml,
    { className: 'react-demo' },
    React.createElement(
        ApHead,
        { charset: 'UTF-8',
            title: pkg.name + ' Demo',
            icon: FAVICON_URL },
        React.createElement(ApStyle, { data: fs.readFileSync(stylesheets.reactDemo).toString() }),
        React.createElement(ApTextStyle, null)
    ),
    React.createElement(
        'body',
        null,
        React.createElement('div', { id: 'demo-style' }),
        React.createElement(
            'header',
            { className: 'react-demo-header' },
            React.createElement(
                'div',
                { className: 'react-demo-container' },
                React.createElement(
                    'h1',
                    null,
                    React.createElement(
                        'a',
                        { href: pkg.homepage },
                        pkg.name
                    )
                )
            )
        ),
        React.createElement(
            'main',
            null,
            React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'react-demo-playground' },
                    React.createElement(
                        'div',
                        { className: 'react-demo-container', id: 'demo-wrap' },
                        React.createElement(Demo, null)
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'react-demo-container' },
                React.createElement(
                    'div',
                    null,
                    React.createElement('pre', { className: 'react-demo-src', dangerouslySetInnerHTML: { __html: highlightJsx.fromFile(require.resolve('./demo.component.jsx')) } })
                )
            )
        ),
        React.createElement(
            'footer',
            null,
            React.createElement(
                'div',
                { className: 'react-demo-container' },
                React.createElement(ApLinks, { links: links })
            )
        ),
        React.createElement('script', { src: './demo.js' })
    )
);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8uaHRtbC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOztBQUViLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7TUFDMUIsR0FBRyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztNQUNuQyxLQUFLLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQztNQUNoQyxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztNQUNsQixlQUFlLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDO01BQzdDLFlBQVksR0FBRyxlQUFlLENBQUMsWUFBWTtNQUMzQyxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7O0FBRXRELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztNQUN2QyxXQUFXLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDO01BQ2hELEtBQUssR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUM7TUFDckMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPO01BQ3ZCLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTTtNQUNyQixPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU87TUFDdkIsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7O0FBRTFCLE1BQU0sV0FBVyxHQUFHLCtHQUErRyxDQUFDOztBQUVwSSxNQUFNLENBQUMsT0FBTyxHQUNWO0FBQUMsVUFBTTtNQUFDLFNBQVMsRUFBQyxZQUFZO0lBQzFCO0FBQUMsY0FBTTtVQUFDLE9BQU8sRUFBQyxPQUFPO0FBQ2YsaUJBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLE9BQU8sQUFBQztBQUMxQixnQkFBSSxFQUFFLFdBQVcsQUFBQztRQUN0QixvQkFBQyxPQUFPLElBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxBQUFDLEdBQVc7UUFDNUUsb0JBQUMsV0FBVyxPQUFlO0tBQ3RCO0lBQ1Q7OztRQUNBLDZCQUFLLEVBQUUsRUFBQyxZQUFZLEdBQU87UUFDM0I7O2NBQVEsU0FBUyxFQUFDLG1CQUFtQjtZQUNqQzs7a0JBQUssU0FBUyxFQUFDLHNCQUFzQjtnQkFDakM7OztvQkFDSTs7MEJBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEFBQUM7d0JBQUUsR0FBRyxDQUFDLElBQUk7cUJBQUs7aUJBQ3BDO2FBQ0g7U0FDRDtRQUNUOzs7WUFDSTs7O2dCQUNJOztzQkFBSyxTQUFTLEVBQUMsdUJBQXVCO29CQUNsQzs7MEJBQUssU0FBUyxFQUFDLHNCQUFzQixFQUFDLEVBQUUsRUFBQyxXQUFXO3dCQUNoRCxvQkFBQyxJQUFJLE9BQVE7cUJBQ1g7aUJBQ0o7YUFDSjtZQUNOOztrQkFBSyxTQUFTLEVBQUMsc0JBQXNCO2dCQUNqQzs7O29CQUNoQiw2QkFBSyxTQUFTLEVBQUMsZ0JBQWdCLEVBQUMsdUJBQXVCLEVBQ3ZELEVBQUMsTUFBTSxFQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUMsQUFDdEUsR0FDSztpQkFDZ0I7YUFDSjtTQUVIO1FBQ1A7OztZQUNJOztrQkFBSyxTQUFTLEVBQUMsc0JBQXNCO2dCQUNqQyxvQkFBQyxPQUFPLElBQUMsS0FBSyxFQUFFLEtBQUssQUFBQyxHQUFXO2FBQy9CO1NBQ0Q7UUFDVCxnQ0FBUSxHQUFHLEVBQUMsV0FBVyxHQUFVO0tBQzFCO0NBQ0YsQUFDWixDQUFDIiwiZmlsZSI6ImRlbW8uaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvb2t1bmlzaGl0YWthL3Byb2plY3RzL2FwZW1hbi1yZWFjdC1sYWJvL2FwZW1hbi1yZWFjdC10ZXh0L2RvYy9kZW1vIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBwa2cgPSByZXF1aXJlKCcuLi8uLi9wYWNrYWdlLmpzb24nKSxcbiAgICBsaW5rcyA9IHJlcXVpcmUoJy4uL2xpbmtzLmpzb24nKSxcbiAgICBmcyA9IHJlcXVpcmUoJ2ZzJyksXG4gICAgYXBlSGlnaGxpZ2h0aW5nID0gcmVxdWlyZSgnYXBlLWhpZ2hsaWdodGluZycpLFxuICAgIGhpZ2hsaWdodEpzeCA9IGFwZUhpZ2hsaWdodGluZy5oaWdobGlnaHRKc3gsXG4gICAgc3R5bGVzaGVldHMgPSByZXF1aXJlKCdhcGVtYW4tYXNzZXQtc3R5bGVzaGVldHMnKTtcblxuY29uc3QgRGVtbyA9IHJlcXVpcmUoJy4vZGVtby5jb21wb25lbnQuanMnKSxcbiAgICBBcFRleHRTdHlsZSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9hcF90ZXh0X3N0eWxlJyksXG4gICAgYmFzaWMgPSByZXF1aXJlKCdhcGVtYW4tcmVhY3QtYmFzaWMnKSxcbiAgICBBcFN0eWxlID0gYmFzaWMuQXBTdHlsZSxcbiAgICBBcEhlYWQgPSBiYXNpYy5BcEhlYWQsXG4gICAgQXBMaW5rcyA9IGJhc2ljLkFwTGlua3MsXG4gICAgQXBIdG1sID0gYmFzaWMuQXBIdG1sO1xuXG5jb25zdCBGQVZJQ09OX1VSTCA9IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2FwZW1hbi1hc3NldC1sYWJvL2FwZW1hbi1hc3NldC1pbWFnZXMvbWFzdGVyL2Rpc3QvZmF2aWNvbi9yZWFjdC1mYXZpY29uLnBuZ1wiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgICA8QXBIdG1sIGNsYXNzTmFtZT1cInJlYWN0LWRlbW9cIj5cbiAgICAgICAgPEFwSGVhZCBjaGFyc2V0PVwiVVRGLThcIlxuICAgICAgICAgICAgICAgIHRpdGxlPXtwa2cubmFtZSArICcgRGVtbyd9XG4gICAgICAgICAgICAgICAgaWNvbj17RkFWSUNPTl9VUkx9PlxuICAgICAgICAgICAgPEFwU3R5bGUgZGF0YT17ZnMucmVhZEZpbGVTeW5jKHN0eWxlc2hlZXRzLnJlYWN0RGVtbykudG9TdHJpbmcoKX0+PC9BcFN0eWxlPlxuICAgICAgICAgICAgPEFwVGV4dFN0eWxlPjwvQXBUZXh0U3R5bGU+XG4gICAgICAgIDwvQXBIZWFkPlxuICAgICAgICA8Ym9keT5cbiAgICAgICAgPGRpdiBpZD1cImRlbW8tc3R5bGVcIj48L2Rpdj5cbiAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJyZWFjdC1kZW1vLWhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kZW1vLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxoMT5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17cGtnLmhvbWVwYWdlfT57cGtnLm5hbWV9PC9hPlxuICAgICAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgIDxtYWluPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRlbW8tcGxheWdyb3VuZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRlbW8tY29udGFpbmVyXCIgaWQ9XCJkZW1vLXdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxEZW1vPjwvRGVtbz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGVtby1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuPHByZSBjbGFzc05hbWU9XCJyZWFjdC1kZW1vLXNyY1wiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtcbntfX2h0bWw6aGlnaGxpZ2h0SnN4LmZyb21GaWxlKHJlcXVpcmUucmVzb2x2ZSgnLi9kZW1vLmNvbXBvbmVudC5qc3gnKSl9XG59PlxuPC9wcmU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L21haW4+XG4gICAgICAgIDxmb290ZXI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRlbW8tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPEFwTGlua3MgbGlua3M9e2xpbmtzfT48L0FwTGlua3M+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb290ZXI+XG4gICAgICAgIDxzY3JpcHQgc3JjPVwiLi9kZW1vLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgIDwvYm9keT5cbiAgICA8L0FwSHRtbD5cbik7XG4iXX0=