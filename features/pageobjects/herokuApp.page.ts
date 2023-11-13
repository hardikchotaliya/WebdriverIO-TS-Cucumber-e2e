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
    get btnAddElement() { return $('//button[text()="Add Element"]'); }
    get btnDelete() { return $('//button[text()="Delete"][last()]'); }

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async openHerokuapp(path?: string) {
        await page.loadURL(`https://the-internet.herokuapp.com/${path}`);
        console.log(`Load URL - https://the-internet.herokuapp.com/${path}`);
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

    async clickOnAddElementButton() {
        await page.waitForVisibilityOf(await this.btnAddElement, Timeouts._30Seconds)
        await page.click(await this.btnAddElement);
    }

    async clickOnDeleteButton() {
        await page.waitForVisibilityOf(await this.btnDelete, Timeouts._30Seconds)
        await page.click(await this.btnDelete);
    }

    async isDeleteButtonDisplayed() {
        let isDeleteBittonVisible = await page.checkIsElementDisplayed(await this.btnDelete);
        console.log('isDeleteBittonVisible-' + isDeleteBittonVisible);
        await page.checkIfTrueOrFalse(isDeleteBittonVisible, true, 'Delete button is not displayed!');
    }

    async isDeleteButtonRemoved() {
        let isDeleteButtonremoved = await page.checkIsElementNotDisplayed(await this.btnDelete);
        console.log('isDeleteBittonremoved-' + isDeleteButtonremoved);
        await page.checkIfTrueOrFalse(isDeleteButtonremoved, false, 'Delete button is displayed!');
    }

    async verifyAddRemoveElementFunctionality(action: string): Promise<void> {
        try {
            switch (action.toUpperCase()) {
                case 'ADD': {
                    console.log("ADD action is executed");
                    await this.clickOnAddElementButton();
                    await this.isDeleteButtonDisplayed();
                    break;
                }
                case 'REMOVE': {
                    console.log("REMOVE action is executed");
                    await this.clickOnDeleteButton();
                    await this.isDeleteButtonRemoved();
                    break;
                }
                default: {
                    console.log(`Unsupported action: ${action}`);
                    throw new Error(`Unsupported action: ${action}`);
                }
            }
        } catch (err) {
            console.error(`Error: ${err.message}`);
            throw err;
        }
    }

}

export default new HerokuAppPage();
