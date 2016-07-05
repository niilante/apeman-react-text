#!/usr/bin/env node

'use strict'

process.chdir(`${__dirname}/..`)

const { runTasks } = require('ape-tasking')
const { takeCapture } = require('ape-capturing')

runTasks('capture', [
  () => takeCapture(
    `${__dirname}/../doc/demo/demo.html`,
    `${__dirname}/../doc/images/screenshot.png`,
    {
      selector: '.screenshot-target',
      width: 640,
      height: 320
    }
  )
])
