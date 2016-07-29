#!/usr/bin/env node

/**
 * Build the project.
 */

'use strict'
require('ababel-react/register')()

process.chdir(`${__dirname}/..`)

const { runTasks } = require('ape-tasking')
const ababelReact = require('ababel-react')
const ababelReactTransform = require('ababel-react/transform')
const abrowserify = require('abrowserify')
const fs = require('fs')
const co = require('co')
const coz = require('coz')

let isForked = process.send

runTasks('build', [
  () => coz.render([
    '.*.bud',
    'lib/.*.bud',
    'test/.*.bud'
  ]),
  () => {
    let libDir = `${__dirname}/../lib`
    let shimDir = `${__dirname}/../shim/node`
    return ababelReact('**/+(*.jsx|*.js)', {
      cwd: libDir,
      out: shimDir
    })
  },
  () => coz.render([
    '.*.bud',
    'lib/.*.bud',
    'test/.*.bud'
  ]),
  () => {
    let demoDir = `${__dirname}/../doc/demo`
    return co(function * () {
      if (!fs.existsSync(demoDir)) {
        return
      }
      yield coz.render(demoDir + '/.*.bud')
      yield abrowserify(
        `${demoDir}/demo.entrypoint.jsx`,
        `${demoDir}/demo.js`,
        {
          debug: true,
          extensions: [ '.jsx' ],
          transforms: [
            ababelReactTransform()
          ]
        })
    })
  }
], !isForked)

process.on('message', (message) => {
  if (message.rerun) {
    runTasks.rerun()
  }
})
