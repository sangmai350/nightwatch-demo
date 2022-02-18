const { Given, Then, When } = require("@cucumber/cucumber");
const UsersAPI = require("../../apis/users.api");
const expect = require("chai").expect;
let userId, customerQuery;
this.browser = new UsersAPI();

When("Send GET single user with id {string}", async (userId) => {
  return await this.browser.getUsersById(userId);
});

Then("I get response from server", async (table) => {
  const expectedResult = table.rowsHash();
  const actualResult = this.browser.response.data;
  expect(actualResult).to.include(
    expectedResult,
    `${actualResult} is not equal with ${expectedResult}`
  );
});

Then("I get response from request", async (table) => {
  const expectedResult = table.rowsHash();
  const actualResult = this.browser.response.data.data;
  expect(actualResult).to.include(
    expectedResult,
    `${actualResult} is not equal with ${expectedResult}`
  );
});

Then("Get UserId from response", async () => {
  return (userId = this.browser.response.data.id);
});

When("Send POST user with", async (table) => {
  const userPayload = table.rowsHash();
  return await this.browser.createUser(userPayload);
});

When("Send PUT user with", async (table) => {
  const userPayload = table.rowsHash();
  return await this.browser.updateUser(userPayload, userId);
});

When("Send GET single user with id from response", async () => {
  const currentUserId = res.data.id;
  return await this.browser.getUsersById(currentUserId);
});

When("Query Customer Details with CustomerId {string}", async (customerId) => {
  customerQuery = await this.browser.queryCustomerFromDB(customerId);
});

Then("I get response from Database", async (table) => {
  const expectedResult = table.rowsHash();
  const actualResult = customerQuery.recordset[0];
  expect(expectedResult).to.deep.equal(
    actualResult,
    `${actualResult} is not equal with ${expectedResult}`
  );
});

Then("I get response code is {string}", async (resCode) => {
  return this.browser.verifyStatusCode(resCode);
});
