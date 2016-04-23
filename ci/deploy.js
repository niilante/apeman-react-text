#!/usr/bin/env node

/**
 * Deploy docs.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const apeTasking = require('ape-tasking')
const apeDeploying = require('ape-deploying')

apeTasking.runTasks('deploy', [
  (callback) => {
    apeDeploying.deployGhPages("doc", callback)
  }
], true)

