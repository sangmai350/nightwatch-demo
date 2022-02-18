const { Given, Then, When } = require("@cucumber/cucumber");
const LobAPI = require("../../apis/lob.api");
const expect = require("chai").expect;
this.browser = new LobAPI();
When("Send GET request to API {string}", async (url) => {
  return await this.browser.sendGETRequest(url);
});

Given("Send POST to Lob API with path {string}", async (url, table) => {
  return await this.browser.sendPOSTRequestToLob(url, table.rowsHash());
});

Then("I get response from Lob API", async (table) => {
  const expectedResult = table.rowsHash();
  const actualResult = this.browser.response.data;
  expect(actualResult).to.include(
    expectedResult,
    `${actualResult} is not equal with ${expectedResult}`
  );
});

Then("I get response code from API is {string}", async (resCode) => {
  return this.browser.verifyStatusCode(resCode);
});
