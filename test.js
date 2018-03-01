'use strict';
console.log('Environment: ',process.env.NODE_ENV)
var loggerImpl = require('./index.js');
// loggerImpl.init();
// Or with all settings
loggerImpl.init();

// simple logger
var defaultLogger = loggerImpl.getLogger()
// custom logger
var customLogger = loggerImpl.getLogger({label:"Custom ClassName", format:'json', level:'info'})


//var myLogger = logger.getLogger({format:'json'});
console.debug("Debug");
console.info("Info");
console.warn("Warn");
console.error(new Error("My bad"));
console.log("Console.log is console.info");


defaultLogger.debug("Debug");
defaultLogger.info("Lines below is DEFAULT")
defaultLogger.warn("Warn")
defaultLogger.error(new Error("Oh boy"))

customLogger.debug("Debug");
customLogger.info("This CUSTOM, you won't see any debug since my level is INFO or above")
customLogger.warn("Warn")
customLogger.error(new Error("Oops"))

process.exit(0)


