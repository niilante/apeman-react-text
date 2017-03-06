/**
 * apeman react package text component.
 * @class ApText
 */

'use strict'

import React, { Component, PropTypes as types } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

/** @lends ApText */
class ApText extends Component {
  // --------------------
  // Specs
  // --------------------
  constructor (props) {
    super(props)
    const s = this
    s.state = {
      suggesting: false,
      candidates: null,
      selectedCandidate: null
    }
    let methodsToBind = [
      'handleFocus',
      'handleKeyUp',
      'handleChange',
      'handleBlur',
      'handleKeyDown',
      'handleCandidate'
    ]
    for (let name of methodsToBind) {
      s[ name ] = s[ name ].bind(s)
    }
  }

  render () {
    const s = this
    let { state, props } = s
    let {
      id,
      name,
      placeholder,
      autoComplete,
      autoFocus,
      className,
      value,
      rows
    } = props
    let hasVal = !!value

    let multiline = rows && (rows > 1)

    let {
      candidates,
      selectedCandidate,
      suggesting
    } = state

    let textHandlers = {
      onFocus: s.handleFocus,
      onKeyUp: s.handleKeyUp,
      onChange: s.handleChange,
      onBlur: s.handleBlur,
      onKeyDown: s.handleKeyDown
    }
    let candidateHandlers = {
      onClick: s.handleCandidate
    }

    return (
      <span className={ classnames('ap-text-wrap', { 'ap-text-wrap-empty': !hasVal }) }>
        <ApText.Text { ...{ id, name, value, placeholder, className, autoFocus, autoComplete, multiline, rows } }
                     handlers={ textHandlers }
        />
        <ApText.CandidateList { ...{ suggesting, candidates, selectedCandidate, multiline } }
                              handlers={ candidateHandlers }
        />
      </span>
    )
  }

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
  }

  handleFocus (e) {
    const s = this
    let { props } = s
    s.setState({ suggesting: true })
    s.updateCandidates()
    if (props.onFocus) {
      props.onFocus(e)
    }
  }

  handleChange (e) {
    const s = this
    let { props } = s
    s.setState({ suggesting: true })
    if (props.onChange) {
      props.onChange(e)
    }
  }

  handleBlur (e) {
    const s = this
    let { props } = s
    if (props.onBlur) {
      props.onBlur(e)
    }
  }

  handleKeyUp (e) {
    const s = this
    let { props } = s
    s.updateCandidates()
    if (props.onKeyUp) {
      props.onKeyUp(e)
    }
  }

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
        if (props.onEnter) {
          props.onEnter()
        }
        break
      default:
        s.setState({ suggesting: true })
        break
    }
    if (props.onKeyDown) {
      props.onKeyDown(e)
    }
  }

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
  }

  updateCandidates () {
    const s = this
    let { props } = s
    let { value } = props
    let candidates = (props.candidates || [])
      .filter((candidate) => !!candidate)
      .map((candidate) => String(candidate).trim())
      .filter((candidate) => !value || candidate.match(value))

    let hit = (candidates.length === 1) && (candidates[ 0 ] === value)
    if (hit) {
      candidates = null
    }
    s.setState({ candidates })
  }

  enterCandidate () {
    const s = this
    let { props } = s
    let { candidates, selectedCandidate } = s.state
    let valid = candidates && !!~candidates.indexOf(selectedCandidate)
    if (valid) {
      let target = { value: selectedCandidate }
      if (props.onChange) {
        props.onChange({ target })
      }
      s.setState({ suggesting: false })
    }
  }

  // --------------------
  // Static methods
  // --------------------
  static Text ({
    id,
    name,
    value,
    placeholder,
    autoComplete,
    className,
    autoFocus,
    multiline,
    handlers,
    rows
  }) {
    if (multiline) {
      return (
        <textarea autoFocus={ autoFocus }
                  id={ id }
                  name={ name }
                  rows={ rows }
                  placeholder={ placeholder }
                  className={ classnames('ap-text ap-text-multiple', className) }
                  value={ value }
                  { ...handlers }
                  onFocus={ null }
        >
      </textarea>
      )
    } else {
      return (
        <input autoFocus={ autoFocus }
               id={ id }
               name={ name }
               placeholder={ placeholder }
               className={ classnames('ap-text', className)}
               value={ value }
               autoComplete={ autoComplete }
               { ...handlers }
               type='text'
        />
      )
    }
  }

  static CandidateList ({ suggesting, candidates, selectedCandidate, multiline, handlers }) {
    if (!suggesting) {
      return null
    }

    if (!candidates) {
      return null
    }

    if (!candidates.length) {
      return null
    }

    if (multiline) {
      console.warn('[ApText] Can not use candidates with multiline input.')
      return null
    }

    return (
      <ul className='ap-text-candidate-list'>
        {
          candidates.map((candidate) =>
            <li key={ candidate }
                className={ classnames('ap-text-candidate-list-item', {
                  'ap-text-candidate-list-item-selected': candidate === selectedCandidate
                }) }>
              <a { ...handlers }
                 data-value={ candidate }>{ candidate }</a>
            </li>
          )
        }
      </ul>
    )
  }
}

Object.assign(ApText, {
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
    candidates: types.arrayOf(types.string),
    /** Callback for entry key press */
    onEnter: types.func
  },

  defaultProps: {
    name: '',
    value: '',
    placeholder: '',
    rows: 1,
    candidates: null
  }

})

export default ApText
