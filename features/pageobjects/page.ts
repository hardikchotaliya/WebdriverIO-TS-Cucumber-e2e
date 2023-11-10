import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public openHerokuapp(path?: string) {
        return browser.url(`https://the-internet.herokuapp.com/${path}`)
    }

    async click(webElement: WebdriverIO.Element) {
        await webElement.waitForClickable({ timeout: 20000 });
        if ((await (await webElement).isDisplayedInViewport()) === false) {
            await (await webElement).scrollIntoView();
        }
        await webElement.click();
    }
}
