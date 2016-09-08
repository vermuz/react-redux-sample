const args = process.argv;
args.splice(0, 4);

const polyfills = [
    'node_modules/es6-promise/dist/es6-promise.js'
];

var files = polyfills.concat(args);

module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine'],

        files: files,

        preprocessors: {
            '**/*.spec.ts': ['webpack'],
            '**/*.spec.tsx': ['webpack']
        },

        webpack: {
            resolve: {
                extensions: ['', '.ts', '.js', ".tsx"]
            },
            module: {
                loaders: [{
                    test: /\.tsx?$/,
                    loader: "ts-loader"
                }]
            }
        },

        reporters: ['mocha'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['Chrome'],

        singleRun: true,

        concurrency: Infinity
    })
};