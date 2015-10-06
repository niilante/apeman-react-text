#!/usr/bin/env node

/**
 * Compile files.
 */

"use strict";

process.chdir(__dirname + '/..');

var apeTasking = require('ape-tasking'),
    async = require('async'),
    path = require('path'),
    expandglob = require('expandglob'),
    apeCompiling = require('ape-compiling'),
    coz = require('coz');

apeTasking.runTasks('compile', [
    function renderJsX(callback) {
        async.waterfall([
            function (callback) {
                expandglob('lib/jsx/*.jsx', callback);
            },
            function (filenames, callback) {
                async.each(filenames, function (src, callback) {
                    var dest = path.join('lib', path.basename(src, '.jsx') + '.js');
                    apeCompiling.compileJsx(
                        src, dest, {
                            sourceMaps: 'inline'
                        },
                        callback);
                }, callback);
            }
        ], callback);
    },
    function renderDemo(callback) {
        apeCompiling.browserifyJsx(
            'doc/demo/demo.jsx',
            'doc/demo/demo.js',
            {
                debug: true
            },
            callback
        );
    }
], true);
