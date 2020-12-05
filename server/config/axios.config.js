const axios = require('axios');
const config = require("./config.json")[process.env.NODE_ENV || "development"];

const axiosConfig = (env) => {
  axios.defaults.baseURL = `http://localhost:${config.port}`;
};

module.exports = axiosConfig;
