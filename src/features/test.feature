#features/test.feature
Feature: Running Cucumber with Protractor
    As a user of Protractor
    I should be able to use Cucumber
    In order to run my E2E tests

    Scenario: Protractor and Cucumber Test
        Given I go to "http://localhost:4200/signup"
        When I fill in create account information
        And I click the submit button
        Then the browser should navigate to "http://localhost:4200/employers"
