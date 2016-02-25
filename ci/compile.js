#!/usr/bin/env node

/**
 * Compile files.
 */

"use strict";

process.chdir(__dirname + '/..');

const apeTasking = require('ape-tasking'),
    async = require('async'),
    path = require('path'),
    expandglob = require('expandglob'),
    apeCompiling = require('ape-compiling'),
    fs = require('fs'),
    coz = require('coz');

apeTasking.runTasks('compile', [
    (callback) => {
        let libDir = __dirname + '/../lib';
        apeCompiling.compileReactJsx('*.jsx', {
            cwd: libDir,
            out: libDir,
            map: 'inline'
        }, callback);
    },
    (callback) => {
        let demoDir = __dirname + '/../doc/demo';
        async.series([
            (callback) => {
                apeCompiling.compileReactJsx('*.jsx', {
                    cwd: demoDir,
                    out: demoDir,
                    map: 'inline',
                    minified: true
                }, callback);
            },
            (callback) => {
                coz.render(demoDir + '/.*.bud', callback);
            },
            (callback) => {
                apeCompiling.browserifyJs(
                    demoDir + '/demo.node.js',
                    demoDir + '/demo.js',
                    {debug: true},
                    callback);
            }
        ], callback);
    }
], true);
