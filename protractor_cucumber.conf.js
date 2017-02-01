// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/features/*.feature'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  params: {
    APP_URL: 'http://localhost:4200'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  useAllAngular2AppRoots: true,
  cucumberOpts: {
    require: './src/features/step_definitions/**/*.js',
    tags: false,
    format: 'pretty',
    profile: false,
    'no-source': true
  }
};
