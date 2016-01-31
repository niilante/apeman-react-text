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
        rows: types.number
    },

    getInitialState() {
        return {}
    },

    getDefaultProps() {
        return {
            name: '',
            value: null,
            placeholder: '',
            rows: 1
        }
    },

    render: function () {
        let s = this;
        let {props} = s,
            hasVal = !!props.value;

        let multiline = props.rows > 1;
        return (
            <span className={classnames('ap-text-wrap', {
                'ap-text-wrap-empty': !hasVal
            })}>
                {
                    multiline ? s._renderTextArea() : s._renderTextInput()
                }
            </span>
        );
    },

    _renderTextArea(){
        let s = this,
            {props} = s;
        return (
            <textarea className="ap-text ap-text-multiple"
                      value={props.value || null}
                {...props}>
                </textarea>
        );
    },
    _renderTextInput(){
        let s = this,
            {props} = s;
        return (
            <input className="ap-text"
                   value={props.value || null}
                   type="text" {...props} />
        );
    }

});

module.exports = ApText;

