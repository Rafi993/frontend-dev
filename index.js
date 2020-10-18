const fs = require('fs');
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
  childProcess.execSync(`yarn add ${packages} -D`, {
    stdio: [process.stdin, process.stdout, process.stder],
  });
} else {
  childProcess.execSync(`npm install ${packages} -D`, {
    stdio: [process.stdin, process.stdout, process.stder],
  });
}

// Create .eslintrc.js
fs.writeFileSync(
  '.eslintrc.js',
  `module.exports = {
    extends: ['eslint:recommended', 'prettier'],
    plugins: ['prettier'],
   };`,
);

// Create .stylelintrc.json
fs.writeFileSync(
  '.stylelintrc.json',
  `{
    "extends": "stylelint-config-standard"
   }`,
);

// Creating .huskyrc
fs.writeFileSync(
  '.huskyrc',
  `{
    "hooks":{
       "pre-commit": "lint-staged"
    }
   }`,
);

// Creating .lintstagedrc
fs.writeFileSync(
  '.lintstagedrc',
  `{
        "*.js": [
          "eslint --fix",
          "prettier --write"
        ],
        "*.{css,scss}": [
            "stylelint"
        ]
   }`,
);

// Creating .prettierrc
fs.writeFileSync(
  '.prettierrc',
  `{
    "singleQuote": true,
    "trailingComma": "all",
    "printWidth": 80,
    "tabWidth": 4
   }`,
);
