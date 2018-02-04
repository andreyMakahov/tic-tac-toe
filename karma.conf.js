var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine'],

        files: [
            'src/**/__test__/**/*.js',
        ],

        preprocessors: {
            'src/**/__test__/**/*.js': ['webpack'],
        },

        reporters: ['progress'],

        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],

        port: 9876,

        colors: true,

        logLevel: config.LOG_DEBUG,

        autoWatch: config.autoWatch,

        browsers: ['PhantomJS'],

        singleRun: config.singleRun,

        browserNoActivityTimeout: 100000,

        concurrency: Infinity,

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        }
    });
};