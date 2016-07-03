#!/usr/bin/env node

/**
 * Watch files.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const { watchFiles } = require('ape-watching')
const { fork } = require('child_process')

let timer = null

watchFiles([
  'lib/**/*.jsx'
], (ev, filename) => {
  clearTimeout(timer)
  timer = setTimeout(() => fork('ci/compile.js'), 300)
})
