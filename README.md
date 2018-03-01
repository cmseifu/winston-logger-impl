# Winston Logger Impl

Simple winston logger implementation to allow override of console.log.  Also provide customization of Machine Id and Source file line number.

### Installing

Simply install through npm for winston-logger-impl

```
npm --save winston-logger-impl
```


### Usuage
By default the logger will initialize with the following based on process.env, but you can always override it.

```js
  var isProduction = 
    (process.env.NODE_ENV && process.env.NODE_ENV.substring(0,4).toLowerCase() === 'prod') ||
    'AWS_EXECUTION_ENV' in process.env;

  if (!options.level && isProduction) {
    options.level = 'warn';
  }
  if (!options.format && isProduction) {
    options.format = 'json';
  }
```

#### Simple
```js
const loggerImpl = require('winton-looger-impl');
// global initialize
loggerImpl.init();
console.debug("Debug");
console.info("Info");
console.warn("Warn");
console.error(new Error("Error"));
```
#### Customizable Options
```js
// global
loggerImpl.init( {
    format: 'text' // text (default) | 'json',
    level: 'debug' // debug (default) | 'info' | 'warn' | 'error',
    displayMachineId: false // false (default) | true,
    displayFilename: false // false (default) | true,  Note: level 'warn' or above will always true unless defined
  })

console.debug("Debug");
console.info("Info");
console.warn("Warn");
console.error(new Error("Error"));
```

### getLogger

The getLogger method will return a winston logger with the transport of Console.  Only 'format' and 'level' is supported.

```js
const logger = loggerImpl.getLogger();
logger.log("Info");
logger.warn("Warn");
logger.error(new Error("Error"));
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Sheng Huang** 

## License

This project is licensed under the MIT License


