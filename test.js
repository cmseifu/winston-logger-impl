'use strict';

var loggerImpl = require('./index.js');
loggerImpl.init({displayMachineId: true, displayFilename:true, format:'json'});

var customLogger = loggerImpl.getLogger()


//var myLogger = logger.getLogger({format:'json'});
console.debug("Debug");
console.info("Info");
console.warn("Warn");
console.error(new Error("My bad"));
console.log("Log which is Info");

customLogger.info("Lines below is CUSTOM")
customLogger.debug("Debug");
customLogger.warn("Warn")

