const { Given, Then, When } = require("@cucumber/cucumber");
const RegisterPage = require("../../pages/register.page");
const LoginPage = require("../../pages/login.page");

let loginInfo = {};
Given("I open Register site", async () => {
  this.browser = new RegisterPage();
  return this.browser.load();
  return await this.browser.acceptPrivacy();
});

When("I input the email {string}", async (email) => {
  this.browser.inputEmail(email);
  return this.browser.submit();
});

Then("I get UserId and Password", async () => {
  loginInfo = await this.browser.getLoginInfo();
  console.log(loginInfo);
});

Then("I go to Login page", async () => {
  this.browser = new LoginPage();
  return this.browser.load();
});

When("I input the login info", async () => {
  console.log(loginInfo);
  return this.browser.loginWithUserAndPassword(loginInfo.userId, loginInfo.pwd);
});

Then("Verify Welcome screen is displayed", async () => {
  return this.browser.verifyWelcomeScreenIsDisplay(loginInfo.userId);
});
