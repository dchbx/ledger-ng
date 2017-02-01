#features/test.feature
Feature: Signup Page
    These are dummy end to end tests regarding
    the sign up page
    
    Scenario: Test Create Account Invalid Password Confirmation
        Given I go to "http://localhost:4200/signup"
        When I fill in create account information
        And I click the submit button
        Then the browser should navigate to "http://localhost:4200/employers"

    Scenario: Test Create Employer Account
        Given I go to "http://localhost:4200/signup"
        When I fill in create account information
        And I input an invalid password confirmation
        Then the browser should navigate to "http://localhost:4200/signup"
