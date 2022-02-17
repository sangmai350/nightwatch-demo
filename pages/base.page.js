const { client } = require("nightwatch-api");

class BasePage {
  constructor() {
    if (this.constructor === BasePage) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }
}
module.exports = BasePage;
