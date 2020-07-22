import axios from 'axios';

axios.defaults.withCredentials = true;

export default async function apiRequest({ requestData, mutations, commit }) {
  const {
    url, queries = {}, method = 'GET', data = {},
  } = requestData;
  const { preCommit, successCommit, errorCommit } = mutations;

  const queryParams = Object.keys(queries).map((key) => `${key}=${encodeURIComponent(queries[key])}`).join('&');

  return new Promise((resolve, reject) => {
    commit(preCommit);
    return axios({
      url: `${url}${queryParams ? `?${queryParams}` : ''}`,
      method,
      data,
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        commit(successCommit, response.data);
        resolve(response.data.original);
      } else {
        reject(response);
      }
    }).catch((error) => {
      const errorMessage = error?.response?.data?.message || 'We were unable to authenticate you, please contact support.';
      commit(errorCommit, errorMessage);
      reject(errorMessage);
    });
  });
}
