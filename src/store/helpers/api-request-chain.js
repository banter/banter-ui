import axios from 'axios';
import API from '../../constants/api';

axios.defaults.withCredentials = true;

function getAnonymousSessionId() {
  return window.localStorage.getItem('banter-temporary-login-id');
}

function setAnonymousSessionId(id) {
  window.localStorage.setItem('banter-temporary-login-id', id);
}

function loginAnon(anonId) {
  const data = anonId === undefined ? {} : { id: anonId };
  const url = `${API.BASE_URL}${API.USERS}${API.LOGIN_ANON}`;
  return axios.post(url, data)
    .then((response) => {
      console.log(response);
      setAnonymousSessionId(response.data.id);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default async function apiRequestChain({
  requestData, mutations, commit,
}) {
  const {
    url, queries = {}, method = 'GET', data = {},
  } = requestData;
  const { preCommit, successCommit, errorCommit } = mutations;
  //   const { errorDispatch } = dispatch;
  const queryParams = Object.keys(queries).map((key) => `${key}=${encodeURIComponent(queries[key])}`).join('&');

  return new Promise((resolve, reject) => {
    commit(preCommit);
    return axios({
      url: `${url}${queryParams ? `?${queryParams}` : ''}`,
      method,
      data,
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        commit(successCommit, response?.data);
        resolve(response.data.original);
      } else {
        reject(response);
      }
    }).catch((error) => {
      const errorMessage = error?.response?.data?.message || 'We were unable to authenticate you, please contact support.';
      commit(errorCommit, error.response.status === 401 ? '' : errorMessage);
      const anonId = getAnonymousSessionId();
      reject(errorMessage);
      loginAnon(anonId);
    });
  });
}
