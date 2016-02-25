/**
 * apeman react package text component.
 * @constructor ApText
 */

"use strict";

import React, {PropTypes as types} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

/** @lends ApText */
const ApText = React.createClass({


    //--------------------
    // Specs
    //--------------------

    propTypes: {
        name: types.string,
        value: types.string,
        placeholder: types.string,
        rows: types.number,
        candidates: types.arrayOf(types.string)
    },

    getInitialState() {
        return {
            suggesting: false,
            candidates: null,
            selectedCandidate: null
        }
    },

    getDefaultProps() {
        return {
            name: '',
            value: null,
            placeholder: '',
            rows: 1,
            candidates: null
        }
    },

    render() {
        let s = this;
        let {state, props} = s,
            value = props.value || null,
            hasVal = !!value;

        let multiline = props.rows > 1;
        return (
            <span className={classnames('ap-text-wrap', {
                'ap-text-wrap-empty': !hasVal
            })}>
                {
                    multiline ? s._renderTextArea(value) : s._renderTextInput(value)
                }
                {
                    state.suggesting ? s._renderCandidateList(state.candidates, state.selectedCandidate, multiline) : null
                }
            </span>
        );
    },

    //--------------------
    // Custom
    //--------------------

    handleCandidate(e){
        let s = this,
            {props} = s;
        e.target.value = e.target.value || e.target.dataset.value;
        s.setState({suggesting: false});
        if (props.onChange) {
            props.onChange(e);
        }
    },

    handleFocus(e){
        let s = this,
            {props} = s;
        s.setState({suggesting: true});
        s.updateCandidates();
        if (props.onFocus) {
            props.onFocus(e);
        }
    },

    handleChange(e){
        let s = this,
            {props} = s;
        s.setState({suggesting: true});
        if (props.onChange) {
            props.onChange(e);
        }
    },


    handleBlur(e){
        let s = this,
            {props} = s;
        if (props.onBlur) {
            props.onBlur(e);
        }
    },

    handleKeyUp(e){
        let s = this,
            {props} = s;
        s.updateCandidates();
        if (props.onKeyUp) {
            props.onKeyUp(e);
        }
    },

    handleKeyDown(e){
        let s = this,
            {props} = s;
        switch (e.keyCode) {
            case 38: // UP
                s.moveCandidateIndex(-1);
                break;
            case 40: // DOWN
                s.moveCandidateIndex(+1);
                break;
            case 13: // Enter
                s.enterCandidate();
                break;
            default:
                s.setState({suggesting: true});
                break;
        }
        if (props.onKeyDown) {
            props.onKeyDown(e);
        }
    },

    moveCandidateIndex(amount){
        let s = this,
            {candidates, selectedCandidate} = s.state;
        if (!candidates) {
            return;
        }
        let index = candidates.indexOf(selectedCandidate) + amount;
        let over = (index === -1) || (index === candidates.length);
        if (over) {
            return;
        }
        s.setState({
            selectedCandidate: candidates[index] || null
        });
    },

    updateCandidates(){
        let s = this,
            {props} = s;
        let value = props.value,
            candidates = (props.candidates || [])
                .filter(candidate => !!candidate)
                .map(candidate => String(candidate).trim())
                .filter(candidate => !value || candidate.match(value));

        let hit = (candidates.length == 1) && (candidates[0] === value);
        if (hit) {
            candidates = null;
        }
        s.setState({candidates});
    },

    enterCandidate(){
        let s = this,
            {props} = s,
            {candidates, selectedCandidate} = s.state;
        let valid = candidates && !!~candidates.indexOf(selectedCandidate);
        if (valid) {
            let target = ReactDOM.findDOMNode(s.refs[`candidate-${selectedCandidate}`]);
            target.value = selectedCandidate;
            if (props.onChange) {
                props.onChange({target});
            }
            s.setState({suggesting: false});
        }
    },

    //--------------------
    // Private
    //--------------------
    _renderTextArea(value){
        let s = this,
            {props} = s;
        return (
            <textarea className={classnames('ap-text ap-text-multiple', props.className)}
                      value={value}
                      onFocus=""
                {...props}>
                </textarea>
        );
    },
    _renderTextInput(value){
        let s = this,
            {props} = s;
        return (
            <input className={classnames('ap-text', props.className)}
                   value={value}
                   onFocus={s.handleFocus}
                   onKeyUp={s.handleKeyUp}
                   onChange={s.handleChange}
                   onBlur={s.handleBlur}
                   onKeyDown={s.handleKeyDown}
                   type="text"
                {...props} />
        );
    },
    _renderCandidateList(candidates, selectedCandidate, multiline){
        let s = this,
            {props} = s;
        if (multiline) {
            console.warn('[ApText] Can not use candidates with multiline input.');
            return null;
        }

        if (!candidates) {
            return null;
        }

        if (!candidates.length) {
            return null;
        }
        return (
            <ul className="ap-text-candidate-list">
                {
                    candidates.map(candidate =>
                        <li key={candidate} className={classnames("ap-text-candidate-list-item", {
                        'ap-text-candidate-list-item-selected': candidate === selectedCandidate
                        })}>
                            <a onClick={s.handleCandidate}
                               ref={`candidate-${candidate}`}
                               data-value={candidate}>{candidate}</a>
                        </li>
                    )
                }
            </ul>
        )
    }

});

module.exports = ApText;

