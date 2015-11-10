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
    fs = require('fs'),
    coz = require('coz');

apeTasking.runTasks('compile', [
    function renderJsX(callback) {
        var libDir = __dirname + '/../lib';
        apeCompiling.compileReactJsx('*.jsx', {
            cwd: libDir + '/jsx',
            out: libDir,
            map: 'inline'
        }, callback);
    },
    function renderDemo(callback) {
        var demoDir = __dirname + '/../doc/demo';
        async.series([
            function (callback) {
                apeCompiling.compileReactJsx('*.jsx', {
                    cwd: demoDir,
                    out: demoDir,
                    map: 'inline'
                }, callback);
            },
            function (callback) {
                coz.render(demoDir + '/.*.bud', callback);
            },
            function (callback) {
                apeCompiling.browserifyJs(
                    demoDir + '/demo.node.js',
                    demoDir + '/demo.js',
                    {},
                    callback);
            }
        ], callback);
    }
], true);
