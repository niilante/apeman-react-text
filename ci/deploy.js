#!/usr/bin/env node

/**
 * Deploy docs.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const { runTasks } = require('ape-tasking')
const { deployGhPages } = require('ape-deploying')

runTasks('deploy', [
  () => deployGhPages('doc')
], true)

