/* eslint-disable prettier */
var webpackConfig = require("./webpack.test.js");

module.exports = function(config) {
  var _config = {
    basePath: "../",

    frameworks: ["jasmine"],

    client: {
      clearContext: false // leave Jasmine spec runner output visible in the browser
    },

    files: [
      {
        pattern: "./test-config/karma-test-shim.js",
        watched: true
      },
      {
        pattern: "./src/assets/**/*",
        watched: false,
        included: false,
        served: true,
        nocache: false
      }
    ],

    proxies: {
      "/assets/": "/base/src/assets/"
    },

    preprocessors: {
      "./test-config/karma-test-shim.js": ["webpack", "sourcemap"]
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: "errors-only"
    },

    webpackServer: {
      noInfo: true
    },

    browserConsoleLogOptions: {
      level: "log",
      format: "%b %T: %m",
      terminal: true
    },

    coverageIstanbulReporter: {
      reports: ["html", "lcovonly"],
      fixWebpackSourcePaths: true
    },

    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },

    reporters: config.coverage
      ? ["kjhtml", "dots", 'mocha', "coverage-istanbul"]
      : ["kjhtml", "dots", 'mocha'],
    //  reporters: config.angularCli && config.angularCli.codeCoverage
    //           ? ['mocha', 'karma-remap-istanbul']
    //           : ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false
  };

  config.set(_config);
};
