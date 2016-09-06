
const args = process.argv;
args.splice(0, 4);

const polyfils = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/materialize-css/dist/js/materialize.min.js'
];

var files = polyfils.concat(args);

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: files,

    preprocessors: {
      '**/*-test.ts': ['webpack'],
      '**/*-test.tsx': ['webpack']
    },

    webpack: require(__dirname + '/webpack.config.karma.js'),

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
