#!/usr/bin/env node

/**
 * Deploy docs.
 */

"use strict";

process.chdir(__dirname + '/..');

var apeTasking = require('ape-tasking'),
    apeDeploying = require('ape-deploying');

apeTasking.runTasks('deploy', [
    function deployGhPages(callback) {
        apeDeploying.deployGhPages("doc", callback);
    }
], true);

