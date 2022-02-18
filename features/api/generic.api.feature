@api
Feature: API Testing
    Scenario: Test Generic API
        When Send GET request to API "https://genesistest.securitynational.com/API/GetPredictiveICList"
        Then I get response code from API is "200"

    Scenario: Send Request to Lob
        Given  Send POST to Lob API with path "/v1/us_verifications?case=upper"
            | primary_line | deliverable   |
            | city         | San Francisco |
            | state        | CA            |
            | zip_code     | 94107         |
        Then I get response code from API is "200"
        Then I get response from Lob API
            | deliverability | deliverable           |
            | primary_line   | 1 TELEGRAPH HILL BLVD |
