const { client } = require("nightwatch-api");
const { default: axios } = require("axios");
const sql = require("mssql/msnodesqlv8");
const expect = require("chai").expect;

class BaseAPI {
  response;
  constructor() {
    if (this.constructor === BaseAPI) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  async connectToMSSql() {
    const config = {
      driver: "msnodesqlv8",
      connectionString:
        "Driver={SQL Server Native Client 11.0};Server={localhost};Database={MMABooks};Trusted_Connection={yes}",
    };
    return await new sql.connect(config);
  }

  async sendGETRequest(_url) {
    try {
      this.response = await axios.get(_url);
      return this.response;
    } catch (error) {
      console.error(error);
    }
  }

  async verifyStatusCode(resCode) {
    const actualStatusCode = this.response.status.toString();
    expect(resCode).equal(
      actualStatusCode,
      `${resCode} is not equal with ${actualStatusCode}`
    );
  }
}

module.exports = BaseAPI;
