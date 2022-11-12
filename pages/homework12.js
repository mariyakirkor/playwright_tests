const { expect, chromium } = require('@playwright/test');

exports.PlaywrightDevPage = class PlaywrightDevPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.loginInput = page.locator('input[id=userName]');
    this.passwordInput = page.locator('input[id=password]');
    this.loginButton = page.locator('button[id=login]');
    this.logoutButton = page.locator('role=button[name="Log out"]')
    this.searchInput = page.locator('input[id=searchBox]');
    this.tabWhat = page.locator('a[id=demo-tab-what]');
    this.tabOrigin = page.locator('a[id=demo-tab-origin]');
  }

  async goto(section) {
    await this.page.goto('https://demoqa.com/' + section);
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(){
    return await this.page.title();
  }

  async openLoginForm() {
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async logIn(login, password) {
    await expect(this.loginInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async logOut() {
    await expect(this.logoutButton).toBeVisible();
    await this.logoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async switchTab() {
    await expect(this.tabWhat).toBeVisible();
    await expect(this.tabWhat).toHaveClass('nav-item nav-link active');
    await this.tabOrigin.click();
  }
}