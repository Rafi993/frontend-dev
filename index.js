#!/usr/bin/env node

/* eslint-env node */

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

let yarn = false;

try {
  if (fs.existsSync('yarn.lock')) {
    yarn = true;
  }
} catch (err) {
  console.log('Unable to check for yarn.lock');
}

const packages =
  'eslint prettier eslint-config-prettier eslint-plugin-prettier husky lint-staged stylelint stylelint-config-standard';

// Install packages
if (yarn) {
  childProcess.execSync(`yarn add ${packages} -D`, { stdio: 'inherit' });
} else {
  childProcess.execSync(`npm install ${packages} -D`, { stdio: 'inherit' });
}

fs.copyFileSync(path.join(__dirname, '.eslintrc.js'), '.eslintrc.js');
fs.copyFileSync(path.join(__dirname, '.stylelintrc.json'), '.stylelintrc.json');
fs.copyFileSync(path.join(__dirname, '.huskyrc'), '.huskyrc');
fs.copyFileSync(path.join(__dirname, '.lintstagedrc'), '.lintstagedrc');
fs.copyFileSync(path.join(__dirname, '.prettierrc'), '.prettierrc');
