'use strict';
const winston = require('winston');
const util = require("util")
const nodeMachineId = require('node-machine-id');
const machineId = nodeMachineId.machineIdSync({ original: true });
const callsite = require('callsite');

function getFormattedArgs(args, settings) {
  let formatted = [util.format.apply(util.format, Array.prototype.slice.call(args))];
  var properties = [];
  if (settings.displayMachineId) {
    properties.push(machineId)
  }
  if (settings.displayFilename) {
    properties.push(getStack())
  }
  if (properties.length) {
    formatted.unshift(`[${properties.join(' ')}]:`)
  }
  return formatted;
}

function getStack() {
  var stack = callsite()[3];
  return [stack.getFileName(), stack.getLineNumber(), stack.getColumnNumber()].join(':')
}
/* 
SUMMARY: winston logger instance with support format of text or json
If you need more customization, see winston logger transport 

IN: 
  {
    format: 'text' (default) | 'json',
    level: 'debug' (default) | 'info' | 'warn' | 'error'
  }

OUT: 
 a winston logger
*/

function getLogger(options) {
  options = options || {}
  let transport = null;
  if (options.format && options.format === 'json') {
    transport = new winston.transports.Console({
      level: 'debug', // LOG LEVEL
      padLevels:true,
      timestamp: () => {
        return Date.now();
      },
      formatter: (options) => {
        // from the high jack timestamp to carry machineId and displayFilename
        options.message = options.message ? options.message : ''        
        return JSON.stringify({
          time: options.timestamp(),
          level: options.level,
          msg: options.message
        });
      }
    })
  } else {
    transport = new winston.transports.Console({
      colorize: true,
      timestamp: true,
      padLevels:true,
      level: 'debug'
    })
  }

  let logger = new (winston.Logger)({
    transports: [transport]
  });
  // Freeze it
  Object.freeze(logger);
  return logger;
}

/* 
  IN:
  {
    format: 'text' (default) | 'json',
    level: 'debug' (default) | 'info' | 'warn' | 'error',
    displayMachineId: false (default) | true,
    displayFilename: false (default) | true,  \\ Note: level 'warn' or above will always true unless defined
  }

  Global to the application which overrides console.log|debug|info|warn|error.
  If don't want global, use getLogger method instead to obtain a bare winston logger.
*/
function init(options) {
  // Global logger already registered, do nothing
  if (global.winston_global_logger) {
    return global.winston_global_logger;
  }
  options = options || {}
  // Auto detection for production, custom property will still override
  var isProduction =
    process.env.NODE_ENV === 'prod' ||
    process.env.NODE_ENV === 'Production' ||
    'AWS_EXECUTION_ENV' in process.env;

  if (!options.level && isProduction) {
    options.level = 'warn';
  }
  if (!options.format && isProduction) {
    options.format = 'json';
  }
  let logger = getLogger(options);

  console.debug = function () {
    let settings = {
      displayMachineId: global.winston_global_logger_options.displayMachineId,
      displayFilename: global.winston_global_logger_options.displayFilename
    }
    logger.debug.apply(logger, getFormattedArgs(arguments, settings));
  };

  console.log = function () {
    let settings = {
      displayMachineId: global.winston_global_logger_options.displayMachineId,
      displayFilename: global.winston_global_logger_options.displayFilename
    }
    logger.info.apply(logger, getFormattedArgs(arguments, settings));
  };

  console.info = function () {
    let settings = {
      displayMachineId: global.winston_global_logger_options.displayMachineId,
      displayFilename: global.winston_global_logger_options.displayFilename
    }
    logger.info.apply(logger, getFormattedArgs(arguments, settings));
  };

  // Warn and above always display the line # unless override
  console.warn = function () {
    let settings = {
      displayMachineId: global.winston_global_logger_options.displayMachineId,
      displayFilename: global.winston_global_logger_options.displayFilename || true
    }
    logger.warn.apply(logger, getFormattedArgs(arguments, settings))
  };

  console.error = function () {
    let settings = {
      displayMachineId: global.winston_global_logger_options.displayMachineId,
      displayFilename: global.winston_global_logger_options.displayFilename || true
    }
    logger.error.apply(logger, getFormattedArgs(arguments, settings))
  };

  // Global registry, only once
  global.winston_global_logger = logger;
  global.winston_global_logger_options = options;

  return logger;
}

module.exports = {
  init: (options) => { return init(options) },
  getLogger: (options) => { return getLogger(options) }
}

// END LOGGER 