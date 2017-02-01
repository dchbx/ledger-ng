#features/test.feature
Feature: Signup Page
    These are dummy end to end tests regarding
    the sign up page
    
    Scenario: Test Create Account Invalid Password Confirmation
        Given in the app I go to "/signup"
        When I fill in create account information
        And I click the submit button
        Then the path should be "/employers"

    Scenario: Test Create Employer Account
        Given in the app I go to "/signup"
        When I fill in create account information
        And I input an invalid password confirmation
        Then the path should be "/signup"
