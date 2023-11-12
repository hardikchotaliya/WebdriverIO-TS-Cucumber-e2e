Feature: Verify Internet herokuapp Website

  'As a Tester I am automating all the action of Internet herokuapp Website'

  @herokuapp
  Scenario Outline: <TestID>: As a user, I am verifying Login functionality with <scenario> credentials
    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a flash message saying <message>
    Examples:
      | TestID  | username | password             | message                        | scenario |
      | Test_01 | tomsmith | SuperSecretPassword! | You logged into a secure area! | Valid    |
      | Test_02 | foobar   | barfoo               | Your username is invalid!      | Invalid  |

  @herokuapp
  Scenario Outline: <TestID>: As a user, I am verifying the A/B Testing functionality
    Given I am on the Herokuapp <pageName> page with <path> path
    When I click on <link> link
    Then I should navigate to the <link> page with heading - <heading>
    Examples:
      | TestID  | pageName | path | pageHeading | link   | heading  |
      | Test_03 | Home     |      | A/B Testing | abtest | A/B Test |