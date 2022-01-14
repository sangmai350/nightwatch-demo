const { client } = require("nightwatch-api");
const BasePage = require("./base.page");

class RegisterPage extends BasePage {
  url = "https://demo.guru99.com";
  emailId = "input[name='emailid']";
  submitButton = "input[name='btnLogin']";
  userId = "//td[contains(.,'User ID :')]/following-sibling::td";
  password = "//td[contains(.,'Password :')]/following-sibling::td";
  gdprIframe = "#gdpr-consent-notice";
  acceptButton = "#save"

  load() {
    return client.url(this.url);
  }

  acceptPrivacy() {
    client.waitForElementVisible(this.gdprIframe, 10000, false, function () {
      return client.frame('gdpr-consent-notice')
        .waitForElementVisible(this.acceptButton)
        .click(this.acceptButton)
        .frameParent()
    })
  }

  inputEmail(email) {
    return client
      .waitForElementVisible(this.emailId)
      .setValue(this.emailId, email);
  }

  submit() {
    return client.click(this.submitButton);
  }

  async getLoginInfo() {
    let login = {};
    client.waitForElementVisible("xpath", this.userId);
    await client.getText("xpath", this.userId, function (res) {
      login.userId = res.value;
    });
    await client.getText("xpath", this.password, function (res) {
      login.pwd = res.value;
    });
    return login;
  }
}
module.exports = RegisterPage;
