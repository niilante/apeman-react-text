#!/usr/bin/env node

/**
 * Watch files.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const awatch = require('awatch')
const { fork } = require('child_process')

let build = fork('ci/build.js')

awatch([
  'doc/demo/*.jsx',
  'lib/**/*.jsx'
], (ev, filename) => {
  build.send({ rerun: { ev, filename } })
}, {
  interval: 1000
})
