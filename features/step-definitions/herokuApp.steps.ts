import { Given, When, Then } from '@wdio/cucumber-framework';
import HerokuAppPage from '../pageobjects/herokuApp.page.js';
import herokuAppPage from '../pageobjects/herokuApp.page.js';

Given(/^I am on the Herokuapp ([^"]*) page with ([^"]*) path$/, async function (pageName, path?) {
    // reporter.addStep(this.testid, "info", "Verifying forget password message...")
    await HerokuAppPage.openHerokuapp(this.testid, path);
});

Given(/^I am on the "([^"]*)" page with "([^"]*)" URL$/, async function (pageName, url) {
    await HerokuAppPage.openWebsite(url);
});

When(/^I verify the Herokuapp homepage$/, async function () {
    await HerokuAppPage.verifyHomepageHeading(this.testid);
});

When(/^I click on ([^"]*) link$/, async (link) => {
    await HerokuAppPage.clickLink(link);
});

Then(/^I should navigate to the ([^"]*) page with heading - ([^"]*)$/, async function (url, heading) {
    await HerokuAppPage.checkURLContains(url);
    await HerokuAppPage.verifyPageHeading(this.testid, heading);
});

Then(/^I should navigate to the ([^"]*) page by checking URL$/, async function (url) {
    await HerokuAppPage.checkURLContains(url);
});

When(/^I verify the "([^"]*)" Element functionality$/, async function (action) {
    await herokuAppPage.verifyAddRemoveElementFunctionality(this.testid, action);
});

Then(/^I verify the body message "([^"]*)" of the page$/, async function (expectedMsg) {
    await HerokuAppPage.checkBodyMessage(this.testid, expectedMsg);
});

Then(/^I check for the Broken Images on the page$/, async function () {
    await HerokuAppPage.checkBrokenImages(this.testid);
});

Then(/^I verify the checkboxes functionality$/, async function () {
    await HerokuAppPage.uncheckAllCheckboxes(this.testid);
    await HerokuAppPage.checkAllCheckboxes(this.testid);
});

Then(/^I verify the Context menu functionality$/, async function () {
    await HerokuAppPage.verifyContextMenuByRightClick(this.testid);
});

Then(/^I verify the drag and drop fucntionality$/, async function () {
    await HerokuAppPage.verifyDragAndDropFucntionality(this.testid);
});

