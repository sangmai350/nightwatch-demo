const { client } = require("nightwatch-api");
const expect = require("chai").expect;
const BasePage = require("./base.page");

class LoginPage extends BasePage {
  url = "https://demo.guru99.com/v4";
  userId = "input[name='uid']";
  password = "input[name='password']";
  loginButton = "input[name='btnLogin']";
  welcomeText = ".heading3 td";

  load() {
    return client.url(this.url);
  }

  inputUserId(userId) {
    return client
      .waitForElementVisible(this.userId)
      .setValue(this.userId, userId);
  }

  inputPassword(password) {
    return client
      .waitForElementVisible(this.password)
      .setValue(this.password, password);
  }

  submit() {
    return client.click(this.loginButton);
  }

  loginWithUserAndPassword(user, pass) {
    this.inputUserId(user);
    this.inputPassword(pass);
    return this.submit();
  }

  async verifyWelcomeScreenIsDisplay(userId) {
    let actualText;
    let expectedText = `Manger Id : ${userId}`;
    client.waitForElementVisible(this.welcomeText);
    await client.getText(this.welcomeText, function (res) {
      actualText = res.value;
    });
    expect(actualText).equal(
      expectedText,
      `${actualText} is not equal with ${expectedText}`
    );
  }
}
module.exports = LoginPage;
