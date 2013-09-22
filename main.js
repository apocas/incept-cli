#!/usr/bin/env node

var net = require('net');

var args = process.argv;
args.shift();
args.shift();
var command = args.shift();

var stream = net.connect({port: 8080, host: 'localhost'}, function() {
  stream.pipe(process.stdout);

  switch(command) {
    case 'run':
      stream.write(JSON.stringify({command: 'run', language: args.shift(), repository: args.shift(), domain: args.shift()}));
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
    case 'delete':
    case 'remove':
      stream.write(JSON.stringify({command: 'remove', id: args.shift()}));
      break;
    case 'list':
      stream.write(JSON.stringify({command: 'list'}));
      break;
    case 'logs':
      stream.write(JSON.stringify({command: 'logs', id: args.shift()}));
      break;
    case 'info':
      stream.write(JSON.stringify({command: 'info', id: args.shift()}));
      break;
    default:
      console.log('Unknown command.');
  }
});



