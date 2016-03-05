#!/usr/bin/env node

/**
 * Watch files.
 */

"use strict";

process.chdir(__dirname + '/..');

const apeWatching = require('ape-watching'),
    childProcess = require('child_process');

let timer = null;
apeWatching.watchFiles([
    'lib/**/*.jsx'
], (ev, filename) => {
    clearTimeout(timer);
    timer = setTimeout(function () {
        childProcess.fork('ci/compile.js');
    }, 300);
});