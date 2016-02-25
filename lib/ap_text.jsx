/**
 * apeman react package text component.
 * @constructor ApText
 */

"use strict";

import React, {PropTypes as types} from 'react';
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
            suggesting: false
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

    render: function () {
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
                    state.suggesting ? s._renderCandidateList(value, multiline) : null
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
                   onChange={s.handleChange}
                   onBlur={s.handleBlur}
                   type="text"
                {...props} />
        );
    },
    _renderCandidateList(value, multiline){
        let s = this,
            {props} = s;
        if (!props.candidates) {
            return null;
        }
        if (multiline) {
            console.warn('[ApText] Can not use candidates with multiline input.');
            return null;
        }

        let candidates = props.candidates
            .filter(candidate => !!candidate)
            .map(candidate => String(candidate).trim())
            .filter(candidate => !value || candidate.match(value));

        if (!candidates.length) {
            return null;
        }
        return (
            <ul className="ap-text-candidate-list">
                {
                    candidates.map(candidate =>
                        <li key={candidate} className="ap-text-candidate-list-item">
                            <a onClick={s.handleCandidate} data-value={candidate}>{candidate}</a>
                        </li>
                    )
                }
            </ul>
        )
    }

});

module.exports = ApText;

