/* eslint-disable */
// Adapted from http://kentor.me/posts/testing-react-and-flux-applications-with-karma-and-webpack/
var webpack_config = require('./webpack.config.js');
// and http://www.syntaxsuccess.com/viewarticle/writing-jasmine-unit-tests-in-es6
// This one seemed to be almost working but wanted to parse .md files and shit
module.exports = function(config) {
    config.set({
        junitReporter: {
            outputDir: '.'
        },
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            {pattern: 'tests.webpack.js', watched: true},
        ],
        preprocessors: {
            'tests.webpack.js': [ 'webpack', 'sourcemap' ],
        },
        webpack: {
            // just do inline source maps instead of the default
            devtool: 'inline-source-map',
            module: webpack_config.module,
            watch: true
        },
        webpackServer: {
            noInfo: true
        },
        reporters: ['dots', 'junit'],
        autoWatch: true,
        singleRun: true,
    });
};
/* eslint-enable */
