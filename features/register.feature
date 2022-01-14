Feature: Navigation and Register an email

    Scenario: Navigation and Register an email
        Given I open Register site
        When I input the email "sangmai@sang.com"
        Then I get UserId and Password

    Scenario: Navigation and Login into system
        Given I go to Login page
        When I input the login info
        Then Verify Welcome screen is displayed
