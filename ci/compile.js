#!/usr/bin/env node

/**
 * Compile files.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const { runTasks } = require('ape-tasking')
const fs = require('fs')
const apeCompiling = require('ape-compiling')
const filelink = require('filelink')
const co = require('co')
const coz = require('coz')

runTasks('compile', [
  () => {
    let libDir = `${__dirname}/../lib`
    return apeCompiling.compileReactJsx('*.jsx', {
      cwd: libDir,
      out: libDir,
      map: 'inline'
    })
  },
  () => {
    let demoDir = `${__dirname}/../doc/demo`
    return co(function * () {
      if (!fs.existsSync(demoDir)) {
        return
      }
      yield apeCompiling.compileReactJsx('*.jsx', {
        cwd: demoDir,
        out: demoDir,
        map: 'inline',
        minified: true
      })
      yield coz.render(demoDir + '/.*.bud')
      yield apeCompiling.browserifyJs(
        `${demoDir}/demo.entrypoint.js`,
        `${demoDir}/demo.js`,
        {
          debug: true,
          external: require('apeman-asset-javascripts/src/demo.external.json')
        })
      yield filelink(
        require.resolve('apeman-asset-javascripts/dist/demo.external.cc.js'),
        demoDir + '/demo.external.cc.js',
        {
          force: true,
          mkdirp: true
        }
      )
    })
  }
], true)
