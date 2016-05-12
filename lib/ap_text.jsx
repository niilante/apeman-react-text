/**
 * apeman react package text component.
 * @class ApText
 */

'use strict'

import React, {PropTypes as types} from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

/** @lends ApText */
const ApText = React.createClass({

  // --------------------
  // Specs
  // --------------------

  propTypes: {
    /** Name of text input */
    name: types.string,
    /** Value of text input */
    value: types.string,
    /** Placeholder text */
    placeholder: types.string,
    /** Number of rows */
    rows: types.number,
    /** Selectable candidate text */
    candidates: types.arrayOf(types.string)
  },

  getInitialState () {
    return {
      suggesting: false,
      candidates: null,
      selectedCandidate: null
    }
  },

  getDefaultProps () {
    return {
      name: '',
      value: '',
      placeholder: '',
      rows: 1,
      candidates: null
    }
  },

  render () {
    const s = this
    let { state, props } = s
    let { value } = props
    let hasVal = !!value

    let multiline = props.rows > 1
    return (
      <span className={ classnames('ap-text-wrap', { 'ap-text-wrap-empty': !hasVal }) }>
        {
          multiline ? s._renderTextArea(value) : s._renderTextInput(value)
        }
        {
          state.suggesting ? s._renderCandidateList(state.candidates, state.selectedCandidate, multiline) : null
        }
            </span>
    )
  },

  // --------------------
  // Custom
  // --------------------

  handleCandidate (e) {
    const s = this
    let { props } = s
    e.target.value = e.target.value || e.target.dataset.value
    s.setState({ suggesting: false })
    if (props.onChange) {
      props.onChange(e)
    }
  },

  handleFocus (e) {
    const s = this
    let { props } = s
    s.setState({ suggesting: true })
    s.updateCandidates()
    if (props.onFocus) {
      props.onFocus(e)
    }
  },

  handleChange (e) {
    const s = this
    let { props } = s
    s.setState({ suggesting: true })
    if (props.onChange) {
      props.onChange(e)
    }
  },

  handleBlur (e) {
    const s = this
    let { props } = s
    if (props.onBlur) {
      props.onBlur(e)
    }
  },

  handleKeyUp (e) {
    const s = this
    let { props } = s
    s.updateCandidates()
    if (props.onKeyUp) {
      props.onKeyUp(e)
    }
  },

  handleKeyDown (e) {
    const s = this
    let { props } = s
    switch (e.keyCode) {
      case 38: // UP
        s.moveCandidateIndex(-1)
        break
      case 40: // DOWN
        s.moveCandidateIndex(+1)
        break
      case 13: // Enter
        s.enterCandidate()
        break
      default:
        s.setState({ suggesting: true })
        break
    }
    if (props.onKeyDown) {
      props.onKeyDown(e)
    }
  },

  moveCandidateIndex (amount) {
    const s = this
    let { candidates, selectedCandidate } = s.state
    if (!candidates) {
      return
    }
    let index = candidates.indexOf(selectedCandidate) + amount
    let over = (index === -1) || (index === candidates.length)
    if (over) {
      return
    }
    s.setState({
      selectedCandidate: candidates[ index ] || null
    })
  },

  updateCandidates () {
    const s = this
    let { props } = s
    let value = props.value
    let candidates = (props.candidates || [])
      .filter((candidate) => !!candidate)
      .map((candidate) => String(candidate).trim())
      .filter((candidate) => !value || candidate.match(value))

    let hit = (candidates.length === 1) && (candidates[ 0 ] === value)
    if (hit) {
      candidates = null
    }
    s.setState({ candidates })
  },

  enterCandidate () {
    const s = this
    let { props } = s
    let { candidates, selectedCandidate } = s.state
    let valid = candidates && !!~candidates.indexOf(selectedCandidate)
    if (valid) {
      let target = ReactDOM.findDOMNode(s.refs[ `candidate-${selectedCandidate}` ])
      target.value = selectedCandidate
      if (props.onChange) {
        props.onChange({ target })
      }
      s.setState({ suggesting: false })
    }
  },

  // --------------------
  // Private
  // --------------------
  _renderTextArea (value) {
    const s = this
    let { props } = s
    return (
      <textarea { ...props }
        className={ classnames('ap-text ap-text-multiple', props.className) }
        value={ value }
        onFocus=""
      >
                </textarea>
    )
  },
  _renderTextInput (value) {
    const s = this
    let { props } = s
    return (
      <input { ...props }
        className={ classnames('ap-text', props.className)}
        value={ value }
        onFocus={ s.handleFocus }
        onKeyUp={ s.handleKeyUp }
        onChange={ s.handleChange }
        onBlur={ s.handleBlur }
        onKeyDown={ s.handleKeyDown }
        type="text"
      />
    )
  },
  _renderCandidateList (candidates, selectedCandidate, multiline) {
    const s = this
    let { props } = s
    if (multiline) {
      console.warn('[ApText] Can not use candidates with multiline input.')
      return null
    }

    if (!candidates) {
      return null
    }

    if (!candidates.length) {
      return null
    }
    return (
      <ul className="ap-text-candidate-list">
        {
          candidates.map((candidate) =>
            <li key={ candidate }
                className={ classnames('ap-text-candidate-list-item', {
                  'ap-text-candidate-list-item-selected': candidate === selectedCandidate
                }) }>
              <a onClick={s.handleCandidate}
                 ref={`candidate-${candidate}`}
                 data-value={ candidate }>{ candidate }</a>
            </li>
          )
        }
      </ul>
    )
  }
})

export default ApText
