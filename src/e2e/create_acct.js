
var urlChanged = function(url, checkEquals) {
  return function () {
    return browser.getCurrentUrl().then(function(actualUrl) {
      return checkEquals ? (url == actualUrl) : (url != actualUrl);
    });
  };
};

describe( 'create account', function() {
  
  beforeEach( function() {
      // navigate to create account pag
      browser.get( 'http://localhost:4200/signup' );
      
      // fill in valid info
      element( by.id( "email" ) ).sendKeys( "random@email.com" );
      element( by.id( "password") ).sendKeys( "aaa111bbb!" );
      element( by.id( "password_confirmation" ) ).sendKeys( "aaa111bbb!" );
  } );
  
  it( 'should error with mismatching passwords', function() {
      // mismatch on confirm password
      element( by.id( "password_confirmation" ) ).sendKeys( "aaa111bbb!!" );
      
      // try to submit the form
      element( by.css( '[type="submit"]' ) ).click();
      
      // make sure the page doesn't change
      browser.wait(urlChanged("http://localhost:4200/signup", true), 2000);
  } );
  
  it( 'should change pages on successful signup', function() {
      // try to submit the form
      element( by.css( '[type="submit"]' ) ).click();
      
      // make sure the page changes
      browser.wait(urlChanged("http://localhost:4200/signup", false), 2200);
  } );
  
} );
