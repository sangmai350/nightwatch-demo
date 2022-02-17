const { client } = require("nightwatch-api");
const env = require("../env/api.ENV");
const { default: axios } = require("axios");
const sql = require("mssql");

// config for your database
const config = {
  user: "sa",
  password: "Abcd123@",
  server: "localhost",
  database: "master",
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};
class BaseAPI {
  constructor() {
    if (this.constructor === BaseAPI) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this._baseUrl = env.baseUrl;
    axios.defaults.baseURL = this._baseUrl;
  }

  async connectToMSSql() {
    sql.on("error", (err) => {
      console.log(err);
    });
    return await sql.connect(config);
  }
}
module.exports = BaseAPI;
