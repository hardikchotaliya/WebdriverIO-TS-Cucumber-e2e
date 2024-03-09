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
    When I verify the Herokuapp homepage
    When I click on <link> link
    Then I should navigate to the <link> page with heading - <heading>
    Examples:
      | TestID  | pageName | path | link   | heading  |
      | Test_03 | Home     |      | abtest | A/B Test |

  @herokuapp
  Scenario Outline: <TestID>: As a user, I am verifying the Add/Remove Elements functionality
    Given I am on the Herokuapp <pageName> page with <path> path
    Then I should navigate to the <link> page with heading - <heading>
    Then I verify the "Add" Element functionality
    Then I verify the "Remove" Element functionality
    Examples:
      | TestID  | pageName   | path                 | link                | heading             |
      | Test_04 | Add/Remove | add_remove_elements/ | add_remove_elements | Add/Remove Elements |

  @herokuapp
  Scenario Outline: <TestID>: As a user, I am verifying Basic Auth on chrome
    Given I am on the Herokuapp <pageName> page with <link> path
    Given I am on the "Auth" page with "<url>" URL
    Then I should navigate to the <link> page with heading - <heading>
    Then I verify the body message "<expectedMsg>" of the page
    Examples:
      | TestID  | pageName   | link       | url                                                       | heading    | expectedMsg     |
      | Test_05 | Basic Auth | basic_auth | https://admin:admin@the-internet.herokuapp.com/basic_auth | Basic Auth | Congratulations |

  @herokuapp
  Scenario Outline: <TestID>: As a user, I am verifying Broken images on the page
    Given I am on the Herokuapp <pageName> page with <link> path
    Then I should navigate to the <link> page with heading - <heading>
    Then I check for the Broken Images on the page
    Examples:
      | TestID  | pageName      | link          | path          | heading       |
      | Test_06 | Broken Images | broken_images | broken_images | Broken Images |

  @herokuapp
  Scenario Outline: <TestID>: As a user, I am verifying Checkboxes functionality on the page
    Given I am on the Herokuapp <pageName> page with <link> path
    Then I should navigate to the <link> page with heading - <heading>
    Then I verify the checkboxes functionality
    Examples:
      | TestID  | pageName   | link       | path       | heading    |
      | Test_07 | Checkboxes | checkboxes | checkboxes | Checkboxes |