import { $ } from '@wdio/globals';
import Page from './page.js';
import { Timeouts } from '../constants/staticData.js';

const page = new Page();

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HerokuAppPage extends Page {
    /**
     * define selectors using getter methods
     */
    get flashAlert() { return $('#flash'); }
    get waitPageLoad() { return $('#content'); }
    get homepageHeading() { return $('#content > h1'); }
    get pageHeading() { return $('#content h3'); }

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async openHerokuapp(path?: string) {
        await page.loadURL(`https://the-internet.herokuapp.com/${path}`);
        await page.waitForVisibilityOf(await this.waitPageLoad, Timeouts._10Seconds);
    }

    async verifyHomepageHeading() {
        await page.waitForVisibilityOf(await this.homepageHeading, Timeouts._10Seconds);
        // let heading = await page.getText(await this.homepageHeading);
        // await page.checkIfEqual(heading, 'Welcome to the-internet', `Herokuapp homepage heading: ${heading} is not equal the expected heading: Welcome to the-internet`);
        await page.checkIfEqual(await this.homepageHeading, 'Welcome to the-internet');
    }

    async verifyPageHeading(expectedHeading: string) {
        // let heading = await page.getText(await this.pageHeading);
        await page.checkIfEqualContainsText(await this.pageHeading, expectedHeading, `Herokuapp homepage heading is not equal the expected heading: ${expectedHeading}`);
    }

    async clickLink(link: string) {
        const ele = await $(`a[href$='${link}']`);
        await page.click(ele);
    }



}

export default new HerokuAppPage();
