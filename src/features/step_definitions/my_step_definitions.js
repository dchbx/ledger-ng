
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
    browser.get( site ).then( callback );
  });
  
  this.When(/^I fill in create account information$/, function() {
    element(by.id('email')).sendKeys('asd1sas@email.com');
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
  
  this.Then(/^the browser should navigate to "([^"]*)"$/, function(param, callback) {
    browser.wait( function() {
      return browser.getCurrentUrl().then( function(url) {
        if( chai.expect( url ).to.equal( param ) ) {
          callback();
          return;
        }
      });
    }, 1500, "URL hasn't changed");
  });

};
