@db
Feature: MSSQL Database Testing

    Scenario: Get Customer Details via CustomerId
        When Query Customer Details with CustomerId "2"
        Then I get response from Database
            | CustomerID | 2                         |
            | Name       | Muhinyi, Mauda            |
            | Address    | 1420 North Charles Street |
            | City       | New York'                 |
            | State      | NY                        |
            | ZipCode    | 10044                     |
