Feature('Homework 13');
const { expect } = require('@playwright/test');
const pageObject = require('../pages/homework13');

Scenario('Web site should exists', async (I) => {
    await pageObject.goto('books');
    I.seeInTitle('ToolsQA')
});

Scenario('Button "Login" on main page should open login form', async (I) => {
    await pageObject.goto('books');
    await pageObject.openLoginForm();
    I.seeInCurrentUrl('https://demoqa.com/login');
    I.seeElement(pageObject.selectors.loginButton);
});

Scenario('Button "Login" on login form should log in', async (I) => {
    await pageObject.goto('login');
    await pageObject.logIn();
    I.seeInCurrentUrl('https://demoqa.com/books');
    I.seeElement(pageObject.selectors.logoutButton);
  });

  Scenario('Button "Logout" on profile form should log out', async (I) => {
    await pageObject.goto('login');
    await pageObject.logIn();
    await pageObject.logOut();
    I.seeInCurrentUrl('https://demoqa.com/login');
    I.seeElement(pageObject.selectors.loginButton);
  });

  Scenario('\"What\" tab should be active by default', async (I) => {
    await pageObject.goto('tabs');
    I.seeElement(pageObject.selectors.tabWhat);
    I.seeAttributesOnElements(pageObject.selectors.tabWhat, {class: 'nav-item nav-link active'});
  });

  Scenario('Should switch from the default tab to the \"Origin\" tab', async (I) => {
    await pageObject.goto('tabs');
    await pageObject.switchTab();
    I.seeAttributesOnElements(pageObject.selectors.tabWhat, {class: 'nav-item nav-link'});
    I.seeAttributesOnElements(pageObject.selectors.tabOrigin, {class: 'nav-item nav-link active'});
  });
