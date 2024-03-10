import { browser } from '@wdio/globals';
import { Timeouts } from '../constants/staticData.js';
import reporter from "../support/reporter.js"
import { expect as expectChai } from 'chai'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {

    async loadURL(url: string) {
        // await browser.deleteAllCookies(); //Showing Error in Alure Repoter
        await browser.url(url)
        await browser.maximizeWindow();
        await browser.pause(1000);
    }

    async click(webElement: WebdriverIO.Element) {
        await webElement.waitForClickable({ timeout: 20000 });
        if ((await (await webElement).isDisplayedInViewport()) === false) {
            await (await webElement).scrollIntoView();
        }
        await webElement.click();
    }

    async rightClick(webElement: WebdriverIO.Element) {
        await webElement.click({ button: 2, skipRelease: true });
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
            await webElement.waitForDisplayed({ timeout: timeOuts, timeoutMsg: `element is not visible after ${timeOuts} seconds`, });
        } catch (error) {
            console.log(`Error: ${error}`);
            throw error;
        }
    }

    async getText(webElement: WebdriverIO.Element): Promise<string> {
        return await webElement.getText();
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

    async checkIfTrueOrFalse(isTrue: boolean, expectedTrueOrFalse: boolean, msg?: string): Promise<void> {
        try {
            await expect(isTrue).toBe(expectedTrueOrFalse);
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

    async checkIsElementDisplayed(webElement: WebdriverIO.Element, msg?: string): Promise<boolean> {
        try {
            return await webElement.isDisplayed();
        } catch (err) {
            console.log(`Message: ${msg}, Error: ${err}`);
            throw err;
        }
    }

    async checkIsElementNotDisplayed(webElement: WebdriverIO.Element): Promise<boolean> {
        try {
            return !(await webElement).isDisplayed();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async checkIsElementDisplayedInViewport(webElement: WebdriverIO.Element, msg?: string): Promise<boolean> {
        try {
            return await webElement.isDisplayedInViewport();
        } catch (err) {
            console.log(`Message: ${msg}, Error: ${err}`);
            throw err;
        }
    }

    async getAlertText(): Promise<string> {
        return await browser.getAlertText();
    }

    async acceptAlert(): Promise<void> {
        await browser.acceptAlert();
    }

    async waitForWhile(value = Timeouts._5Seconds): Promise<void> {
        await browser.pause(value);
    }

    async checkBrokenImagesUsingResponseCode(testid: string, webElement: WebdriverIO.ElementArray): Promise<string[]> {
        const images = await webElement;
        const brokenImageSources: string[] = [];

        for (const image of images) {
            const src = await image.getAttribute('src');
            console.log("Src - " + src);
            const response = await browser.execute(async (url) => {
                const response = await fetch(url);
                return response.status;
            }, src);

            console.log("Fetched URL - " + response);
            if (response !== 200) {
                console.error(`Broken image found: ${src}`);
                reporter.addStep(testid, "info", `Assertion of ${testid} >> Found Broken image = ${src}`);
                brokenImageSources.push(src);
            }
        }
        return brokenImageSources;
    }

    // async checkBrokenImagesUsingNaturalWidthAttribute1(webElement: WebdriverIO.ElementArray) {
    //     const images = await webElement;

    //     // Iterate through each image and check its naturalWidth
    //     images.forEach(async image => {
    //         const imageUrl = await image.getAttribute('src');

    //         // Use JavaScript executor to check naturalWidth
    //         const naturalWidth = await browser.execute(function (imageUrl) {
    //             const img = new Image();
    //             img.src = imageUrl;
    //             return img.naturalWidth;
    //         }, imageUrl);

    //         // Check if the image has a natural width of 0 (indicating a broken image)
    //         if (naturalWidth === 0) {
    //             console.log(`Broken image is ${imageUrl}`);
    //         }
    //         // assert.strictEqual(naturalWidth, 0, `Image ${imageUrl} is broken`);
    //     });

    // }

    /** Explanation
     * Promise.all: Handles multiple promises concurrently, allowing you to wait for all of them to resolve.
     * browser.execute: Executes JavaScript code in the browser context, enabling interaction with the webpage.
     * Array.prototype.map: Transforms elements of an array based on a provided function, creating a new array with the transformed values.
     */
    async checkBrokenImagesUsingNaturalWidthAttributeV2(testid: string, webElement: WebdriverIO.ElementArray): Promise<string[]> {
        try {
            const images = await webElement;
            const brokenImageSources: string[] = [];
            const imageUrls = await Promise.all(await images.map(async image => {
                return image.getAttribute('src');
            }));

            // Execute JavaScript to check naturalWidth for each image URL
            const naturalWidths = await Promise.all(imageUrls.map(async imageUrl => {
                return browser.execute(function (imageUrl) {
                    const img = new Image();
                    img.src = imageUrl;
                    return img.naturalWidth;
                }, imageUrl);
            }));

            // Check for broken images
            naturalWidths.forEach((naturalWidth, index) => {
                if (naturalWidth === 0) {
                    console.log(`Broken image is ${imageUrls[index]}`);
                    brokenImageSources.push(imageUrls[index]);
                }
            });
            return brokenImageSources;
        } catch (error) {
            console.error(`Error occurred: ${error}`);
            throw error;
        }
    }

    async checkBrokenImagesUsingNaturalWidthAttributeV1(testid: string, webElement: WebdriverIO.ElementArray): Promise<string[]> {
        // Find all image elements on the page
        const images = await webElement;
        const brokenImageSources: string[] = [];

        // Iterate through each image and check its naturalWidth
        for (const image of images) {
            const imageUrl = await image.getAttribute('src');

            // Use JavaScript executor to check naturalWidth
            const naturalWidth = await browser.executeAsync(async function (imageUrl, done) {
                const img = new Image();
                img.onload = function () {
                    done(img.naturalWidth);
                };
                img.onerror = function () {
                    done(0); // Set width to 0 if image fails to load
                };
                img.src = imageUrl;
            }, imageUrl);

            // Check if the image has a natural width of 0 (indicating a broken image)
            if (naturalWidth === 0) {
                await console.log(`${imageUrl} image is broken with width ${naturalWidth}`);
                brokenImageSources.push(imageUrl);
            }
            // assert.strictEqual(naturalWidth, 0, `Image ${imageUrl} is broken`);
        }
        return brokenImageSources;
    }

    async checkIfEqualText(actual: unknown, expected: unknown, msg?: string): Promise<void> {
        try {
            await expectChai(actual, msg).to.equal(expected);
            console.log(`Assertion >> As Expected:- ${actual} is equal to ${expected}.`);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async checkIfContainsText(original: string, substring: string, msg?: string): Promise<boolean> {
        try {
            return original.includes(substring);
        } catch (err) {
            console.log(err, msg);
            throw err;
        }
    }

    async dragAndDrop(elem: WebdriverIO.Element, target: WebdriverIO.Element): Promise<void> {
        // drag and drop to other element
        await elem.dragAndDrop(target);
    }

}
