import axios from 'axios';

export const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const API_AUTH = (token) =>
  axios.create({
    baseURL: `${baseUrl}/api/v1`,
    withCredentials: true,
    headers: {
      Authorization: token,
    },
  });
