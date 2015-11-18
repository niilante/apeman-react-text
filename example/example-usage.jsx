"use strict";

const React = require('react'),
    apemanReactText = require('apeman-react-text');

const ApText = apemanReactText.ApText,
    ApTextStyle = apemanReactText.ApTextStyle;

let html = (
    <html>
    <head>
        <ApTextStyle></ApTextStyle>
    </head>
    <body>
    <ApText name="username"
            value="AIUEO"
            onChange={ (e) => {
                           console.log(e.target.value);
                      }}
    ></ApText>
    </body>
    </html>
);
