const { default: axios } = require("axios");
const { client } = require("nightwatch-api");
const BaseAPI = require("./base.api");
const env = require("../env/api.ENV");

class UsersAPI extends BaseAPI {
  constructor() {
    super();
    this._users = `${env.userBaseUrl}/users`;
  }

  async queryCustomerFromDB(userId) {
    try {
      let mssql = await this.connectToMSSql();
      let result = await mssql
        .request()
        .query(`select * from dbo.Customers where CustomerID = ${userId}`);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getUsersById(userId) {
    try {
      const _url = `${this._users}/${userId}`;
      this.response = await axios.get(_url);
      return this.response;
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(userInfo) {
    try {
      this.response = await axios.post(this._users, userInfo);
      return this.response;
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(userInfo, userId) {
    try {
      const _url = `${this._users}/${userId}`;
      this.response = await axios.put(_url, userInfo);
      return this.response;
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = UsersAPI;
