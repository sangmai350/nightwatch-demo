const { Given, Then, When } = require("@cucumber/cucumber");
const UsersAPI = require("../../apis/users.api");
const expect = require("chai").expect;

let usersResponse, userId, customerQuery;
this.browser = new UsersAPI();

When("Send GET single user with id {string}", async (userId) => {
  usersResponse = await this.browser.getUsersById(userId);
});

Then("I get response code is {string}", async (resCode) => {
  const actualStatusCode = usersResponse.status.toString();
  expect(resCode).equal(
    actualStatusCode,
    `${resCode} is not equal with ${actualStatusCode}`
  );
});

Then("I get response from server", async (table) => {
  const expectedResult = table.rowsHash();
  const actualResult = usersResponse.data.data;
  expect(expectedResult).to.deep.equal(
    expectedResult,
    `${actualResult} is not equal with ${expectedResult}`
  );
});

Then("Get UserId from response", async () => {
  return (userId = usersResponse.data.id);
});

When("Send POST user with", async (table) => {
  const userPayload = table.rowsHash();
  usersResponse = await this.browser.createUser(userPayload);
});

When("Send PUT user with", async (table) => {
  const userPayload = table.rowsHash();
  usersResponse = await this.browser.updateUser(userPayload, userId);
});

When("Send GET single user with id from response", async () => {
  const currentUserId = usersResponse.data.id;
  usersResponse = await this.browser.getUsersById(currentUserId);
});

When("Query Customer Details with CustomerId {string}", async (customerId) => {
  customerQuery = await this.browser.queryCustomerFromDB(customerId);
});

Then("I get response from Database", async (table) => {
  const expectedResult = table.rowsHash();
  const actualResult = customerQuery.recordset[0];
  expect(expectedResult).to.deep.equal(
    expectedResult,
    `${actualResult} is not equal with ${expectedResult}`
  );
});