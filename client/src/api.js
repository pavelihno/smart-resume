import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';

export const baseUrl = isProd ? '/api' : 'http://localhost:8080';

export const api = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
	},
});
