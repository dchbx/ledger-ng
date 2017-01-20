
var urlChanged = function(url) {
  return function () {
    return browser.getCurrentUrl().then(function(actualUrl) {
      return url == actualUrl;
    });
  };
};

describe( 'create account', function() {
  
  it( 'should error with mismatching passwords', function() {
      // navigate to the create account page
      browser.get( 'http://localhost:4200/signup' );
    
      // valid entries for all other fields
      element( by.id( "email" ) ).sendKeys( "random@email.com" );
    
      // put in two different passwords
      element( by.id( "password") ).sendKeys( "aaa111bbb!" );
      element( by.id( "password_confirmation" ) ).sendKeys( "aaa111bbb!!" );
      
      // try to submit the form
      element( by.css( '[type="submit"]' ) ).click();
      
      // make sure the page doesn't change
      browser.wait(urlChanged("http://localhost:4200/signup"), 1000);
  } );
    
} );
