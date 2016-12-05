import createHttp from './http';
import createClient from './client';

export default apiUrl => createClient(createHttp(apiUrl));
