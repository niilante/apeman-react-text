/**
 * Test case for ap-text.
 * Runs with mocha.
 */
'use strict'

import ApText from '../lib/ap_text'
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'

describe('ap-text', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = shallow(
      <ApText/>
    )
    assert.ok(element)
  })
})

/* global describe, before, after, it */
