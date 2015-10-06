#!/usr/bin/env node

/**
 * Watch files.
 */

"use strict";

process.chdir(__dirname + '/..');

var apeWatching = require('ape-watching'),
    childProcess = require('child_process');

var timer = null;
apeWatching.watchFiles([
    'lib/**/*.jsx'
], function (ev, filename) {
    clearTimeout(timer);
    timer = setTimeout(function () {
        childProcess.fork('ci/compile.js');
    }, 300);
});