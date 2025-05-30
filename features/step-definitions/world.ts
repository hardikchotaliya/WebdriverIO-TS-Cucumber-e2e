import { setWorldConstructor } from "@wdio/cucumber-framework";

class CustomWorld {
    appid: string;
    testid: string; // add any properties that you need
    owner: string
    constructor() {
        this.appid = "",
        this.testid = "",
        this.owner = "" // initialize the properties with default values
    }
}
setWorldConstructor(CustomWorld) // set the custom world as the default world