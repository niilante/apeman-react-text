import React from 'react';
import {ApText, ApTextStyle} from 'apeman-react-text';

var style = <ApTextStyle></ApTextStyle>,
    element = <ApText name="username"
                      value="AIUEO"
        ></ApText>;

var html = (
    <html>
    <head>{style}</head>
    <body>{element}</body>
    </html>
);
