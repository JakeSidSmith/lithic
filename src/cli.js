#! /usr/bin/env node

'use strict';

(function () {

  var yargs = require('yargs');
  var packageJson = require('../package.json');
  var lithic = require('./index');
  var utils = require('./utils');

  var error = utils.error;
  var version = packageJson.version;

  var configOption = {
    config: {
      group: 'Sub command options:',
      alias : 'c',
      required: false,
      type: 'string',
      describe: 'Path to config file'
    }
  };

  var argv = yargs
  .require(1, 1)
  .strict()
  .usage('Usage: $0 <command> [options]')
  .example('$0 init', '(Create a new lithic site)')
  .command('init', 'Create a new lithic site')
  .command('build', 'Build your site', configOption)
  .command('watch', 'Watch files for changes & build your site', configOption)
  .help('help')
  .alias('help', 'h')
  .version('version', 'Return the version number', version)
  .alias('version', 'v')
  .argv;

  var command = argv._[0];

  if (typeof lithic[command] !== 'function') {
    error('Unknown command: ' + command);
  } else {
    lithic[command](argv);
  }

})();
