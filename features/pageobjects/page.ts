import { browser } from '@wdio/globals';
import { Timeouts } from '../constants/staticData.js';

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {

    async loadURL(url: string) {
        // await browser.deleteAllCookies(); //Showing Error in Alure Repoter
        await browser.url(url)
        await browser.maximizeWindow();
    }

    async click(webElement: WebdriverIO.Element) {
        await webElement.waitForClickable({ timeout: 20000 });
        if ((await (await webElement).isDisplayedInViewport()) === false) {
            await (await webElement).scrollIntoView();
        }
        await webElement.click();
    }

    async getCurrentUrl(): Promise<string> {
        let gtURL = await browser.getUrl();
        return gtURL;
    }

    async checkURL(expectedURL: string): Promise<void> {
        try {
            let currentURL = this.getCurrentUrl();
            await expect(browser).toHaveUrl(expectedURL);
            console.log(`Assertion >> As Expected: ${expectedURL} is equal to ${currentURL}.`);
        } catch (err) {
            console.error(`Assertion >> Not Expected: ${err.message}`);
            throw err;
        }
    }

    async checkURLContains(expectedURL: string): Promise<void> {
        try {
            let currentURL = await this.getCurrentUrl();
            await expect(browser).toHaveUrlContaining(expectedURL);
            console.log(`Assertion >> As Expected: ${expectedURL} is equal to ${currentURL}.`);
        } catch (err) {
            console.error(`Assertion >> Not Expected: ${err.message}`);
            throw err;
        }
    }

    async waitForVisibilityOf(webElement: WebdriverIO.Element, timeOuts = Timeouts._10Seconds): Promise<void> {
        try {
            await webElement.waitForDisplayed({ timeout: timeOuts, timeoutMsg: `element is not visible after ${timeOuts} seconds`,});
        } catch (error) {
            console.log(`Error: ${error}`);
            throw error;
        }
    }

    async getText(webElement: WebdriverIO.Element): Promise<string> { 
        return await webElement.getTagName();
    }

    async checkIfEqual(webElement: WebdriverIO.Element, expected: string, msg?: string): Promise<void> {
        try {
            // await expect(actual).toEqual(expected);
            await expect(webElement).toHaveText(expected);
            console.log(`Assertion >> As Actual text is equal to ${expected}.`);
        } catch (err) {
            console.log(`Message: ${msg}, Error: ${err}`);
            throw err;
        }
    }

    async checkIfEqualContainsText(webElement: WebdriverIO.Element, expected: string, msg?: string): Promise<void> {
        try {
            // await expect(actual).toEqual(expected);
            await expect(webElement).toHaveTextContaining(expected);
            console.log(`Assertion >> As Actual text is equal to ${expected}.`);
        } catch (err) {
            console.log(`Message: ${msg}, Error: ${err}`);
            throw err;
        }
    }


}
