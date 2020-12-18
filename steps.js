const fs = require('fs');
const childProcess = require('child_process');
const path = require('path');

const lintstagedrc = require('./lintstagedrc.json');

const installPackages = ({ css, react, jest, yarn }) => {
  let packages =
    'eslint prettier eslint-config-prettier eslint-plugin-prettier husky lint-staged';

  if (css) {
    packages = packages + ' stylelint stylelint-config-standard';
  }

  if (react) {
    packages = packages + ' eslint-plugin-react';
  }

  if (jest) {
    packages = packages + ' jest';
  }

  // Install packages
  if (yarn) {
    childProcess.execSync(`yarn add ${packages} -D`, { stdio: 'inherit' });
  } else {
    childProcess.execSync(`npm install ${packages} -D`, { stdio: 'inherit' });
  }
};

const styleLint = ({ css }) => {
  if (css) {
    fs.copyFileSync(
      path.join(__dirname, 'config', '.stylelintrc.json'),
      '.stylelintrc.json',
    );

    lintstagedrc['*.{css,scss}'] = ['stylelint'];
  }
};

const lintStaged = ({ jest }) => {
  if (jest) {
    lintstagedrc['*.js'].push('jest --findRelatedTests');
  }

  fs.writeFileSync('.lintstagedrc', JSON.stringify(lintstagedrc, 2, 2));
};

const eslint = ({ react }) => {
  fs.copyFileSync(
    path.join(__dirname, 'config', '.eslintrc.js'),
    '.eslintrc.js',
  );
};

const copyFiles = () => {
  fs.copyFileSync(path.join(__dirname, 'config', '.huskyrc'), '.huskyrc');
  fs.copyFileSync(path.join(__dirname, 'config', '.prettierrc'), '.prettierrc');
};

const steps = [installPackages, styleLint, lintStaged, eslint];

module.exports = steps;
