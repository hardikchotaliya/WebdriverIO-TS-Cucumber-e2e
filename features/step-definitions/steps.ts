import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';
// import reporter from '../support/reporter.js';

const pages = { login: LoginPage }

Given(/^I am on the (\w+) page$/, async (page) => {
    // reporter.addStep(this.testid, "info", "Verifying forget password message...")
    await pages[page].open()
});

When(/^I login with (\w+) and (.+)$/, async function (username, password) {
    this.appid = 'TestAppID'; //Set appid
    await LoginPage.login(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async function (message) {
    console.log("App ID - " + this.appid); //Get appid
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});

