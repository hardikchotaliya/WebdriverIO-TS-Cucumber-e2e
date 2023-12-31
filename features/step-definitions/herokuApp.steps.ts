import { Given, When, Then } from '@wdio/cucumber-framework';
import HerokuAppPage from '../pageobjects/herokuApp.page.js';

Given(/^I am on the Herokuapp ([^"]*) page with ([^"]*) path$/, async (pageName, path?) => {
    // reporter.addStep(this.testid, "info", "Verifying forget password message...")
    await HerokuAppPage.openHerokuapp(path);
    await HerokuAppPage. verifyHomepageHeading();
});

When(/^I click on ([^"]*) link$/, async (link) => {
    await HerokuAppPage.clickLink(link);
});

Then(/^I should navigate to the ([^"]*) page with heading - ([^"]*)$/, async (url, heading) => {
    await HerokuAppPage.checkURLContains(url);
    await HerokuAppPage.verifyPageHeading(heading);
});