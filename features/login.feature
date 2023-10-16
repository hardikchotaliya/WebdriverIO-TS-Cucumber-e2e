Feature: The Internet Guinea Pig Website

  Scenario Outline: <TestID>: As a user, I can log into the secure area

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a flash message saying <message>

    Examples:
      | TestID | username | password             | message                        |
      | Test_1 | tomsmith | SuperSecretPassword! | You logged into a secure area! |
      | Test_2 | foobar   | barfoo               | Your username is invalid!      |
