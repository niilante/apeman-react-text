/**
 * Test case for index.
 * Runs with mocha.
 */
'use strict'

const index = require('../lib/index.js')
const assert = require('assert')

describe('index', () => {
  before(() => {
  })
  after(() => {
  })
  it('Eval props.', () => {
    assert.ok(Object.keys(index).length > 0)
    for (let name of Object.keys(index)) {
      assert.ok(index[ name ], `${name} should exists`)
    }
  })
})

/* global describe, before, after, it */
