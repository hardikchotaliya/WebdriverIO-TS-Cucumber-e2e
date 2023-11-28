import { Given, When, Then } from '@wdio/cucumber-framework';
import HerokuAppPage from '../pageobjects/herokuApp.page.js';
import herokuAppPage from '../pageobjects/herokuApp.page.js';

Given(/^I am on the Herokuapp ([^"]*) page with ([^"]*) path$/, async (pageName, path?) => {
    // reporter.addStep(this.testid, "info", "Verifying forget password message...")
    await HerokuAppPage.openHerokuapp(path);
});

Given(/^I am on the "([^"]*)" page with "([^"]*)" URL$/, async (pageName, url) => {
    await HerokuAppPage.openWebsite(url);
});

When(/^I verify the Herokuapp homepage$/, async () => {
    await HerokuAppPage.verifyHomepageHeading();
});

When(/^I click on ([^"]*) link$/, async (link) => {
    await HerokuAppPage.clickLink(link);
});

Then(/^I should navigate to the ([^"]*) page with heading - ([^"]*)$/, async (url, heading) => {
    await HerokuAppPage.checkURLContains(url);
    await HerokuAppPage.verifyPageHeading(heading);
});

When(/^I verify the "([^"]*)" Element functionality$/, async (action) => {
    await herokuAppPage.verifyAddRemoveElementFunctionality(action);
});

Then(/^I verify the body message "([^"]*)" of the page$/, async (expectedMsg) => {
    await HerokuAppPage.checkBodyMessage(expectedMsg);
});

Then(/^I check for the Broken Images on the page$/, async () => {
    await HerokuAppPage.checkBrokenImages();
});