const Bottleneck = require('bottleneck');
const axios = require('axios');

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 600000  // one request per 10 mins (60s * 10)
});

const axiosSetCookie = (cookie) => {
  return async (url, responseType = 'json') => {
    const axiosConfig = {
      headers: {
        'Cookie': cookie,
        'Referer': 'https://frontendmasters.com',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0'
      },
      method: 'get',
      url,
      responseType,
    }
    return axios(axiosConfig);
  };
}

module.exports = { axiosSetCookie, limiter };
