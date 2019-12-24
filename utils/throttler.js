const Bottleneck = require('bottleneck');
const axios = require('axios');

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 10000  // one request per 10 seconds
});

const axiosSetCookie = (cookie) => {
  return async (url, responseType = 'json') => {
    const axiosConfig = {
      headers: {
        'Cookie': cookie,
        'Referer': 'https://frontendmasters.com'
      },
      method: 'get',
      url,
      responseType,
    }
    return axios(axiosConfig);
  };
}

module.exports = { axiosSetCookie, limiter };