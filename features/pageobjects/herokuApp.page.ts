import { $, $$ } from '@wdio/globals';
import Page from './page.js';
import { Timeouts } from '../constants/staticData.js';
import reporter from "../support/reporter.js"

const page = new Page();

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HerokuAppPage extends Page {
    /**
     * define selectors using getter methods
     */
    get flashAlert() { return $('#flash').getElement(); }
    get waitPageLoad() { return $('#content').getElement(); }
    get homepageHeading() { return $('#content > h1').getElement(); }
    get pageHeading() { return $('#content h3').getElement(); }
    get btnAddElement() { return $('//button[text()="Add Element"]').getElement(); }
    get btnDelete() { return $('//button[text()="Delete"][last()]').getElement(); }
    get gtBodyMsg() { return $('#content p').getElement(); }
    get gtImages() { return $$('img').getElements(); }
    get clkContextMenuSpot() { return $('div#hot-spot').getElement(); }
    get gtColumnAHeading() { return $('#column-a header').getElement(); }
    get gtColumnBHeading() { return $('#column-b header').getElement(); }
    get clkColumnA() { return $('#column-a').getElement(); }
    get clkColumnB() { return $('#column-b').getElement(); }

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async openHerokuapp(testid: string, path?: string) {
        await page.loadURL(`https://the-internet.herokuapp.com/${path}`);
        console.log(`Load URL - https://the-internet.herokuapp.com/${path}`);
        // await page.waitForVisibilityOf(await this.waitPageLoad, Timeouts._10Seconds);
        reporter.addStep(testid, "info", `Herokuapp page Loading...`);
    }

    async openWebsite(url: string) {
        await page.loadURL(url);
        console.log('url - ' + url);
        // await page.waitForVisibilityOf(await this.waitPageLoad, Timeouts._10Seconds);
    }

    async verifyHomepageHeading(testid: string) {
        await page.waitForVisibilityOf(await this.homepageHeading, Timeouts._10Seconds);
        // let heading = await page.getText(await this.homepageHeading);
        // await page.checkIfEqual(heading, 'Welcome to the-internet', `Herokuapp homepage heading: ${heading} is not equal the expected heading: Welcome to the-internet`);
        await page.checkIfEqual(await this.homepageHeading, 'Welcome to the-internet');
        reporter.addStep(testid, "info", `Assertion of ${testid} >> Herokuapp Homepage Displayed Successfully`);
    }

    async verifyPageHeading(testid: string, expectedHeading: string) {
        // let heading = await page.getText(await this.pageHeading);
        await page.checkIfEqualContainsText(await this.pageHeading, expectedHeading, `Herokuapp homepage heading is not equal the expected heading: ${expectedHeading}`);
        reporter.addStep(testid, "info", `Assertion of ${testid} >> Herokuapp Homepage Heading is matching with the expected one.`);
    }

    async clickLink(link: string) {
        const ele = await $(`a[href$='${link}']`).getElement();
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

    async isDeleteButtonDisplayed(testid: string) {
        let isDeleteBittonVisible = await page.checkIsElementDisplayed(await this.btnDelete);
        console.log('isDeleteBittonVisible-' + isDeleteBittonVisible);
        await page.checkIfTrueOrFalse(isDeleteBittonVisible, true, 'Delete button is not displayed!');
        reporter.addStep(testid, "info", `Assertion of ${testid} >> Verfied Delete button is displayed successfully`);
    }

    async isDeleteButtonRemoved(testid: string) {
        let isDeleteButtonremoved = await page.checkIsElementNotDisplayed(await this.btnDelete);
        console.log('isDeleteBittonremoved-' + isDeleteButtonremoved);
        await page.checkIfTrueOrFalse(isDeleteButtonremoved, false, 'Delete button is displayed!');
        reporter.addStep(testid, "info", `Assertion of ${testid} >> Verfied Delete button removed successfully`);
    }

    async verifyAddRemoveElementFunctionality(testid: string, action: string): Promise<void> {
        try {
            switch (action.toUpperCase()) {
                case 'ADD': {
                    console.log("ADD action is executed");
                    await this.clickOnAddElementButton();
                    await this.isDeleteButtonDisplayed(testid);
                    break;
                }
                case 'REMOVE': {
                    console.log("REMOVE action is executed");
                    await this.clickOnDeleteButton();
                    await this.isDeleteButtonRemoved(testid);
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

    async checkBodyMessage(testid: string, expMsg: string) {
        let gtActualMsg = await page.getText(await this.gtBodyMsg);
        await page.checkIfEqualContainsText(await this.gtBodyMsg, expMsg, `Actual message: ${gtActualMsg} is not containing the Expected message: ${expMsg}`);
        reporter.addStep(testid, "info", `Assertion of ${testid} >> Verfied body message with the expected message`);
    }

    async checkBrokenImages(testid: string) {
        /* Check Broken Images Using Response Code */
        let sBrokenImageName = await page.checkBrokenImagesUsingResponseCode(testid, await this.gtImages);
        await page.checkIfEqualText(sBrokenImageName[0], 'asdf.jpg', `Actual message: ${sBrokenImageName[0]} is not containing the Expected message: asdf.jpg`);
        await page.checkIfEqualText(sBrokenImageName[1], 'hjkl.jpg', `Actual message: ${sBrokenImageName[1]} is not containing the Expected message: hjkl.jpg`);
        reporter.addStep(testid, "info", `Assertion of ${testid} >> Verfied Broken Image using Response Code`);

        /* Check Broken Images Using Natural Width Attribute Variation 1 */
        let sBrokenImageNameV1 = await page.checkBrokenImagesUsingNaturalWidthAttributeV1(testid, await this.gtImages);
        await page.checkIfEqualText(sBrokenImageNameV1[0], 'asdf.jpg', `Actual message: ${sBrokenImageNameV1[0]} is not containing the Expected message: asdf.jpg`);
        await page.checkIfEqualText(sBrokenImageNameV1[1], 'hjkl.jpg', `Actual message: ${sBrokenImageNameV1[1]} is not containing the Expected message: hjkl.jpg`);
        reporter.addStep(testid, "info", `Assertion of ${testid} >> Verfied Broken Image using Natural Width Attribute Variation 1`);

        /* Check Broken Images Using Natural Width Attribute Variation 2 */
        let sBrokenImageNameV2 = await page.checkBrokenImagesUsingNaturalWidthAttributeV2(testid, await this.gtImages);
        await page.checkIfEqualText(sBrokenImageNameV2[0], 'asdf.jpg', `Actual message: ${sBrokenImageNameV2[0]} is not containing the Expected message: asdf.jpg`);
        await page.checkIfEqualText(sBrokenImageNameV2[1], 'hjkl.jpg', `Actual message: ${sBrokenImageNameV2[1]} is not containing the Expected message: hjkl.jpg`);
        reporter.addStep(testid, "info", `Assertion of ${testid} >> Verfied Broken Image using Natural Width Attribute Variation 2`);
    }

    async checkAllCheckboxes(testid: string) {
        const checkboxes = await $$('#checkboxes input[type="checkbox"]');

        for (const checkbox of checkboxes) {
            const isChecked = await checkbox.isSelected();
            if (!isChecked) {
                await checkbox.click();
            }
            await expect(checkbox).toBeChecked();
        }

        reporter.addStep(testid, "info", `Assertion of ${testid} >> Verified all checkboxes are checked`);
    }

    async uncheckAllCheckboxes(testid: string) {
        const checkboxes = await $$('#checkboxes input[type="checkbox"]');

        for (const checkbox of checkboxes) {
            const isChecked = await checkbox.isSelected();
            if (isChecked) {
                await checkbox.click();
                await expect(checkbox).not.toBeChecked();
            }
        }

        reporter.addStep(testid, "info", `Assertion of ${testid} >> Verified all checkboxes are unchecked`);
    }

    async verifyContextMenuByRightClick(testid: string) {
        await page.rightClick(await this.clkContextMenuSpot);
        await page.waitForWhile(Timeouts._3Seconds);
        const sAlertText = await page.getAlertText();
        await page.checkIfEqualText(sAlertText, 'You selected a context menu', 'Alert box is not open or text is not matching');
        await page.acceptAlert();
        reporter.addStep(testid, "info", `Assertion of ${testid} >> Context menu right clikced successfully`);
    }

    async verifyDragAndDropFucntionality(testid: string) {
        await page.checkIfEqualText(await page.getText(await this.gtColumnAHeading), 'A', 'By default the first Column box heading is not A');
        await page.checkIfEqualText(await page.getText(await this.gtColumnBHeading), 'B', 'By default the Second Column box heading is not B');
        
        /* Drag block A to B and check heading of first colum should be B after it  */
        await page.dragAndDrop(await this.clkColumnA, await this.clkColumnB);
        await page.checkIfEqualText(await page.getText(await this.gtColumnAHeading), 'B', 'After draging block A to B the first Column box heading is not B');
        await page.checkIfEqualText(await page.getText(await this.gtColumnBHeading), 'A', 'After draging block A to B the first Column box heading is not A');
        
        reporter.addStep(testid, "info", `Assertion of ${testid} >> Verified Drag And Drop Fucntionality successfully`);
    }



    

}

export default new HerokuAppPage();
