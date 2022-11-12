const { test, expect, chromium } = require('@playwright/test');
const { PlaywrightDevPage } = require('../pages/homework12');
const config = require('../config/config');
const credentials = config.credentials;

test.use({ headless: false });

test.describe('Homework 12', async () => {

  test('Web site should exists', async ({ page }) => {
    const playwrightDev = new PlaywrightDevPage(page);
    await playwrightDev.goto("books");
    await expect(await playwrightDev.getTitle()).toBe('ToolsQA');
  });

  test('Button "Login" on main page should open login form', async ({ page }) => {
    const playwrightDev = new PlaywrightDevPage(page);
    await playwrightDev.goto("books");
    await playwrightDev.openLoginForm();
    await expect(page).toHaveURL('https://demoqa.com/login');
    await expect(playwrightDev.loginButton).toBeVisible();

  });

  test('Button "Login" on login form should log in', async ({ page }) => {
    const playwrightDev = new PlaywrightDevPage(page);
    await playwrightDev.goto('login');
    await playwrightDev.logIn(credentials.login, credentials.password);
    await expect(page).toHaveURL('https://demoqa.com/profile');
    await expect(playwrightDev.logoutButton).toBeVisible();
  });

  test('Button "Logout" on profile form should log out', async ({ page }) => {
    const playwrightDev = new PlaywrightDevPage(page);
    await playwrightDev.goto('login');
    await playwrightDev.logIn(credentials.login, credentials.password);
    await playwrightDev.logOut();
    await expect(page).toHaveURL('https://demoqa.com/login');
    await expect(playwrightDev.loginButton).toBeVisible();
  });

  test('\"What\" tab should be active by default', async({ page }) => {
    const playwrightDev = new PlaywrightDevPage(page);
    await playwrightDev.goto('tabs');
    await expect(playwrightDev.tabWhat).toHaveClass('nav-item nav-link active')
  });

  test('Should switch from the default tab to the \"Origin\" tab', async({ page }) => {
    const playwrightDev = new PlaywrightDevPage(page);
    await playwrightDev.goto('tabs');
    await playwrightDev.switchTab();
    await expect(playwrightDev.tabWhat).toHaveClass('nav-item nav-link');
    await expect(playwrightDev.tabOrigin).toHaveClass('nav-item nav-link active');
  })

});
