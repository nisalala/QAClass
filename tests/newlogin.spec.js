import {test, expect} from '@playwright/test';
import {LoginPage} from '../pageobject/login.po.js';
const testData = require('../fixtures/loginFixture.json')

test.beforeEach(async ({page})=>{
    //config file ma halera url call hunxa '/' halyo vane
    await page.goto('/');
})

test.describe('Valid login tests',()=>{
    test('Login using valid username and password',async({page})=>{
        const login = new LoginPage(page);
        await login.login(testData.validUser.userName,testData.validUser.password);
        await login.verifyValidLogin();
        
    });
})

test.describe('Invalid login test',()=>{
        test('Login using invalid username and valid password',async({page})=>{
        const login = new LoginPage(page);
        await login.login(testData.invalidUser.userName,testData.validUser.password);
        await login.verifyInvalidLogin();
});

    test('Login using invalid username and invalid password',async({page})=>{
        const login = new LoginPage(page);
        await login.login(testData.invalidUser.password, testData.invalidUser.password);
        await login.verifyInvalidLogin();
});
})