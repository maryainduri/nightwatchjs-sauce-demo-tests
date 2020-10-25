describe('Sauce labs demo ui tests', function () {

    before(browser =>
        browser.url('https://www.saucedemo.com/')
            .waitForElementVisible('body')
            .assert.titleContains('Swag Labs')
            .assert.visible('#user-name')
    );

    test('Sauce Demo login and logout with standard login details', function (browser) {
        browser
            .setValue('#user-name', 'standard_user')
            .assert.visible('#password')
            .setValue('#password', 'secret_sauce')
            .assert.visible('#login-button')
            .click('#login-button')
            .useXpath()
            .click('//button[contains(text(),\'Open Menu\')]')
            .useCss()
            .assert.visible('#logout_sidebar_link')
            .click('#logout_sidebar_link')
            .assert.visible('#user-name')
    });

    test('Sauce Demo login and logout with LockedOut login details', function (browser) {
        browser
            .setValue('#user-name', 'locked_out_user')
            .assert.visible('#password')
            .setValue('#password', 'secret_sauce')
            .assert.visible('#login-button')
            .click('#login-button')
            .assert.visible('h3[data-test=\'error\']')
            .assert.containsText("h3[data-test='error']", "Sorry, this user has been locked out.");
    });

    after(browser => browser.end());
});