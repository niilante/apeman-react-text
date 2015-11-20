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

module.exports = (
    <ApHtml className="react-demo">
        <ApHead charset="UTF-8"
                title={pkg.name + ' Demo'}
                icon={FAVICON_URL}>
            <ApStyle data={fs.readFileSync(stylesheets.reactDemo).toString()}></ApStyle>
            <ApTextStyle></ApTextStyle>
        </ApHead>
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
                <ApLinks links={links}></ApLinks>
            </div>
        </footer>
        <script src="./demo.js"></script>
        </body>
    </ApHtml>
);
