"use strict";

import React from 'react';
import pkg from '../../package.json';
import links from '../links.json';
import fs from 'fs';
import {highlightJsx} from 'ape-highlighting';
import stylesheets from 'apeman-asset-stylesheets';

import Demo from './demo.component.js';
import ApTextStyle from '../../lib/ap_text_style';
import {ApStyle, ApHead, ApBody, ApLinks, ApHtml, ApFaIconStyle, ApIonIconStyle } from 'apeman-react-basic';

const FAVICON_URL = "https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/favicon/react-favicon.png";

module.exports = (
    <ApHtml className="react-demo">
        <ApHead charset="UTF-8"
                title={pkg.name + ' Demo'}
                icon={FAVICON_URL}>
            <ApStyle data={fs.readFileSync(stylesheets.reactDemo).toString()}></ApStyle>
            <ApTextStyle highlightColor="#b35600"></ApTextStyle>
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
