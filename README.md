# Frontend-dev

Cli tool to setup developer tooling in your frontend repo

Inspired by https://dev.to/nickytonline/stuff-i-always-set-up-for-frontend-work-56h2

## Usage

Navigate inside your repo and run

```bash
$ npx frontend-dev
```

It detects if you are using npm are yarn and uses appropriate package manager.

### options
* **--jest** or **-j** add jest to pre-commit hook
* **--css** or **-c** add style linting