/* eslint no-use-before-define: 0 */
/* eslint no-param-reassign: 0 */

export default {
  get: endpoint => getTestable(endpoint, new XMLHttpRequest()),
};

export const getTestable = (endpoint, httpRequest) => new Promise((resolve, reject) => {
  const url = validEndpoints[endpoint];

  if (!url) return reject(new Error('Invalid API endpoint provided'));

  httpRequest.onload = onHttpResponse(resolve, reject);
  httpRequest.onerror = onHttpError(resolve, reject);

  httpRequest.open('GET', url);
  return httpRequest.send();
});

export const API_URL = 'http://localhost:3000';

export const apiEndpoint = route => API_URL + route;

export const validEndpoints = {
  ads: apiEndpoint('/ads'),
  ads_metrics: apiEndpoint('/ads_metrics'),
};

export const onHttpResponse = (resolve, reject) => (response) => {
  if (response.status !== 200) {
    const errorMessage = `Response status code was ${response.status}, not 200`;
    return reject(new Error(errorMessage));
  }

  let responseData;
  try {
    responseData = JSON.parse(response.responseText);
    return resolve(responseData);
  } catch (err) {
    return reject(err);
  }
};

export const onHttpError = (resolve, reject) => (error) => reject(error);

