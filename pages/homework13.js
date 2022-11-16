const { I } = inject();

module.exports = {

  // setting locators
  selectors: {
    loginInput: 'input[id=userName]',
    passwordInput: 'input[id=password]',
    loginButton: 'button[id=login]',
    logoutButton: 'role=button[name="Log out"]',
    search: 'input[id=searchBox]',
    tabWhat: 'a[id=demo-tab-what]',
    tabOrigin: 'a[id=demo-tab-origin]'
  },
  credentials: {
    login: 'mariyakirkor',
    password: '1234Qwe!',
  },

  // introducing methods
  async goto(section) {
    await I.amOnPage('https://demoqa.com/' + section);
  },

  async openLoginForm() {
    await I.waitForVisible(this.selectors.loginButton);
    await I.click(this.selectors.loginButton);
  },

  async logIn() {
    await I.waitForVisible(this.selectors.loginInput);
    await I.waitForVisible(this.selectors.passwordInput);
    await I.fillField(this.selectors.loginInput, this.credentials.login);
    await I.fillField(this.selectors.passwordInput, this.credentials.password);
    await I.click(this.selectors.loginButton);
  },

  async logOut() {
    await I.waitForVisible(this.selectors.logoutButton);
    await I.click(this.selectors.logoutButton);
  },

  async switchTab() {
    await I.waitForVisible(this.selectors.tabWhat);
    I.seeAttributesOnElements(this.selectors.tabWhat, { class: 'nav-item nav-link active' });
    await I.click(this.selectors.tabOrigin);
  }
}