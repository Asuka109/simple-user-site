const { execSync } = require('child_process');

execSync('yarn', { stdio: 'inherit' })
execSync('yarn', { cwd: './backend', stdio: 'inherit' })
execSync('yarn', { cwd: './frontend', stdio: 'inherit' })