import { setWorldConstructor } from "@wdio/cucumber-framework";

class CustomWorld {
    testid: string
    appid: string
    constructor() {
        this.appid = "",
        this.testid = ""
    }
}
setWorldConstructor(CustomWorld)