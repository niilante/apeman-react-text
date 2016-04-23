#!/usr/bin/env node

/**
 * Share this project.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const apeTasking = require('ape-tasking')
const pkg = require('../package.json')

apeTasking.runTasks('share', [
  (callback) => {
    apeTasking.execcli('hub', [ 'init' ], callback)
  },
  (callback) => {
    apeTasking.execcli('hub', [ 'create', { d: pkg.description }, pkg.repository ], callback)
  },
  (callback) => {
    apeTasking.execcli('travis', [ 'enable', { r: pkg.repository } ], callback)
  }
], true)
