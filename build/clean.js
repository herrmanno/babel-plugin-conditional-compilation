#!/usr/bin/env node

var path = require('path');
var rmdir = require('rimraf');

var lib = path.resolve(process.cwd(), process.argv[2]);

rmdir(lib, function(err) {
    if(err) {
        console.error(err);
        process.exit(1);
    }
    else {
        process.exit(0);
    }
});