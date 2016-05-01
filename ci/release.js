#!/usr/bin/env node

/**
 * Release this package.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const apeTasking = require('ape-tasking')
const apeReleasing = require('ape-releasing')

apeTasking.runTasks('release', [
  () => apeReleasing.releasePackage({
    beforeRelease: [
      './ci/compile.js',
      './ci/build.js',
      './ci/test.js',
      './ci/deploy.js'
    ]
  })
], true)
