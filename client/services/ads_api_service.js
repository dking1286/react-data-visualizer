export const API_URL = 'http://localhost:3000';

export const apiEndpoint = route => API_URL + route;

export const validEndpoints = {
  ads: apiEndpoint('/ads'),
  ads_metrics: apiEndpoint('/ads_metrics'),
};

export const onHttpResponse = (resolve, reject) => (response) => {
  if (response.status !== 200) {
    return reject(
      new Error(`Response status code was ${response.status}, not 200`)
    );
  }

  let responseData;
  try {
    responseData = JSON.parse(response.responseText);
    return resolve(responseData);
  } catch (err) {
    return reject(err);
  }
};

export const onHttpError = (resolve, reject) => (error) => {
  return reject(error);
};

export default {
  get: (endpoint, httpRequest) => {
    return new Promise((resolve, reject) => {
      const url = validEndpoints[endpoint];

      if (!url) return reject(new Error('Invalid API endpoint provided'));

      httpRequest.onload = onHttpResponse(resolve, reject);
      httpRequest.onerror = onHttpError(resolve, reject);

      httpRequest.open('GET', url);
      return httpRequest.send();
    });
  },
};
