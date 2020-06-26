const STATUS_CODES = require('./status-codes').STATUS_CODES;

//expects original event triggered by api gateway
exports.getQueryParameter = function (parameter, event) {
  return ((event.queryStringParameters || {})[parameter]);
}

exports.prepareLambdaResponse = function (body, statusCode, headers = {}) {
  if (headers['Content-Type'] === undefined) headers['Content-Type'] = 'application/json';
  // enable cors
  headers['Access-Control-Allow-Origin'] = '*';
  return {
    statusCode,
    body: typeof body === 'object' ? JSON.stringify(body) : body,
    headers: { ...headers }
  }
}

exports.getClientErrorResponse = function (error, apiStatusCode = STATUS_CODES.CLIENT_ERROR) {
  return module.exports.prepareLambdaResponse(JSON.stringify({ error: error, meta: { status_code: apiStatusCode } }), 400);
};

exports.getServerErrorResponse = function (error, apiStatusCode = STATUS_CODES.SERVER_ERROR) {
  return module.exports.prepareLambdaResponse(JSON.stringify({ error: error, meta: { status_code: apiStatusCode } }), 500);
};

exports.getGoApiServerErrorResponse = function (error, apiStatusCode = STATUS_CODES.SERVER_ERROR) {
  return module.exports.prepareLambdaResponse(JSON.stringify({ errors: [{ status: apiStatusCode, code: apiStatusCode }] }), 500);
};

exports.getGoApiClientErrorResponse = function (error, apiStatusCode = STATUS_CODES.CLIENT_ERROR) {
  return module.exports.prepareLambdaResponse(JSON.stringify({ errors: [{ status: apiStatusCode, code: apiStatusCode, detail: error }] }), 400);
};