#!/usr/bin/env node

/**
 * Run tests.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const { runTasks } = require('ape-tasking')
const amocha = require('amocha')

require('../test/_setup')

runTasks('test', [
  () => amocha('test/*_test.jsx', {})
], true)
