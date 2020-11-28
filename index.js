#!/usr/bin/env node

/* eslint-env node */

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const yargs = require('yargs');

const lintstagedrc = require('./lintstagedrc.json');

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

let packages =
  'eslint prettier eslint-config-prettier eslint-plugin-prettier husky lint-staged';

if (argv.css) {
  packages = 'stylelint stylelint-config-standard';
}

// Install packages
if (yarn) {
  childProcess.execSync(`yarn add ${packages} -D`, { stdio: 'inherit' });
} else {
  childProcess.execSync(`npm install ${packages} -D`, { stdio: 'inherit' });
}

fs.copyFileSync(path.join(__dirname, '.eslintrc.js'), '.eslintrc.js');
fs.copyFileSync(path.join(__dirname, '.huskyrc'), '.huskyrc');
fs.copyFileSync(path.join(__dirname, '.prettierrc'), '.prettierrc');

if (argv.css) {
  fs.copyFileSync(
    path.join(__dirname, '.stylelintrc.json'),
    '.stylelintrc.json',
  );

  lintstagedrc['*.{css,scss}'] = ['stylelint'];
}

if (argv.jest) {
  lintstagedrc['*.js'].push('jest --findRelatedTests');
}

fs.writeFileSync('.lintstagedrc', JSON.stringify(lintstagedrc, 2, 2));
