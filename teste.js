'use strict;';

var exec = require('child_process').exec;


const commands = ['npm install', 'touch teste.txt'];

function runCommand(cmds, cb) {
  const next = cmds.shift();
  if (!next) return cb();
  exec(
    next,
    {
      cwd: __dirname
    },
    (err, stdout, stderr) => {
      console.log(stdout);
      if (err && !next.match(/\-s$/)) {
        console.log(`O commando "${next}" falhou.`, err);
        cb(err);
      } else runCommand(cmds, cb);
    }
  );
}

runCommand(commands, err => {
  console.log('Script corrido');
});
