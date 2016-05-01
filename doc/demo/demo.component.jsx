'use strict'

import React from 'react'
import ApText from '../../lib/ap_text'
import ApTextStyle from '../../lib/ap_text_style'

export default React.createClass({
  getInitialState () {
    return {
      value: 'ban'
    }
  },
  handleChange (e) {
    const s = this
    s.setState({
      value: e.target.value
    })
  },
  render () {
    const s = this
    let { state } = s
    return (
      <div>
        <ApTextStyle highlightColor="#b35600"/>
        <ApText onChange={ s.handleChange } value={ state.value }/>
        <ApText onChange={ s.handleChange } value={ state.value } rows={2}/>
        <ApText onChange={ s.handleChange } value={ state.value }
                candidates={ [ 'banana', 'orange', 'apple' ] }/>
      </div>
    )
  }
})
