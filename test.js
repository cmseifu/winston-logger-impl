'use strict';

var loggerImpl = require('./index.js');
// loggerImpl.init();
// Or with all settings
loggerImpl.init({displayMachineId: true, displayFilename:true, format:'json'});

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
console.time("label", "start");
console.timeEnd("label", "end");

defaultLogger.debug("Debug");
defaultLogger.info("Lines below is DEFAULT")
defaultLogger.warn("Warn")
defaultLogger.error(new Error("Oh boy"))

customLogger.debug("Debug");
customLogger.info("This CUSTOM, you won't see any debug since my level is INFO or above")
customLogger.warn("Warn")
defaultLogger.error(new Error("Oops"))



