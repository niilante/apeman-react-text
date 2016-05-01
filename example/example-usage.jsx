'use strict'

import React from 'react'
import {ApText, ApTextStyle} from 'apeman-react-text'

const ExampleComponent = React.createClass({
  render() {
    return (
      <div>
        <ApTextStyle />
        <ApText name="username"
                value="AIUEO"
                onChange={ (e) => console.log(e.target.value) }
        />
      </div>
    )
  }
})
