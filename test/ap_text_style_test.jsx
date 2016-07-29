/**
 * Test case for ap-text-style.
 * Runs with mocha.
 */
'use strict'

import ApTextStyle from '../lib/ap_text_style'
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'

describe('ap-text-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = shallow(
      <ApTextStyle/>
    )
    assert.ok(element)
  })
})

/* global describe, before, after, it */
