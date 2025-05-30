import { Given, When, Then } from '@wdio/cucumber-framework';

import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';
import { Timeouts } from '../constants/staticData.js';
import Page from '../pageobjects/page.js';
// import reporter from '../support/reporter.js';

// const pages = { login: LoginPage }
const page = new Page();

Given(/^I am on the login page$/, async () => {
    // reporter.addStep(this.testid, "info", "Verifying forget password message...")
    await LoginPage.open();
});

When(/^I login with (\w+) and (.+)$/, async function (username, password) {
    this.appid = 'TestAppID'; //Set appid
    await LoginPage.login(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async function (message) {
    // console.log("App ID - " + this.appid); //Get appid
    await page.waitForVisibilityOf(await SecurePage.flashAlert, Timeouts._10Seconds)
    await SecurePage.checkFlashMessage(message);
});

