const { client } = require("nightwatch-api");
const BaseAPI = require("./base.api");
const env = require("../env/api.ENV");
const { default: axios } = require("axios");

class LobAPI extends BaseAPI {
  constructor() {
    super();
    this.baseURL = env.lobBaseUrl;
  }

  async sendPOSTRequestToLob(path, data) {
    var config = {
      method: "post",
      url: `${this.baseURL}${path}`,
      auth: {
        username: env.LOB_API_KEY,
        password: "",
      },
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    try {
      const url = `${this.baseURL}${path}`;
      this.response = await axios(config);
      return this.response;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = LobAPI;
