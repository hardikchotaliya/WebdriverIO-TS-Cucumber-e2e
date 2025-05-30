import { $, expect } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get flashAlert() {
        return $('#flash');
    }

    /* Page Actions */
    public async checkFlashMessage(message: string) {
        await expect(this.flashAlert).toBeExisting();
        const flashText = await this.flashAlert.getText();
        // Remove the × character and trim whitespace
        const cleanText = flashText.replace('×', '').trim();
        expect(cleanText).toBe(message);
    }
}

export default new SecurePage();
