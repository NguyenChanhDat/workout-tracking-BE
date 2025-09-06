const { exec } = require('node:child_process');

exec('npm run dev');
// Double quotes are used so that the space in the path is not interpreted as
// a delimiter of multiple arguments.

exec('npm run api-test');