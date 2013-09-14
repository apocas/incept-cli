#!/usr/bin/env node

var net = require('net');

var args = process.argv;
args.shift();
args.shift();
var command = args.shift();

var stream = net.connect({port: 80, host: 'localhost'}, function() {
  stream.pipe(process.stdout);

  switch(command) {
    case 'run':
      stream.write(JSON.stringify({command: 'run', language: args.shift(), repository: args.shift()}));
      break;
    case 'test':
      stream.write(JSON.stringify({command: 'run', language: 'php', repository: 'https://github.com/apocas/helloworld-php'}));
      break;
    case 'start':
      stream.write(JSON.stringify({command: 'start', id: args.shift()}));
      break;
    case 'stop':
      stream.write(JSON.stringify({command: 'stop', id: args.shift()}));
      break;
    case 'list':
      stream.write(JSON.stringify({command: 'list'}));
      break;
    case 'logs':
      stream.write(JSON.stringify({command: 'logs', id: args.shift()}));
      break;
    case 'info':
    case 'status':
      stream.write(JSON.stringify({command: 'status', id: args.shift()}));
      break;
  }
});



