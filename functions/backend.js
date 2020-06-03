require('dotenv').config();
const axios = require('axios');

exports.handler = function (event, context, callback) {
  const url = 'http://bante-loadb-4u6ir1e2setb-1808666837.us-east-1.elb.amazonaws.com/api/v1/genres/';
  
  axios.get(url)
    .then(json => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(json.data)
      });
    })
    .catch(ex => callback(ex));
}
