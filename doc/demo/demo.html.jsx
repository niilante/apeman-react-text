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

module.exports = (
    <ApHtml className="react-demo">
        <head>
            <meta charSet="UTF-8"/>
            <title dangerouslySetInnerHTML={{__html:pkg.name + ' Demo'}}></title>
            <link rel="icon"
                  href="https://raw.githubusercontent.com/fur-repo/fur-examples/master/example/15-apeman-react-contrib/favicon.png"/>
            <ApStyle data={fs.readFileSync(stylesheets.reactDemo).toString()}></ApStyle>
            <ApTextStyle></ApTextStyle>
        </head>
        <body>
        <div id="demo-style"></div>
        <header className="react-demo-header">
            <div className="react-demo-container">
                <h1>
                    <a href={pkg.homepage}>{pkg.name}</a>
                </h1>
            </div>
        </header>
        <main>
            <div>
                <div className="react-demo-playground">
                    <div className="react-demo-container" id="demo-wrap">
                        <Demo></Demo>
                    </div>
                </div>
            </div>
            <div className="react-demo-container">
                <div>
<pre className="react-demo-src" dangerouslySetInnerHTML={
{__html:highlightJsx.fromFile(require.resolve('./demo.component.jsx'))}
}>
</pre>
                </div>
            </div>

        </main>
        <footer>
            <div className="react-demo-container">
                <ul>
                    {
                        Object.keys(links).map(function (key) {
                            var url = links[key];
                            return (
                                <li key={key}>
                                    <a href={url}>{key}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </footer>
        <script src="./demo.js"></script>
        </body>
    </ApHtml>
);
