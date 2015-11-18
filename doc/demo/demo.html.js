"use strict";

const React = require('react'),
      pkg = require('../../package.json'),
      links = require('../links.json'),
      fs = require('fs'),
      apeHighlighting = require('ape-highlighting'),
      highlightJsx = apeHighlighting.highlightJsx,
      style = require('apeman-react-style'),
      stylesheets = require('apeman-asset-stylesheets'),
      html = require('apeman-react-html');

const Demo = require('./demo.component.js'),
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
                    Object.keys(links).map(key => {
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
//# sourceMappingURL=data:application/json;base64,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Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9va3VuaXNoaXRha2EvcHJvamVjdHMvYXBlbWFuLXJlYWN0LWxhYm8vYXBlbWFuLXJlYWN0LXRleHQvZG9jL2RlbW8iLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIHBrZyA9IHJlcXVpcmUoJy4uLy4uL3BhY2thZ2UuanNvbicpLFxuICAgIGxpbmtzID0gcmVxdWlyZSgnLi4vbGlua3MuanNvbicpLFxuICAgIGZzID0gcmVxdWlyZSgnZnMnKSxcbiAgICBhcGVIaWdobGlnaHRpbmcgPSByZXF1aXJlKCdhcGUtaGlnaGxpZ2h0aW5nJyksXG4gICAgaGlnaGxpZ2h0SnN4ID0gYXBlSGlnaGxpZ2h0aW5nLmhpZ2hsaWdodEpzeCxcbiAgICBzdHlsZSA9IHJlcXVpcmUoJ2FwZW1hbi1yZWFjdC1zdHlsZScpLFxuICAgIHN0eWxlc2hlZXRzID0gcmVxdWlyZSgnYXBlbWFuLWFzc2V0LXN0eWxlc2hlZXRzJyksXG4gICAgaHRtbCA9IHJlcXVpcmUoJ2FwZW1hbi1yZWFjdC1odG1sJyk7XG5cbmNvbnN0IERlbW8gPSByZXF1aXJlKCcuL2RlbW8uY29tcG9uZW50LmpzJyksXG4gICAgQXBUZXh0U3R5bGUgPSByZXF1aXJlKCcuLi8uLi9saWIvYXBfdGV4dF9zdHlsZScpLFxuICAgIEFwU3R5bGUgPSBzdHlsZS5BcFN0eWxlLFxuICAgIEFwSHRtbCA9IGh0bWwuQXBIdG1sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgICA8QXBIdG1sIGNsYXNzTmFtZT1cInJlYWN0LWRlbW9cIj5cbiAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICA8bWV0YSBjaGFyU2V0PVwiVVRGLThcIi8+XG4gICAgICAgICAgICA8dGl0bGUgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWw6cGtnLm5hbWUgKyAnIERlbW8nfX0+PC90aXRsZT5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cImljb25cIlxuICAgICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9mdXItcmVwby9mdXItZXhhbXBsZXMvbWFzdGVyL2V4YW1wbGUvMTUtYXBlbWFuLXJlYWN0LWNvbnRyaWIvZmF2aWNvbi5wbmdcIi8+XG4gICAgICAgICAgICA8QXBTdHlsZSBkYXRhPXtmcy5yZWFkRmlsZVN5bmMoc3R5bGVzaGVldHMucmVhY3REZW1vKS50b1N0cmluZygpfT48L0FwU3R5bGU+XG4gICAgICAgICAgICA8QXBUZXh0U3R5bGU+PC9BcFRleHRTdHlsZT5cbiAgICAgICAgPC9oZWFkPlxuICAgICAgICA8Ym9keT5cbiAgICAgICAgPGRpdiBpZD1cImRlbW8tc3R5bGVcIj48L2Rpdj5cbiAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJyZWFjdC1kZW1vLWhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kZW1vLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxoMT5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17cGtnLmhvbWVwYWdlfT57cGtnLm5hbWV9PC9hPlxuICAgICAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgIDxtYWluPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRlbW8tcGxheWdyb3VuZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRlbW8tY29udGFpbmVyXCIgaWQ9XCJkZW1vLXdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxEZW1vPjwvRGVtbz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGVtby1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuPHByZSBjbGFzc05hbWU9XCJyZWFjdC1kZW1vLXNyY1wiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtcbntfX2h0bWw6aGlnaGxpZ2h0SnN4LmZyb21GaWxlKHJlcXVpcmUucmVzb2x2ZSgnLi9kZW1vLmNvbXBvbmVudC5qc3gnKSl9XG59PlxuPC9wcmU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L21haW4+XG4gICAgICAgIDxmb290ZXI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRlbW8tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhsaW5rcykubWFwKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gbGlua3Nba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkga2V5PXtrZXl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17dXJsfT57a2V5fTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgPHNjcmlwdCBzcmM9XCIuL2RlbW8uanNcIj48L3NjcmlwdD5cbiAgICAgICAgPC9ib2R5PlxuICAgIDwvQXBIdG1sPlxuKTtcbiJdfQ==