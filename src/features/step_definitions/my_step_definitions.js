
// Use chai for assersions
var chai = require( 'chai' );
var chaiAsPromised = require( 'chai-as-promised' );
chai.use( chaiAsPromised );

var urlChanged = function(url, checkEquals) {
  return function () {
    return browser.getCurrentUrl().then(function(actualUrl) {
      return checkEquals ? (url == actualUrl) : (url != actualUrl);
    });
  };
};

module.exports = function() {
  
  this.Given(/^I go to "([^"]*)"$/, function (site, callback) {
    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    browser.sleep(500); 
    browser.get( site ).then( callback );
  });
  
  this.Given(/^in the app I go to "([^"]*)"$/, function (site, callback) {
    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    browser.sleep(500); 
    browser.get( browser.params.APP_URL + site ).then( callback );
  });
  
  this.When(/^I fill in create account information$/, function() {
    element(by.id('email')).sendKeys('212a22a23@addasdsdasd.com');
    element(by.id('password')).sendKeys('aaa111bbb!');
    element(by.id('password_confirmation')).sendKeys('aaa111bbb!');
  });

  this.When(/^I click the submit button$/, function() {
    var el = element(by.css('[type="submit"]'));
    el.click();
  });

  this.When(/^I input an invalid password confirmation$/, function() {
    element(by.id('password_confirmation')).sendKeys('aaa111bbb!asdasasd!!q3');
  });
  
  this.Then(/^the path should be "([^"]*)"$/, function(param, callback) {
    browser.wait( function() {
      return browser.getCurrentUrl().then( function(url) {
        var relativeUrl = url.replace( browser.params.APP_URL, "" );
        
        if( relativeUrl == param ) {
          callback();
          return true;
        }
      });
    }, 10500, "Invalid path");
  });
  
  this.Then(/^the URL should be "([^"]*)"$/, function(param, callback) {
    browser.wait( function() {
      return browser.getCurrentUrl().then( function(url) {
        if( url == param ) {
          callback();
          return true;
        }
      });
    }, 10500, "Invalid URL");
  });

};
