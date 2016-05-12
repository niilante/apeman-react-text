/**
 * Style for ApText.
 * @class ApTextStyle
 */

'use strict'

import React, {PropTypes as types} from 'react'
import {ApStyle} from 'apeman-react-style'

/** @lends ApTextStyle */
const ApTextStyle = React.createClass({
  propTypes: {
    type: types.string,
    style: types.object,
    highlightColor: types.string,
    maxWidth: types.number
  },
  getDefaultProps () {
    return {
      type: 'text/css',
      style: {},
      maxWidth: ApStyle.CONTENT_WIDTH,
      highlightColor: ApStyle.DEFAULT_HIGHLIGHT_COLOR
    }
  },
  render () {
    const s = this
    let { props } = s

    let { highlightColor, maxWidth } = props

    let data = {
      '.ap-text': {
        display: 'block',
        padding: '4px 8px',
        border: '1px solid #AAA',
        width: '100%',
        maxWidth: `${maxWidth}px`,
        borderRadius: '2px',
        boxSizing: 'border-box',
        outlineColor: `${highlightColor}`,
        boxShadow: '1px 1px 1px rgba(0,0,0,.05) inset'
      },
      '.ap-text-wrap': {
        position: 'relative',
        width: '100%',
        margin: '4px',
        verticalAlign: 'middle',
        maxWidth: `${maxWidth}px`,
        display: 'block'
      },
      '.ap-text-multiple': {
        overflow: 'auto'
      },
      '.ap-text-candidate-list': {
        position: 'absolute',
        left: 0,
        right: '1px',
        top: '100%',
        zIndex: 4,
        padding: '4px 0',
        margin: '0 1px',
        boxShadow: '1px 1px 2px rgba(0,0,0,0.33)',
        background: 'white',
        boxSizing: 'border-box'
      },
      '.ap-text-candidate-list-item': {
        display: 'block',
        padding: 0,
        margin: 0
      },
      '.ap-text-candidate-list-item a': {
        display: 'block',
        padding: '4px 8px'
      },
      '.ap-text-candidate-list-item a:hover': {
        cursor: 'pointer',
        background: '#FAFAFA'
      },
      '.ap-text-candidate-list-item a:active': {
        background: '#F5F5F5'
      },
      '.ap-text-candidate-list-item-selected a': {
        background: ApStyle.colorAlpha(highlightColor, 0.33)
      },
      '.ap-text-candidate-list-item-selected a:hover': {
        background: ApStyle.colorAlpha(highlightColor, 0.5)
      },
      '.ap-text-candidate-list-item-selected a:active': {
        background: ApStyle.colorAlpha(highlightColor, 0.2)
      }
    }
    let smallMediaData = {}
    let mediumMediaData = {}
    let largeMediaData = {}
    return (
      <ApStyle data={ Object.assign(data, props.style) }
               smallMediaData={ smallMediaData }
               mediumMediaData={ mediumMediaData }
               largeMediaData={ largeMediaData }
      >{ props.children }</ApStyle>
    )
  }
})
export default ApTextStyle
