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
    case 'list':
      stream.write(JSON.stringify({command: 'list'}));
      break;
    case 'start':
    case 'stop':
    case 'remove':
    case 'logs':
    case 'info':
      stream.write(JSON.stringify({command: command, id: args.shift()}));
      break;
    default:
      console.log('Unknown command.');
  }
});



