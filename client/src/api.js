import axios from 'axios';

export const baseUrl = `http://${process.env.REACT_APP_SERVER_URL}`;

export const api = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});