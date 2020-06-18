import axios from "axios";

export async function apiRequest({requestData, mutations, commit}) {
  const {url, queries = {}} = requestData
  const {preCommit, successCommit, errorCommit} = mutations

  const queryParams = Object.keys(queries).map(key => `${key}=${encodeURIComponent(queries[key])}`).join('&')

  return new Promise((resolve, reject) => {
    commit(preCommit);
    return axios
      .get(`${url}?${queryParams}`)
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