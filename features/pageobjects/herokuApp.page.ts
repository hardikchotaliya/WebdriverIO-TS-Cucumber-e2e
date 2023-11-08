import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HerokuAppPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get flashAlert () { return $('#flash'); }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    openHerokuapp (page?: string) {
        return super.openHerokuapp(page);
    }
}

export default new HerokuAppPage();
