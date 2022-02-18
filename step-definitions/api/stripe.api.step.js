const { Given, Then, When } = require("@cucumber/cucumber");
const StripeAPI = require("../../apis/stripe.api");
const expect = require("chai").expect;
this.browser = new StripeAPI();
let res;

When("Send request to Stripe", async () => {
  res = await this.browser.stripeTest();
});

Then("I get response code from Stripe is {string}", async (resCode) => {
  const actualStatusCode = res.status.toString();
  expect(resCode).equal(
    actualStatusCode,
    `${resCode} is not equal with ${actualStatusCode}`
  );
});

Then("I get response from Stripe", async (table) => {
  const expectedResult = table.rowsHash();
  const actualResult = res;
  console.log(expectedResult);
  console.log(actualResult);
  expect(actualResult).to.include(
    expectedResult,
    `${actualResult} is not equal with ${expectedResult}`
  );
});
