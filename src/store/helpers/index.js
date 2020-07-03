import axios from "axios";

export async function apiRequest({requestData, mutations, commit}) {
  const {url, queries = {}, method = 'GET', headers = {withCredentials: true}} = requestData
  const {preCommit, successCommit, errorCommit} = mutations

  const queryParams = Object.keys(queries).map(key => `${key}=${encodeURIComponent(queries[key])}`).join('&')
  const httpRequest = determineVerb(method)
  
  return new Promise((resolve, reject) => {
    commit(preCommit);
    return httpRequest(`${url}${queryParams ? `?${queryParams}` : ''}`, headers)
      .then(response => {
        if (response.status === 200) {
          commit(successCommit, response.data);
          resolve(response.data.original);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        commit(errorCommit, error);
        reject(error);
      });
  });
}

function determineVerb(method) {
  switch(method) {
    case 'POST':
      return axios.post;
    case 'GET':
      return axios.get;
    case 'PUT':
      return axios.put;
    default:
      return axios.get;
  }
}