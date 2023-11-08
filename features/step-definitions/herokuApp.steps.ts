import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals';

import HerokuAppPage from '../pageobjects/herokuApp.page.js';

Given(/^I am on the Herokuapp ([^"]*) page with ([^"]*) path$/, async (pageName, path?) => {
    // reporter.addStep(this.testid, "info", "Verifying forget password message...")
    await HerokuAppPage.openHerokuapp(path);
});
