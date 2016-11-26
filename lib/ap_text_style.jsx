/**
 * Style for ApText.
 * @class ApTextStyle
 */

'use strict'

import React, { Component, PropTypes as types } from 'react'
import { ApStyle } from 'apeman-react-style'
import  { alpha } from 'acolor'

/** @lends ApTextStyle */
class ApTextStyle extends Component {
  render () {
    const s = this
    let { props } = s

    let { all, small, medium, large } = ApTextStyle.styleData(props)

    return (
      <ApStyle data={ Object.assign(all, props.style) }
               smallMediaData={ small }
               mediumMediaData={ medium }
               largeMediaData={ large }
      >{ props.children }</ApStyle>
    )
  }
}

Object.assign(ApTextStyle, {
  propTypes: {
    style: types.object,
    highlightColor: types.string,
    maxWidth: types.number
  },

  defaultProps: {
    style: {},
    maxWidth: ApStyle.CONTENT_WIDTH,
    highlightColor: ApStyle.DEFAULT_HIGHLIGHT_COLOR
  },

  styleData (config) {
    let { highlightColor, maxWidth } = config
    return {
      all: {
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
          padding: '4px',
          margin: 0,
          verticalAlign: 'middle',
          boxSizing: 'border-box',
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
          background: alpha(highlightColor, 0.33)
        },
        '.ap-text-candidate-list-item-selected a:hover': {
          background: alpha(highlightColor, 0.5)
        },
        '.ap-text-candidate-list-item-selected a:active': {
          background: alpha(highlightColor, 0.2)
        }
      }
    }
  }

})
export default ApTextStyle
