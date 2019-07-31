'use strict';

module.exports.noCors = async (event) => {
  console.info("GET /no-cors");
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'You should not see this via a CORS request.',
      input: event,
    }, null, 2),
  };
};


module.exports.simpleCors = async (event) => {
  const allowedOrigins = process.env.origins;
  const method = event.httpMethod;
  const requestOrigin = event.headers.origin || event.headers.Origin;
  console.log('allowedOrigins:', allowedOrigins);
  console.log('requestOrigin', requestOrigin);
  console.info("GET /simple-cors");
  let headers;
  if (allowedOrigins.includes(requestOrigin)) {
    headers = {
      'Access-Control-Allow-Origin': requestOrigin,
      'Access-Control-Allow-Credentials': true,
    };
  }

  if (method == 'HEAD') {
    return {
      statusCode: 204,
      headers
    };
  }
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: `Simple CORS requests are working. ${method}`,
      input: event,
    }, null, 2),
  };
};
