const { client } = require("nightwatch-api");
const env = require("../env/api.ENV");
const { default: axios } = require("axios");
const sql = require("mssql/msnodesqlv8");

class BaseAPI {
  constructor() {
    if (this.constructor === BaseAPI) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this._baseUrl = env.baseUrl;
    axios.defaults.baseURL = this._baseUrl;
  }

  async connectToMSSql() {
    const config = {
      driver: "msnodesqlv8",
      connectionString:
        "Driver={SQL Server Native Client 11.0};Server={localhost};Database={MMABooks};Trusted_Connection={yes}",
    };
    return await new sql.connect(config);
  }
}
module.exports = BaseAPI;
