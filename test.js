'use strict';

var logger = require('./index.js');
logger.init({displayMachineId: true, displayFilename:true, format:'json'});


//var myLogger = logger.getLogger({format:'json'});
console.debug("Debug");
console.info("Info");
console.warn("Warn");
console.error(new Error("My bad"));
console.log("Log which is Info");

