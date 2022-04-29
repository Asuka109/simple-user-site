const { exec } = require('child_process');

exec('yarn dev', { cwd: './backend' }).stdout?.pipe(process.stdout);
exec('yarn dev', { cwd: './frontend' }).stdout?.pipe(process.stdout);