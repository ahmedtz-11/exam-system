import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8080/necta-api',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

export default http;
