const { test, expect, chromium } = require('@playwright/test');
const config = require('../config/config');
const credentials = config.credentials;
const selectors = config.selectors;

let page, browser, context;

test.describe('Homework 11', async () => {

  test.beforeEach(async () => {
    browser = await chromium.launch({
      headless: false,
      slowMo: 2000,
    });
    context = await browser.newContext();
    page = await context.newPage('https://demoqa.com/books');
  });

  test.afterEach(async () => {
    browser.close();
  });

  test('Should exists', async () => {
    await page.goto('https://demoqa.com/books');
    const title = await page.title();
    await expect(title).toBe('ToolsQA')
  });

  test('Should open login form', async () => {
    await page.goto('https://demoqa.com/books');
    await page.click(selectors.loginButton);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://demoqa.com/login')
  });

  test('Should log in', async() => {
    await page.goto('https://demoqa.com/login');
    await page.locator(selectors.login).fill(credentials.login);
    await page.locator(selectors.password).fill(credentials.password);
    await page.click(selectors.loginButton);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://demoqa.com/profile')
  });

  test('\"What\" tab should be active by default', async() => {
    await page.goto('https://demoqa.com/tabs');
    await expect(page.locator(selectors.tabWhat)).toHaveClass('nav-item nav-link active')
  });

  test('should switch from the default tab to the \"Origin\" tab', async() => {
    await page.goto('https://demoqa.com/tabs');
    await page.click(selectors.tabOrigin);
    await page.waitForLoadState('networkidle');
    await expect(page.locator(selectors.tabWhat)).toHaveClass('nav-item nav-link');
    await expect(page.locator(selectors.tabOrigin)).toHaveClass('nav-item nav-link active');
  })
});