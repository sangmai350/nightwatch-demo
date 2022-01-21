const { client } = require('nightwatch-api');
const env = require("../env/api.ENV");
const { default: axios } = require('axios');

class BaseAPI {

  constructor() {
    if (this.constructor === BaseAPI) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this._baseUrl = env.baseUrl;
    axios.defaults.baseURL = this._baseUrl;
  }

}
module.exports = BaseAPI;
