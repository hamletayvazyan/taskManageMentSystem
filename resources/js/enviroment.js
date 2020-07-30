export const api_point = 'http://127.0.0.1:8000/api';

export let auth_token = localStorage.getItem('token');

export let isLoggedIn = !!auth_token;
