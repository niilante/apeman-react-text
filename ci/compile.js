#!/usr/bin/env node

/**
 * Compile files.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const apeTasking = require('ape-tasking')
const async = require('async')
const apeCompiling = require('ape-compiling')
const filecopy = require('filecopy')
const coz = require('coz')

apeTasking.runTasks('compile', [
  (callback) => {
    let libDir = `${__dirname}/../lib`
    apeCompiling.compileReactJsx('*.jsx', {
      cwd: libDir,
      out: libDir,
      map: 'inline'
    }, callback)
  },
  (callback) => {
    let demoDir = `${__dirname}/../doc/demo`
    async.series([
      (callback) => {
        apeCompiling.compileReactJsx('*.jsx', {
          cwd: demoDir,
          out: demoDir,
          map: 'inline',
          minified: true
        }, callback)
      },
      (callback) => {
        coz.render(demoDir + '/.*.bud', callback)
      },
      (callback) => {
        apeCompiling.browserifyJs(
          demoDir + '/demo.node.js',
          demoDir + '/demo.js',
          {
            debug: true,
            external: require('apeman-asset-javascripts/src/demo.external.json')
          },
          callback)
      },
      (callback) => {
        filecopy(
          require.resolve('apeman-asset-javascripts/dist/demo.external.cc.js'),
          demoDir + '/demo.external.cc.js',
          callback
        )
      }
    ], callback)
  }
], true)
