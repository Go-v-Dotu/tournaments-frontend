const API_V1_PREFIX = '/api/v1';

const enum HTTPMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

const enum ContentType {
	APPLICATION_JSON = 'application/json'
}

export { API_V1_PREFIX, ContentType, HTTPMethod };
