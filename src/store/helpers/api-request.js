import axios from 'axios';

axios.defaults.withCredentials = true;

export default async function apiRequest({
  requestData, actions = {}, mutations = {}, commit, dispatch,
}) {
  const {
    url, queries = {}, method = 'GET', data = {},
  } = requestData;
  const { preCommit, successCommit, errorCommit } = mutations;
  const { successDispatch, errorDispatch } = actions;

  const queryParams = Object.keys(queries).map((key) => `${key}=${encodeURIComponent(queries[key])}`).join('&');

  return new Promise((resolve, reject) => {
    if (preCommit) commit(preCommit);

    return axios({
      url: `${url}${queryParams ? `?${queryParams}` : ''}`,
      method,
      data,
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        if (commit && successCommit) commit(successCommit, response?.data);
        if (dispatch && successDispatch) dispatch(successDispatch);

        resolve(response.data.original);
      } else {
        reject(response);
      }
    }).catch((error) => {
      const errorMessage = error?.response?.data?.message || 'We were unable to authenticate you, please contact support.';

      if (commit && errorCommit) commit(errorCommit, error?.response?.status === 401 ? '' : errorMessage);
      if (dispatch && errorDispatch) dispatch(errorDispatch);

      reject(errorMessage);
    });
  });
}
