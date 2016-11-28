const API_URL = 'http://localhost:3000';

function apiEndpoint(route) {
  return API_URL + route;
}


const AdsAPIService = {
  get: (endpoint) => {
    return new Promise((resolve, reject) => {
      const url = AdsAPIService.validEndpoints[endpoint];

      if (!url) return reject(new Error('Invalid API endpoint provided'));

      const xhr = new XMLHttpRequest();
      xhr.onload = AdsAPIService.onHttpResponse(resolve, reject);
      xhr.onerror = AdsAPIService.onHttpError(resolve, reject);

      xhr.open('GET', url);
      return xhr.send();
    });
  },

  onHttpResponse: (resolve, reject) => (response) => {
    let responseData;
    try {
      responseData = JSON.parse(response.responseText);
      return resolve(responseData);
    } catch (err) {
      return reject(err);
    }
  },

  onHttpError: (resolve, reject) => (event) => {

  },

  validEndpoints: {
    ads: apiEndpoint('/ads'),
    ads_metrics: apiEndpoint('/ads_metrics'),
  },
};

export default AdsAPIService;
