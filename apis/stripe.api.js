const { client } = require("nightwatch-api");
const BaseAPI = require("./base.api");
const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51KU1acIvbJ9a6oEiiwtY7XTNvHapgfJorJPMDOIWWLWJGYk0I8FT2l0Rr00FVDpzmHbwQbFrt1m62bq6FH6lEI6200prQo2Kv5"
);

class StripeAPI extends BaseAPI {
  constructor() {
    super();
  }

  async stripeTest() {
    try {
      const customer = await stripe.customers.create({
        email: "customer@example.com",
      });
      return {
        status: customer.lastResponse.statusCode,
        statusMessage: customer.lastResponse.statusMessage,
        serverName: customer.lastResponse.servername,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = StripeAPI;
