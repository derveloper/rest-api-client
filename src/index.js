import createHttp from './http';
import createClient from './client';

export default (apiUrl, token) =>
	createClient(createHttp(apiUrl, token));
