'use strict'

import React from 'react'
import {ApText, ApTextStyle} from 'apeman-react-text'

const html = (
  <html>
  <head>
    <ApTextStyle />
  </head>
  <body>
  <ApText name="username"
          value="AIUEO"
          onChange={ (e) => {
                           console.log(e.target.value)
                      } }
  ></ApText>
  </body>
  </html>
)
