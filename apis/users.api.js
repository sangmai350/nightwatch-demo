const { default: axios } = require('axios');
const { client } = require('nightwatch-api');
const BaseAPI = require('./base.api');


class UsersAPI extends BaseAPI {
  constructor() {
    super();
    this._users = "/users";
  }

  async queryCustomerFromDB(userId) {
    try {
      let mssql = await this.connectToMSSql();
      let result = await mssql.request().query(`select * from dbo.Customers where CustomerID = ${userId}`);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getUsersById(userId) {
    try {
      const _url = `${this._users}/${userId}`;
      const response = await axios.get(_url);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(userInfo) {
    try {
      const response = await axios.post(this._users, userInfo);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(userInfo, userId) {
    try {
      const _url = `${this._users}/${userId}`;
      const response = await axios.put(_url, userInfo);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = UsersAPI;
