#!/usr/bin/env node

const fs = require('fs');
const yargs = require('yargs');

const steps = require('./steps');

let yarn = false;

const argv = yargs
  .option('css', {
    alias: 'c',
    description: 'Include stylelintrc',
    type: 'boolean',
  })
  .option('jest', {
    alias: 'j',
    description: 'Include configuraton for jest',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h').argv;

try {
  if (fs.existsSync('yarn.lock')) {
    yarn = true;
  }
} catch (err) {
  console.log('Unable to check for yarn.lock');
}

const settings = {
  ...argv,
  yarn,
};

for (const step of steps) {
  step(settings);
}
