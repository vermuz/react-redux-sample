
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
      '**/*-test.js': ['webpack']
    },

    webpack: {
      resolve: {
        extensions: ['', '.ts', '.js', ".tsx"]
      },
      module: {
        loaders: [
        ],
        postLoaders: [{
          test: /\.js/,
          exclude: /(__test__|node_modules|bower_components)/,
          loader: 'istanbul-instrumenter'
        }]
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

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
    concurrency: Infinity,

    coverageReporter: {
      type : 'json',
      dir : 'coverage/'
    }
  })
};
