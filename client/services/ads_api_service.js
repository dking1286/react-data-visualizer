/* eslint no-use-before-define: 0 */
/* eslint no-param-reassign: 0 */

export default {
  get(endpoint, httpRequest = new XMLHttpRequest()) {
    return new Promise((resolve, reject) => {
      const url = validEndpoints[endpoint];

      if (!url) return reject(new Error('Invalid API endpoint provided'));

      httpRequest.onload = onHttpResponse(resolve, reject, httpRequest);
      httpRequest.onerror = onHttpError(resolve, reject, httpRequest);

      httpRequest.open('GET', url);
      httpRequest.send();
    });
  },
};

export const API_URL = 'http://localhost:3000';

export const apiEndpoint = route => API_URL + route;

export const validEndpoints = {
  ads: apiEndpoint('/ads'),
  ads_metrics: apiEndpoint('/ads_metrics'),
};

export const onHttpResponse = (resolve, reject, httpRequest) => (response) => {
  if (httpRequest.status !== 200) {
    const errorMessage = `Response status code was ${httpRequest.status}, not 200`;
    return reject(new Error(errorMessage));
  }

  let responseData;
  try {
    responseData = JSON.parse(httpRequest.responseText);
    return resolve(responseData);
  } catch (err) {
    return reject(err);
  }
};

export const onHttpError = (resolve, reject, httpRequest) => (error) =>
    reject(error);

