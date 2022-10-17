import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://siva-pep-neudesic-api.azurewebsites.net";

class LocationApi {
  static token;

  // Axios request Method
  static async request(endpoint, data = {}, method = "get") {
    // console.log("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${LocationApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.log("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // ROUTES:

  /*  Get all of the location from server */

  static async getAlllocations() {
    let res = await this.request(`api/locations`);
    return res;
  }

  /* Post a new location */

  static async postAlocation(data) {
    let res = await this.request(`api/locations`, data, "post");
    return res;
  }

  /* Get the current user */

  static async getCurrentUser(username) {
    let res = await this.request(`api/users/${username}`);
    return res;
  }

  /** Get the token for login from username and password */

  static async login(data) {
    let res = await this.request(`api/auth/token`, data, "post");
    return res.token;
  }

  /** Signup for the site */

  static async signup(data) {
    let res = await this.request(`api/auth/register`, data, "post");
    return res.token;
  }

  /** Edit a User's data */

  static async editUser(data) {
    let res = await this.request(`api/users/${data.email}`, data, "patch");
    return res;
  }
}

export default LocationApi;
