@api1
Feature: API Testing at https://reqres.in/

    Scenario: Get Users Details
        When Send GET single user with id "2"
        Then I get response code is "200"
        Then I get response from request
            | email      | janet.weaver@reqres.in                  |
            | first_name | Janet                                   |
            | last_name  | Weaver                                  |
            | avatar     | https://reqres.in/img/faces/2-image.jpg |

    Scenario: Create a New Users
        When Send POST user with
            | name | sang-mohan |
            | job  | leader     |
        Then I get response code is "201"
        Then I get response from server
            | name | sang-mohan |
            | job  | leader     |
        Then Get UserId from response
        When Send PUT user with
            | name | sang-mohan-updated |
            | job  | leader-updated     |
        Then I get response code is "200"
        Then I get response from server
            | name | sang-mohan-updated |
            | job  | leader-updated     |

    Scenario: Test Stripe API
        When Send request to Stripe
        Then I get response code from Stripe is "200"
        Then I get response from Stripe
            | statusMessage | OK |
