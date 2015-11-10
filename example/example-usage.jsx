var React = require('react');
var apemanReactText = require('apeman-react-text');

var ApText = apemanReactText.ApText,
    ApTextStyle = apemanReactText.ApTextStyle;

var html = (
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
