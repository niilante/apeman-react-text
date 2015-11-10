"use strict";

var React = require('react'),
    pkg = require('../../package.json'),
    links = require('../links.json'),
    fs = require('fs'),
    apeHighlighting = require('ape-highlighting'),
    highlightJsx = apeHighlighting.highlightJsx,
    style = require('apeman-react-style'),
    stylesheets = require('apeman-asset-stylesheets'),
    html = require('apeman-react-html');

var Demo = require('./demo.component.js'),
    ApTextStyle = require('../../lib/ap_text_style'),
    ApStyle = style.ApStyle,
    ApHtml = html.ApHtml;

module.exports = React.createElement(
    ApHtml,
    { className: 'react-demo' },
    React.createElement(
        'head',
        null,
        React.createElement('meta', { charSet: 'UTF-8' }),
        React.createElement('title', { dangerouslySetInnerHTML: { __html: pkg.name + ' Demo' } }),
        React.createElement('link', { rel: 'icon',
            href: 'https://raw.githubusercontent.com/fur-repo/fur-examples/master/example/15-apeman-react-contrib/favicon.png' }),
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
                React.createElement(
                    'ul',
                    null,
                    Object.keys(links).map(function (key) {
                        var url = links[key];
                        return React.createElement(
                            'li',
                            { key: key },
                            React.createElement(
                                'a',
                                { href: url },
                                key
                            )
                        );
                    })
                )
            )
        ),
        React.createElement('script', { src: './demo.js' })
    )
);
//# sourceMappingURL=data:application/json;base64,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Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9va3VuaXNoaXRha2EvcHJvamVjdHMvYXBlbWFuLXJlYWN0LWxhYm8vYXBlbWFuLXJlYWN0LXRleHQvZG9jL2RlbW8iLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBwa2cgPSByZXF1aXJlKCcuLi8uLi9wYWNrYWdlLmpzb24nKSxcbiAgICBsaW5rcyA9IHJlcXVpcmUoJy4uL2xpbmtzLmpzb24nKSxcbiAgICBmcyA9IHJlcXVpcmUoJ2ZzJyksXG4gICAgYXBlSGlnaGxpZ2h0aW5nID0gcmVxdWlyZSgnYXBlLWhpZ2hsaWdodGluZycpLFxuICAgIGhpZ2hsaWdodEpzeCA9IGFwZUhpZ2hsaWdodGluZy5oaWdobGlnaHRKc3gsXG4gICAgc3R5bGUgPSByZXF1aXJlKCdhcGVtYW4tcmVhY3Qtc3R5bGUnKSxcbiAgICBzdHlsZXNoZWV0cyA9IHJlcXVpcmUoJ2FwZW1hbi1hc3NldC1zdHlsZXNoZWV0cycpLFxuICAgIGh0bWwgPSByZXF1aXJlKCdhcGVtYW4tcmVhY3QtaHRtbCcpO1xuXG52YXIgRGVtbyA9IHJlcXVpcmUoJy4vZGVtby5jb21wb25lbnQuanMnKSxcbiAgICBBcFRleHRTdHlsZSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9hcF90ZXh0X3N0eWxlJyksXG4gICAgQXBTdHlsZSA9IHN0eWxlLkFwU3R5bGUsXG4gICAgQXBIdG1sID0gaHRtbC5BcEh0bWw7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICAgIDxBcEh0bWwgY2xhc3NOYW1lPVwicmVhY3QtZGVtb1wiPlxuICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgIDxtZXRhIGNoYXJTZXQ9XCJVVEYtOFwiLz5cbiAgICAgICAgICAgIDx0aXRsZSBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbDpwa2cubmFtZSArICcgRGVtbyd9fT48L3RpdGxlPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiXG4gICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Z1ci1yZXBvL2Z1ci1leGFtcGxlcy9tYXN0ZXIvZXhhbXBsZS8xNS1hcGVtYW4tcmVhY3QtY29udHJpYi9mYXZpY29uLnBuZ1wiLz5cbiAgICAgICAgICAgIDxBcFN0eWxlIGRhdGE9e2ZzLnJlYWRGaWxlU3luYyhzdHlsZXNoZWV0cy5yZWFjdERlbW8pLnRvU3RyaW5nKCl9PjwvQXBTdHlsZT5cbiAgICAgICAgICAgIDxBcFRleHRTdHlsZT48L0FwVGV4dFN0eWxlPlxuICAgICAgICA8L2hlYWQ+XG4gICAgICAgIDxib2R5PlxuICAgICAgICA8ZGl2IGlkPVwiZGVtby1zdHlsZVwiPjwvZGl2PlxuICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInJlYWN0LWRlbW8taGVhZGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRlbW8tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGgxPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXtwa2cuaG9tZXBhZ2V9Pntwa2cubmFtZX08L2E+XG4gICAgICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgPG1haW4+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGVtby1wbGF5Z3JvdW5kXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGVtby1jb250YWluZXJcIiBpZD1cImRlbW8td3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPERlbW8+PC9EZW1vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kZW1vLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG48cHJlIGNsYXNzTmFtZT1cInJlYWN0LWRlbW8tc3JjXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e1xue19faHRtbDpoaWdobGlnaHRKc3guZnJvbUZpbGUocmVxdWlyZS5yZXNvbHZlKCcuL2RlbW8uY29tcG9uZW50LmpzeCcpKX1cbn0+XG48L3ByZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvbWFpbj5cbiAgICAgICAgPGZvb3Rlcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGVtby1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGxpbmtzKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSBsaW5rc1trZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2tleX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXt1cmx9PntrZXl9PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9vdGVyPlxuICAgICAgICA8c2NyaXB0IHNyYz1cIi4vZGVtby5qc1wiPjwvc2NyaXB0PlxuICAgICAgICA8L2JvZHk+XG4gICAgPC9BcEh0bWw+XG4pO1xuIl19