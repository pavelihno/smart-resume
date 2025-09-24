import axios from 'axios';

import { isProd } from './config';

export const baseUrl = isProd ? '/api' : 'http://localhost:8080';

export const api = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
	},
});
